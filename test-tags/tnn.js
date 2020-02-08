(function (t, i, s, a) {
    var c = 'script', src = 'https://tc-vai.web.app', E = window, m = document;
    try {
        m = E.top.document || m; E = E.top.document ? E.top : E;
    } catch (e) {}
    E[t] = E[t] || {};
    var b = m.getElementsByTagName(c)[0];
    m = m.createElement(c);
    document.getElementById('tcpubslot').style.width = window.innerWidth + 'px';
    document.getElementById('tcpubslot').style.height = window.innerHeight + 'px';
    E[t].i = i;
    E[t].a = a;
    E[t].s = s;
    E[t].src = src;
    m.async = 1;
    m.src = src + "/tc-initForm.js";
    b.parentNode.insertBefore(m, b)
    if(!E.getElementById(i.adSlot)) {
        var slot = '', slotEle = '';
        if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            slot = '.storyContent > p, .photo_data .photo_detail_cap > p';
            slotEle = document.querySelectorAll(slot)[0];
        }else{
            slot = '.artical-description > p';
            slotEle = document.querySelectorAll(slot)[1];
        }
        var newElement = document.createElement('div');
        newElement.id = 'tcpubslot';
        newElement.style.width = E.innerWidth + 'px';
        slotEle.parentNode.insertBefore(newElement, slotEle.nextSibling);

    }
})("tcEmbed", {
    ed: "jCsxHFDKTlmnRFXDB49wP6eyGA8zqZUuYZWd0IlpYVtl+cDrrzokaToijBolaV4zZ3t37SpuY3HvAf5A1k+F0Q==",
    pId: "",
    s: 0,
    logo: {url: "", cta: ""},
    adSlot: 'tcpubslot',
    waitTime: .1
}, 3);
