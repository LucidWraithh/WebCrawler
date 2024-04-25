function normalizeURL(url){
    urlobj = new URL(url)
    host = urlobj.hostname
    path = urlobj.pathname

    if (path.slice(-1) === "/") {
        path = path.slice(0, -1)
    }


    return host + path
}



module.exports = {
    normalizeURL
}