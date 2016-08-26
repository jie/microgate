import dateformat from 'dateformat';


function nowDate() {
    return dateformat(new Date(), "yyyy-mm-dd HH:MM:ss")
}


module.exports = {
    nowDate: nowDate
}
