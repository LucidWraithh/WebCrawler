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

    for (anchor of anchorsFound) {
        strAnchor = String(anchor)

        if (strAnchor[0] === "/") {
            url_list.push(baseURL + strAnchor)
        } else {
            url_list.push(strAnchor)
        }
    }


    return url_list
}


getURLsFromHTML()

module.exports = {
    normalizeURL,
    getURLsFromHTML
}