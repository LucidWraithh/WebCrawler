const { crawlPage } = require('./crawl');

async function main() {
    const { argv } = require('node:process');

    // print process.argv
    args = argv.slice(2)
    pages = {}

    if (args.length > 1) {
        console.log("too many inputs")
    } else if (args.length < 1) {
        console.log("No inputs detected")
    }   else {
        pages = await crawlPage(args[0])
    }

    console.log(pages)
}

main()