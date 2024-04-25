function printReport(report) {
    report = sortData(report)

    for (const entry of report) {
        console.log(`Found ${entry[1]} internal links to ${entry[0]}`)
    }
}

function sortData(data) {
    const sites = Object.entries(data)

    sites.sort((a, b) => {
        if (a[1] === b[1]) {
            a[0].localeCompare(b[0])
        } else {
            return b[1] - a[1]
        }
    })

    return sites
}

export {
    printReport
}