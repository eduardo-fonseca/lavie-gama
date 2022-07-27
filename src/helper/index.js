const helperFunctions = {
    
    parseDate(dateTime) {
        dateTime = dateTime.split(/[\s/:]+/)
        return new Date(dateTime[2], (dateTime[1] - 1), dateTime[0]).toISOString();
    }
}

module.exports = { helperFunctions };