(({
      id = 'adUnit',
      baseUrl,
      cdnUrl,
      category = 'hing',
      maxFeeds = 2,
      showAds = false,
      waitFor = 0,
      loadPixel,
      showBranding,
      brandingCTA,
      native,
      adConfig = {},
      iframe = false,
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
        let listOfFeeds = [];
        let elementObserved = null;
        const tc_player_main = "https://tc-inaaj.web.app/main.js"
        let ytTemplate = "<div><div><div style=\"left: 0; width: 100%; height: 0; position: relative; padding-bottom: 56.25%;\"><iframe src=\"https://www.youtube.com/embed/YT_VIDEO_ID_MACRO\" style=\"border: 0; top: 0; left: 0; width: 100%; height: 100%; position: absolute;\" allowfullscreen scrolling=\"no\" allow=\"encrypted-media\"></iframe></div></div></div>"
        const tagObj = [
            /*{"tag": tag_inaaj_test, "network": "inaaj_test"}*/
        ];
        const vastTag = tagObj && tagObj.length === 1 ? tagObj[0] : null
        const player_settings = {
            ed: "jCsxHFDKTlmnRFXDB49wPysOG7mCHyUThs7p7v6m/323ygYDn5XgwnzFu3RQGCubZ3t37SpuY3HvAf5A1k+F0Q==",
            s: 2, // It should always be 2
            st: 30,
            ys: 2, //youtube-style
            logo: {},
            tagObj
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
                            vastTag,
                            networkID: vastTag ? vastTag.network : null,
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
            containerDiv.style.padding = '0.5rem';
            containerDiv.style.border = '1px solid #aaa';
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

            const titleDiv = currentDocument.createElement('h3');
            if (!isTwitter) {
                titleDiv.innerHTML = title;
            }
            titleDiv.style.padding = '0';
            titleDiv.style.marginBottom = '0';

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
                            return width * 0.88;
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

                        const configScript = currentDocument.createElement('script');
                        configScript.text = `
                        google_ad_client = "${googleAdClient}";
                        google_ad_slot = "${googleAdSlot}";
                        google_ad_width = ${width};
                        google_ad_height = ${height};
                    `;
                        adDiv.appendChild(configScript);

                        const loadScript = currentDocument.createElement("script");
                        loadScript.type = 'text/javascript';
                        loadScript.setAttribute('src', '//pagead2.googlesyndication.com/pagead/show_ads.js');
                        adDiv.appendChild(loadScript);

                        slot.appendChild(adDiv);
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
            const {adAfter} = adConfig;
            for (const feed of feeds) {
                if (showAds && feedsShown % adAfter === 0 && feedsShown > 0) {
                    renderAd();
                }
                renderItem(feed, width);
                feedsShown++;
            }
        }

        const fetchRequest = async (link) => {
            const res = await fetch(link);
            return await res.json();
        }

        const getFeeds = async () => {
            return await fetchRequest(`${baseUrl}/feed/fetch?cat=${category}`);
        }

        const getAndRenderFeed = async (id) => {
            if (!id || shownFeeds.includes(id)) {
                return;
            }
            const feed = await fetchRequest(`${cdnUrl}/feed/get?id=${id}`);
            if (!feed) {
                return;
            }
            renderFeed(feed, parentContainer.offsetWidth);
            shownFeeds.push(id);
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
                    const feedId = listOfFeeds.shift();
                    if (elementObserved) {
                        observer.unobserve(elementObserved);
                        elementObserved = null;
                    }
                    await getAndRenderFeed(feedId);
                    // Fetch New Feeds if the current is over
                    if (!listOfFeeds.length) {
                        await loadFeeds();
                    }
                } catch (e) {
                    // Error Loading Feeds
                } finally {
                    await resetInteractionObserver();
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

        const firePixel = (url) => {
            if (!url) {
                return;
            }
            url = url.replace(/\[CACHE_BUSTER_MS]/gi, +new Date());
            url = url.replace(/\[PAGE_URL]/gi, currentWindow.location.href);
            url = url.replace(/\[SITE_DOMAIN]/gi, currentWindow.location.origin);
            url = url.replace(/\[CATEGORY]/gi, category);
            const pixel = new Image();
            pixel.src = url;
        }

        const renderBranding = (container) => {
            // const {color, backgroundColor} = brandingConfig;

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
        parentContainer.style.border = '1px solid rgba(0,0,0,0.5)';
        parentContainer.style.borderRadius = '5px';

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
        firePixel(loadPixel);
        if (!native) {
            appendMainScript();
        }
        await loadFeeds();
        await loadNextFeed([], null, true);
        await resetInteractionObserver();
    }

    setTimeout(init, waitFor);
})("[PARAMS]");
