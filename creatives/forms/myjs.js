$(document).ready(() => {
    $("form").submit( () => {
        if($("form").valid()) {
            const thankYouMsg = 'Thanks for filling the form!';
            const formData =  $('form').serialize();
            $('.post_newsletter').html(thankYouMsg).addClass('flip-vertical');
            window.parent.postMessage(JSON.stringify({tc: true, formSubmission: true, splashForm:true, formData: formData}), '*');
        }
        return false;
    });

    // alias required to cRequired with new message
    $.validator.addMethod("cRequired", $.validator.methods.required,
        "This field is required.");
    $.validator.addMethod("cEmail", $.validator.methods.email,
        "Enter valid email address.");
    $.validator.addMethod("cMobile", (phone) => {
        /*var regex = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{0,})/;
        return regex.test(phone) || (phone && phone.length >= 10);*/
        var regex = /^[6-9]\d{9}$/; //Indian mobile number
        return regex.test(phone);// || (phone && phone.length >= 10);
    }, "Enter 10 digits mobile number.");
    $.validator.addClassRules("required", { cRequired: true});
    $.validator.addClassRules("email", { cEmail: true});
    $.validator.addClassRules("mobile", { cMobile: true});
    $.validator.addClassRules("email-required", { cRequired: true, cEmail: true});
    $.validator.addClassRules("mobile-required", { cRequired: true, cMobile: true});
    $("form").validate({
        submitHandler: function(form) {
        },
        errorPlacement: function(error, element) {
            element.before(error)
        }
    });

    window.parent.postMessage(JSON.stringify({tc: true, formLoaded: true, splashForm:true}), '*');

});


