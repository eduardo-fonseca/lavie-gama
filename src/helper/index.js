/* const dateConverter = {
    convertDate (date) {
        const [day, month, year] = date.split('/');
        const dateConverted = `${year}-${month}-${day} 00:00:00`;
        return dateConverted;
    }
}

module.exports = { dateConverter }; */

const helperFunctions = {
    
    parseDate(dateTime) {
        dateTime = dateTime.split(/[\s/:]+/)
        return new Date(dateTime[2], (dateTime[1] - 1), dateTime[0]).toISOString();
    }
}

module.exports = { helperFunctions };