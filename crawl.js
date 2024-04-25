const jsdom = require("jsdom");
const { JSDOM } = jsdom;

function normalizeURL(url){
    urlobj = new URL(url)
    host = urlobj.hostname
    path = urlobj.pathname

    if (path.slice(-1) === "/") {
        path = path.slice(0, -1)
    }


    return host + path
}


function getURLsFromHTML(html, baseURL){
    
    const url_list = []
    const jsdobj = new JSDOM(html)
    const anchorsFound = jsdobj.window.document.querySelectorAll('a')

    for (const anchor of anchorsFound) {
        strAnchor = String(anchor)

        if (strAnchor[0] === "/") {
            url_list.push(baseURL + strAnchor)
        } else {
            url_list.push(strAnchor)
        }
    }


    return url_list
}


async function crawlPage(baseURL, currentURL=baseURL, pages={}) {
    

    if (!currentURL.includes(baseURL)) {
        return pages
    }

    normalized = normalizeURL(currentURL)

    if (pages[normalized] > 0) {
        pages[normalized]++
        return pages
    }   else {
        pages[normalized] = 1
    }

    console.log(`Crawling page ${currentURL}`)

    let htmltext
    try {

        htmltext = await getWebpageText(currentURL)

    } catch (error) {
        console.log(error.message)
        return pages
    }


    const newurls = getURLsFromHTML(htmltext, baseURL)

    for (const link of newurls) {
        pages = await crawlPage(baseURL, currentURL=link, pages=pages)
    }

    return pages
}


async function getWebpageText(currentURL) {
    let resp

    try {
        resp = await fetch(currentURL, {
            method: "GET",
            mode: "cors"
        })
    } catch (error) {
        throw new Error(`ERROR: Failed to get url; URL: ${currentURL}`)
    }
    
    if (resp.status >= 400) {
        console.log("ERROR: Web page malfunction")
        return
    }
    
    if (!resp.headers.get('content-type') || !resp.headers.get('content-type').includes("text/html")) {
        console.log("ERROR: Content type is not in HTML")
    }

    return await resp.text()
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}