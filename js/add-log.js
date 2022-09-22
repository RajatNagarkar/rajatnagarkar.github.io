var red = "#ef233c";
var green = "#2b9348";

let validation = (formObj) => {
    if(formObj.toll == -1 || formObj.vehicleType == -1 || formObj.vehicleNumber == "") {
        return false
    }
    return true;
}

let toaster = (msg, bgColor) => {
    let x = $("#toast");
    x.css("background-color", bgColor);
    x.css("color", "white");
    x.css("display", "block");
    x.html(`<p>`+msg+`</p>`);
    setTimeout(function () { x.css("display", "none");x.html("")}, 2000);
}

let isLogExist = (number) => {
    let exist = {};
    cookieData.entry.forEach(ele => {
        if(number == ele.vehicleNumber) {
            exist = ele;
        }
    });
    return exist;
}

let fetchTariff = (newLog, journey) => {
    let trf = 0;
    cookieData.tolls.forEach(ele => {
        if(ele.tollName == newLog.toll_name) {
            ele.types.forEach(e => {
                if(e.vehicleType == newLog.vehicleType) {
                    trf = e.tariff[journey]
                }
            })
        }
    });
    return trf;
}

let isWithinHour = (date1, date2) => {
    date1 = new Date(date1);
    date2 = new Date(date2);
    const diff=  Math.abs(date2.getTime() - date1.getTime());
    let duration = diff / (1000 * 60 * 60);
    alert(duration);
    if(duration < 1) {
        return true;
    }
    return false;
}


let getTariff = (newLog) => {
    let existingLog = isLogExist(newLog.vehicleNumber);
    if(JSON.stringify(existingLog) != JSON.stringify({})) {
        if(isWithinHour(existingLog.date, newLog.date)) {
            return fetchTariff(newLog, "return");
        }
    }
    return fetchTariff(newLog, "single");
}

$(document).ready(function() {
    $('#form-add-entry').on('submit', function(e) {
        e.preventDefault();
        let form = $(this).serialize();
        form = form.split("&");
        let formObj = {};

        form.forEach(ele => {
            let tempArr = ele.split("=");
            formObj[tempArr[0]] = decodeURIComponent(tempArr[1]);
        });
        formObj.date = new Date();
        formObj.tariff = getTariff(formObj);
        if(!validation(formObj)) {
            toaster("All fields are required with correct data.", red);
            return;
        }
        addEntry(formObj);
    });
});