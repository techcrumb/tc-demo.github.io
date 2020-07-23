((tagPath = window.location.origin + '/tag.js') => {
    window.onload = () => {
        const searchParams = new URLSearchParams(window.location.search);
        (async (params) => {
            const jsContent = await (await fetch(tagPath)).text();
            // Pass Params to Function
            const src = jsContent.replace(/"\[PARAMS]"/gi, JSON.stringify(params));

            const script = document.createElement("script");
            script.type = 'text/javascript';
            script.text = src;
            document.body.appendChild(script);
        })({
            id: "inaaj-feed",
            baseUrl: "https://feed.inaaj.org",
            cdnUrl: "https://cdn.inaaj.org",
            category: searchParams.get('cat') || "hing",
            maxFeeds: 25,
            showAds: true,
            adConfig: {
                adAfter: 6,
                type: 'DFP',
                DFP: {
                    divId: 'div-gpt-ad-1594197321299',
                    adSlot: '/102101596/Test_300x250',
                    width: 300,
                    height: 250
                },
                ADX: {
                    googleAdClient: 'ca-pub-3737030722290655',
                    googleAdSlot: 'PDL_MPCNews_Inaaj_Display_300x250',
                    width: 300,
                    height: 250
                }
            },
            waitFor: 0,
            loadPixel: 'https://trac.performoo.com/capture?type=Feed&action=Load&ed=PFwTjfNBBynJCZH%2Fcsi6GA%2BzwpApGhcW39A19Za8C6M6cKQ0AMi7SurH7yXhUBsr&cat=[CATEGORY]&srcURL=[SITE_DOMAIN]&cb=[CACHE_BUSTER_MS]',
            showBranding: true,
            brandingCTA: 'https://inaaj.com',
            native: Number(searchParams.get('n')) !== 0,
            iframe: false,
            brandingConfig: {
                backgroundColor: 'white',
                color: 'black',
                borderBottom: '1px solid black',
                borderRadius: '1px'
            }
        });
    }
})(undefined);