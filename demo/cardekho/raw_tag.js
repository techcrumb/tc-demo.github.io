(function (t, i, s, a) {
    var c = 'script', src = 'https://plyr-b.performoo.com', E = window, m = document;
    try {
        m = E.top.document || m;
        E = E.top.document ? E.top : E;
    } catch (e) {
    }
    E[t] = E[t] || {};
    var b = m.getElementsByTagName(c)[0];
    var se = m.createElement(c);
    E[t].i = i;
    E[t].a = a;
    E[t].s = s;
    E[t].src = src;
    se.async = 1;
    se.src = src + "/tc-initForm.js";
    b.parentNode.insertBefore(se, b)

    if (!m.getElementById(i.adSlot)) {
        var slot = '', slotEle = '';
        var newElement = m.createElement('div');
        newElement.id = i.adSlot;
        newElement.style.margin = 'auto';
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            var slot = '#model-highlight';
            slotEle = m.querySelector(slot);
            slotEle.parentNode.parentNode.insertBefore(newElement, slotEle.parentNode);
        } else {
            slot = '.adHolder.marginBottom20';
            slotEle = m.querySelector(slot);
            slotEle.parentNode.insertBefore(newElement, slotEle);
        }
    }
})("tcEmbed", {
    ed: "3BRsqtVZBLO+2W2QvZcRpQf3ZJYv2tfvp9hE3clGYXfrXbddGL6Z6JVqY/qC3zQY6RdFydzEKThaeo3VCNBuzFAzDKyDBBJiffcqL0ao+vFX7MGfbdFs0WWDyW7V9wgzUIAt8IoAcP0VbHe6a7SetQ==",
    pId: "",
    s: 0,
    logo: {url: "", cta: ""},
    adSlot: 'tcoslot',
    waitTime: .1,
    lookNFeel: {
        placement: {
            d: {h: 250, w: 300},
            m: {h: 150, w: 200},
            slider: {
                pos: "rb",
                auto: true
            },
            z: 99998
        },
        muteBtn: {
            pos: {l: 68, t: 5},
            text: 'CLICK TO UNMUTE'
        },
    },
    autoPlay: {
        type: 2,
        unmute: {
            dur: -1,
        }
    }
}, 3);