$(document).ready(() => {
    $("form").submit( () => {
        if($("form").valid()) {
            const thankYouMsg = 'Thanks for subscribing!';
            const formData =  $('form').serialize();
            $('.post_newsletter').html(thankYouMsg).addClass('flip-vertical');
            window.parent.postMessage(JSON.stringify({tc: true, formSubmission: true, splashForm:true, formData: formData}), '*');
        }
        return false;
    });

    // alias required to cRequired with new message
    $.validator.addMethod("cRequired", $.validator.methods.required,
        "This field is required");
    $.validator.addMethod("cEmail", $.validator.methods.email,
        "Please enter valid Email");
    $.validator.addMethod("cMobile", (phone) => {
        var regex = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{0,})/;
        return regex.test(phone);
    }, "Please enter valid Mobile No.");
    $.validator.addClassRules("required", { cRequired: true});
    $.validator.addClassRules("email", { cEmail: true});
    $.validator.addClassRules("mobile", { cMobile: true});
    $("form").validate({
        submitHandler: function(form) {
            form.submit();
        },
        errorPlacement: function(error, element) {
            element.before(error)
        }
    });

    window.parent.postMessage(JSON.stringify({tc: true, formLoaded: true, splashForm:true}), '*');

});


