(function (t, i, s, a) {
    var c = 'script', src = 'https://tc-vai.web.app', E = window, m = document;
    E[t] = E[t] || {};
    b = m.getElementsByTagName(c)[0];
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
})("tcEmbed", {
    ed: "jCsxHFDKTlmnRFXDB49wP6eyGA8zqZUuYZWd0IlpYVtl+cDrrzokaToijBolaV4zZ3t37SpuY3HvAf5A1k+F0Q==",
    pId: "",
    s: 0,
    logo: {url: "", cta: ""},
    adSlot: 'tcpubslot',
    waitTime: .1
}, 3);