
function makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

function moveArray(arr, old_index, new_index) {
    if (new_index >= arr.length) {
        var k = new_index - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr; // for testing
}

function showTime(timeStemp) {
    var currTimeStemp = Date.now()
    var diff = currTimeStemp - timeStemp
    var timeForDispaly
    if(diff<0){
        timeForDispaly = new Date(timeStemp).toDateString().substring(4, 10) //'Nov 04 at 2:40 AM'
        return timeForDispaly + ' at ' + new Date(timeStemp).toLocaleString('en-us', { hour: 'numeric', minute: 'numeric', hour12: true })
    }else if (diff < (1000 * 60 * 60)) {
        currTimeStemp = Date.now()
        diff = currTimeStemp - timeStemp
        timeForDispaly = Math.floor(diff / (1000 * 60))
        return timeForDispaly + ' minutes ago'
        // "3 minutes ago"
    } else if (diff < (1000 * 60 * 60 * 24)) {
        currTimeStemp = Date.now()
        diff = currTimeStemp - timeStemp
        timeForDispaly = Math.floor(diff / (1000 * 60 * 60))
        return timeForDispaly + ' hours ago'
        // "3 hours ago"
    } else if (diff >= (1000 * 60 * 60 * 24)) {
        timeForDispaly = new Date(timeStemp).toDateString().substring(4, 10) //'Nov 04 at 14:40'
        return timeForDispaly + ' at ' + new Date(timeStemp).toLocaleString('en-us', { hour: 'numeric', minute: 'numeric', hour12: false })
    }
    // console.log (timeForDispaly)
    return timeForDispaly
}


export default {
    makeId,
    getRandomInt,
    moveArray,
    showTime
};

