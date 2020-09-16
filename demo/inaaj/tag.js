(({
      id = 'adUnit',
      baseUrl,
      cdnUrl,
      category = 'hing',
      fetchCount = 5,
      maxFeeds = 2,
      batchSize = 2,
      maxPosts = 12,
      showAds = false,
      waitFor = 0,
      loadPixel = 'https://trac.performoo.com/capture?type=Feed&action=[ACTION]&ed=aRxZjM6NHc7SKivcTV5a2L%2B4ewQVUfkyYWcT3fUJThkqWrSLSpxgC9ElozqFvzuyCWRqunDaVdfJw0%2By4ZvvyQ%3D%3D&category=[CATEGORY]&meta1=[FEED_TYPE]&meta2=[POSTS_RENDERED]&meta3=[TIME_ELAPSED_SEG]&srcURL=[SITE_DOMAIN]&cb=[CACHE_BUSTER_MS]',
      showBranding,
      brandingCTA,
      native,
      adConfig = {},
      iframe = false,
      vastAdTag,
      gaId,
      brandingConfig = {
          backgroundColor: 'rgba(0,0,0,0.8)',
          textColor: 'black',
      }
  }) => {

    const init = async () => {
        const shownFeeds = [];
        let currentFeeds = 0;
        let adId = 0;
        let feedsShown = 0;
        let isGATriggered = false;
        let listOfFeeds = [];
        let feedList = [];
        let elementObserved = null;
        const tc_player_main = "https://tc-inaaj.web.app/main.js"
        const initTimestamp = new Date();
        let ytTemplate = "<div><div><div style=\"left: 0; width: 100%; height: 0; position: relative; padding-bottom: 56.25%;\"><iframe src=\"https://www.youtube.com/embed/YT_VIDEO_ID_MACRO?playsinline=1\" style=\"border: 0; top: 0; left: 0; width: 100%; height: 100%; position: absolute;\" allowfullscreen scrolling=\"no\" allow=\"encrypted-media\"></iframe></div></div></div>"

        const elapsedTime = () => {
            return new Date() - initTimestamp;
        }

        const elapsedTimeSeg = () => {
            const et=elapsedTime()/1000;
            if(et<120){
                return Math.round(et/15)*15+'s'
            }else if(et<600){
                return Math.round(et/60)+'m'
            }else if(et<1800){
                return Math.round(et/300)*5+'m'
            }else{
                return '30m+'
            }
        }


        setTimeout(() => {
            console.log(elapsedTime());
        }, 1000)

        const player_settings = {
            ed: "jCsxHFDKTlmnRFXDB49wP+vPG6HECVM5c/qYcrrtY9e3v22m0e9m8dV2ey5kwfDZZ3t37SpuY3HvAf5A1k+F0Q==",
            s: 2, // It should always be 2
            st: 30,
            ys: 2, //youtube-style
            logo: {}
        }
        const appendMainScript = () => {
            const s = currentDocument.createElement("script");
            s.type = "text/javascript";
            s.src = tc_player_main + "?etag=1";
            currentDocument.head.appendChild(s);
        }

        const loadTcPlayer = (divId, ytVideoId) => {
            let counter = 0;
            let statusTagPlaced = false;
            const intervalTagPlaced = currentWindow.setInterval(() => {
                if (typeof currentWindow.TC !== 'undefined') {
                    init_tc();
                }
            }, 100);
            const init_tc = () => {
                if (typeof currentWindow.TC !== 'undefined' && !statusTagPlaced) {
                    try {
                        currentWindow.TC.init({
                            videoId: "widget",
                            elId: divId,
                            aspectRatio: 9 / 16,
                            style: player_settings.ys,
                            ytVideoId: ytVideoId,
                            adToRun: vastAdTag,
                            networkID: vastAdTag ? vastAdTag.network : null,
                            ed: player_settings.ed,
                            settingConfig: player_settings.s,
                            logo: player_settings.logo,
                            st: player_settings.st,
                            widget: true,
                            type: "youtube"
                        });
                        statusTagPlaced = true;
                        currentWindow.clearInterval(intervalTagPlaced);
                    } catch (e) {
                        console.log('retry placing tag', counter, e);
                        counter++;
                        if (counter > 20) {
                            currentWindow.clearInterval(intervalTagPlaced);
                            console.error('could not place TC tag', e);
                        }
                    }
                }
            }
            init_tc();
        }
        const addAdScript = () => {
            const {type} = adConfig;

            if (type !== 'DFP') {
                return;
            }

            const link = 'https://securepubads.g.doubleclick.net/tag/js/gpt.js';
            const newScript = currentDocument.createElement("script");
            newScript.setAttribute('src', link);
            currentDocument.body.appendChild(newScript);
        }

        const runTwitterScript = () => {
            const link = 'https://platform.twitter.com/widgets.js';
            const newScript = currentDocument.createElement("script");
            newScript.setAttribute('src', link);
            currentDocument.body.appendChild(newScript);
        }

        const extractVideoID = (url) => {
            let regExp = /(?:http(?:s)?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:(?:watch)?\?(?:.*&)?v(?:i)?=|(?:embed|v|vi|user)\/))([^\?&\"'<> #]+)/;
            let match = url.match(regExp);
            if (match && match.length > 1) {
                return match[1];
            }
        }

        const renderItem = ({title, desc, author, link}, width) => {
            const youTubeVideoId = link ? extractVideoID(link) : null;
            const isTwitter = desc.indexOf('twitter-tweet') !== -1;

            const isSM = width <= 768;
            const isMD = !isSM && width <= 1440;

            const containerDiv = currentDocument.createElement('div');
            containerDiv.style.padding = '0.5rem 0';
            // containerDiv.style.border = '1px solid #aaa';
            containerDiv.style.margin = '0.5rem 0';
            containerDiv.style.flex = '1';
            containerDiv.style.position = 'relative';
            containerDiv.style.overflow = 'auto';

            if (isSM) {
                containerDiv.style.flexBasis = '100%';
                containerDiv.style.width = '100%';
            } else if (isMD) {
                containerDiv.style.flexBasis = 'calc(50% - 4rem)';
            } else {
                containerDiv.style.flexBasis = 'calc(33% - 4rem)';
            }

            const titleDiv = currentDocument.createElement('div');
            if (!isTwitter) {
                titleDiv.innerHTML = title;
            }
            titleDiv.style.fontWeight = 'bold';
            titleDiv.style.textAlign = 'center';
            // titleDiv.style.marginBottom = '0';

            const contentDiv = currentDocument.createElement('div');
            contentDiv.style.width = '100%';

            let ytDivId = null;
            if (youTubeVideoId) {
                if (native) {
                    desc = ytTemplate.replace('YT_VIDEO_ID_MACRO', youTubeVideoId);
                } else {
                    const uuidv4 = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
                        const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
                        return v.toString(16);
                    });
                    ytDivId = 'player-' + uuidv4;
                    const ytContainerDiv = currentDocument.createElement('div');
                    const ytDiv = currentDocument.createElement('div');

                    ytDiv.id = ytDivId;

                    ytContainerDiv.appendChild(ytDiv);
                    desc = ytContainerDiv.innerHTML;

                    contentDiv.style.height = 'unset';
                    contentDiv.style.width = `${(() => {
                        if (isSM) {
                            return width * 0.98;
                        }
                        if (isMD) {
                            return width * 0.456;
                        }
                        return width / 3;
                    })()}px`;
                    contentDiv.style.position = 'relative';
                    contentDiv.style.overflow = 'hidden';
                    contentDiv.style.margin = 'auto';
                }
            }

            contentDiv.innerHTML = desc;

            containerDiv.appendChild(titleDiv);
            containerDiv.appendChild(contentDiv);
            if (isTwitter) {
                const overlayDiv = currentDocument.createElement('div');
                overlayDiv.style.position = 'absolute';
                overlayDiv.style.height = '100%';
                overlayDiv.style.width = '100%';
                overlayDiv.style.left = '0';
                overlayDiv.style.top = '0';

                overlayDiv.addEventListener('click', (e) => {
                    if (isTwitter) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                });
                containerDiv.appendChild(overlayDiv);
                contentDiv.style.margin = 'auto';
                contentDiv.style.height = 'unset';
                contentDiv.style.width = 'unset';
                contentDiv.style.display = 'flex';
                contentDiv.style.justifyContent = 'center';
                contentDiv.style.alignItems = 'center';
            }
            slot.appendChild(containerDiv);
            if (!native && youTubeVideoId) {
                loadTcPlayer(ytDivId, youTubeVideoId)
            }
        }

        const renderAd = () => {
            if (!showAds) {
                return;
            }
            const {type, DFP, ADX} = adConfig;

            try {
                switch (type) {
                    case 'DFP': {
                        const {divId, adSlot, width, height} = DFP;
                        const adDiv = currentDocument.createElement('div');
                        adDiv.id = `${divId}-${adId}`;
                        adId++;

                        currentWindow.googletag = currentWindow.googletag || {cmd: []};
                        currentWindow.googletag.cmd.push(function () {
                            currentWindow.googletag.defineSlot(adSlot, [width, height], adDiv.id).addService(googletag.pubads());
                            currentWindow.googletag.pubads().enableSingleRequest();
                            currentWindow.googletag.enableServices();
                        });

                        const contentDiv = currentDocument.createElement('div');
                        contentDiv.style.display = 'flex';
                        contentDiv.style.justifyContent = 'center';
                        contentDiv.style.alignItems = 'center';
                        contentDiv.style.width = '100%';
                        contentDiv.style.overflow = 'hidden';

                        contentDiv.appendChild(adDiv);
                        slot.appendChild(contentDiv);

                        currentWindow.googletag.cmd.push(function () {
                            googletag.display(adDiv.id);
                        });
                        break;
                    }
                    case 'ADX': {
                        const {googleAdClient, googleAdSlot, width, height} = ADX;
                        const adDiv = currentDocument.createElement('div');
                        adDiv.style.textAlign = 'center';
                        adDiv.style.width = '100%';
                        slot.appendChild(adDiv);
                        postscribe(adDiv, `<script>google_ad_client="${googleAdClient}";google_ad_slot="${googleAdSlot}";google_ad_width=${width};google_ad_height=${height};</script><script src="//pagead2.googlesyndication.com/pagead/show_ads.js"></script>`);
                        break;
                    }
                    default: {
                        console.log('Ad Type Not Supported');
                    }
                }
            } catch (e) {
                console.log('Error Adding Ad');
            }
        }

        const renderFeed = (feeds, width) => {
            if (feedsShown >= maxPosts) {
                return;
            }
            if (!isGATriggered && gaId && feedsShown > 2) {
                tirggerGA(gaId);
                isGATriggered = true;
                firePixel(loadPixel, 'GA');
            }

            const {adAfter} = adConfig;
            for (const feed of feeds) {
                if (showAds && feedsShown % adAfter === 0 && feedsShown > 0) {
                    renderAd();
                }
                renderItem(feed, width);
                feedsShown++;
            }
            if (feedsShown >= maxPosts) {
                firePixel(loadPixel, 'Finish');
            }else{
                firePixel(loadPixel, 'Render');
            }
        }

        const fetchRequest = async (link) => {
            const res = await fetch(link);
            return await res.json();
        }

        const getFeeds = async () => {
            return await fetchRequest(`${baseUrl}/feed/fetch?cat=${category}&max=${fetchCount}`);
        }

        const getNextFeedList = async (id) => {
            if (!id || shownFeeds.includes(id)) {
                return [];
            }
            const feed = await fetchRequest(`${cdnUrl}/feed/get?id=${id}`);
            shownFeeds.push(id);
            if (!feed) {
                return [];
            } else {
                return feed;
            }
        }

        const renderBatch = async (feed) => {
            renderFeed(feed, parentContainer.offsetWidth);
            runTwitterScript();
        }

        const loadFeeds = async () => {
            if (currentFeeds >= maxFeeds) {
                return;
            }
            const feeds = await getFeeds();
            listOfFeeds = listOfFeeds.concat(feeds);
            currentFeeds++;
        }

        const loadNextFeed = async (entries, observer, firstLoad) => {
            entries.forEach(entry => {
                firstLoad = entry.isIntersecting;
            });

            if (firstLoad) {
                try {
                    if (elementObserved) {
                        observer.unobserve(elementObserved);
                        elementObserved = null;
                    }

                    if (feedList.length < batchSize) {
                        const feedId = listOfFeeds.shift();
                        feedList = feedList.concat(await getNextFeedList(feedId));
                    }

                    const nextList = feedList.splice(0, batchSize);
                    console.log('Next List', nextList);
                    if (nextList.length) {
                        await renderBatch(nextList);
                    }

                    if (!listOfFeeds.length) {
                        await loadFeeds();
                    }
                } catch (e) {
                    // Error Loading Feeds
                } finally {
                    if (feedsShown >= maxPosts) {
                        observer.disconnect();
                    } else {
                        await resetInteractionObserver();
                    }
                }
            }
        }

        const observer = new IntersectionObserver(loadNextFeed);
        const resetInteractionObserver = async () => {
            const lastElements = currentDocument.querySelectorAll(`#${slotId}>div`);
            const target = lastElements[lastElements.length - 2];
            if (!target) {
                return;
            }
            observer.observe(target);
            elementObserved = target;
        }

        const firePixel = (url, action) => {
            if (!url) {
                return;
            }
            url = url.replace(/\[ACTION]/gi, action);
            url = url.replace(/\[CACHE_BUSTER_MS]/gi, +new Date());
            url = url.replace(/\[PAGE_URL]/gi, currentWindow.location.href);
            url = url.replace(/\[SITE_DOMAIN]/gi, currentWindow.location.origin);
            url = url.replace(/\[CATEGORY]/gi, category);
            url = url.replace(/\[FEED_TYPE]/gi, native ? 'native' : 'autoplay');
            url = url.replace(/\[POSTS_RENDERED]/gi, feedsShown);
            url = url.replace(/\[TIME_ELAPSED_SEG]/gi, elapsedTimeSeg());
            const pixel = new Image();
            pixel.src = url;
        }

        const tirggerGA = (gaID) => {
            console.log("==>> Triggering GA.")
            window.history.replaceState(null, null, "?inaajwidget=1");
            (function (i, s, o, g, r, a, m) {
                i['GoogleAnalyticsObject'] = r;
                i[r] = i[r] || function () {
                    (i[r].q = i[r].q || []).push(arguments)
                }, i[r].l = 1 * new Date();
                a = s.createElement(o),
                    m = s.getElementsByTagName(o)[0];
                a.async = 1;
                a.src = g;
                m.parentNode.insertBefore(a, m)
            })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
            ga('create', gaID);
            ga('send', 'pageview');
        }


        const renderBranding = (container) => {
            if (!showBranding) {
                return;
            }

            const brandingDiv = currentDocument.createElement('a');
            brandingDiv.style.display = 'flex';
            brandingDiv.style.flexDirection = 'row';
            brandingDiv.style.flex = '1';
            brandingDiv.style.overflow = 'hidden';
            brandingDiv.style.justifyContent = 'flex-end';
            brandingDiv.style.alignItems = 'center';
            brandingDiv.style.cursor = 'pointer';
            brandingDiv.style.outline = 'none';
            brandingDiv.style.textTransform = 'none';
            brandingDiv.style.textDecoration = 'none';

            Object.entries(brandingConfig).forEach(([key, value]) => {
                brandingDiv.style[key] = value;
            })

            if (brandingCTA) {
                brandingDiv.href = brandingCTA;
                brandingDiv.target = '_blank';
            }

            const text = currentDocument.createElement('p');
            text.style.margin = '5px 10px';
            text.innerHTML = 'Powered By Inaaj';
            brandingDiv.appendChild(text);

            container.appendChild(brandingDiv);
        }

        const parentContainer = document.getElementById(id);
        if (!parentContainer) {
            return;
        }
        parentContainer.style.width = '100%';
        // parentContainer.style.border = '1px solid rgba(0,0,0,0.5)';
        // parentContainer.style.borderRadius = '5px';

        let slot, currentDocument, currentWindow;

        if (iframe) {
            const iFrameElement = document.createElement('iframe');

            parentContainer.appendChild(iFrameElement);
            iFrameElement.style.width = '100%';
            iFrameElement.style.border = 'none';
            iFrameElement.style.height = '100vh';

            currentDocument = iFrameElement.contentDocument;
            currentWindow = iFrameElement.contentWindow;

            const body = currentDocument.querySelector('body');

            renderBranding(body);

            slot = currentDocument.createElement('div');
            body.appendChild(slot);
        } else {
            currentDocument = document;
            currentWindow = window;
            renderBranding(parentContainer);

            slot = currentDocument.createElement('div');
            parentContainer.appendChild(slot);
        }

        const slotId = 'slot-' + (+new Date());

        slot.style.display = 'flex';
        slot.style.flexDirection = 'row';
        slot.style.flexWrap = 'wrap';
        slot.style.width = '100%';
        slot.id = slotId;

        if (showAds) {
            addAdScript();
        }
        firePixel(loadPixel, 'Load');
        if (!native) {
            appendMainScript();
        }
        await loadFeeds();
        await loadNextFeed([], null, true);
        await resetInteractionObserver();
    }

    setTimeout(init, waitFor);
})("[PARAMS]");
