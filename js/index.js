//GettingCookie
var view = "entry";
var noRecord = `<tr><td style="text-align: center;" colspan="6">No Records Found</td></tr>`;
var cookieData = document.cookie;
var tHeadEntry = `<tr class="row head"><th>VEHICLE TYPE</th><th>VEHICLE NUMBER</th><th>DATE/TIME</th><th>TOLL NAME</th><th>TARIFF</th></tr>`;
var tHeadTolls = `<tr class="row head"><th>TOLL NAME</th><th>CAR/JEEP/VAN</th><th>LCV</th><th>TRUCK/BUS</th><th>HEAVY VEHICLE</th><th>REMOVE</th></tr>`;
var cjv = "Car/Jeep/Van", lcv = "LCV", tb = "Truck/Bus", hv = "Heavy vehicle";
let toggleView = () => {
    $('#view-tolls').toggle();
    $('#view-entry').toggle();

    let disp = $('#view-tolls').css('display');
    let ele = $('input[name=search]');
    if(disp == 'none') {
        ele.attr("onkeyup", "searchQuery(this.value, 'tolls')");
    } else {
        ele.attr("onkeyup", "searchQuery(this.value, 'entry')");
    }
}

let generateTollData = (data) => {
    let dataArray = [];
    for(let i = 0;i<data.length;i++) {
        let types = data[i].types;
        let row = "<tr>"
        row += `<td>${data[i].tollName}</td>`;
        types.forEach(ele => {
            if(ele.vehicleType == cjv) {
                let td = `<td>${ele.tariff.single}/${ele.tariff.return}</td>`;
                row += td;
            }
        });
        types.forEach(ele => {
            if (ele.vehicleType == lcv) {
                let td = `<td>${ele.tariff.single}/${ele.tariff.return}</td>`;
                row += td;
            }
        });
        types.forEach(ele => {
            if (ele.vehicleType == tb) {
                let td = `<td>${ele.tariff.single}/${ele.tariff.return}</td>`;
                row += td;
            }
        });
        types.forEach(ele => {
            if (ele.vehicleType == hv) {
                let td = `<td>${ele.tariff.single}/${ele.tariff.return}</td>`;
                row += td;
            }
        });
        row += `<td><span class="remove-button"><img src="assets/icons/bin.svg" alt="&times" widht="24px" height="24px" onclick="deleteToll('${data[i].tollName}')"></span></td>`
        row += "</tr>";
        dataArray.push(row);
    }
    return dataArray;
}

let generateEntryData = (data) => {
    let dataArray = [];
    for (let i = 0; i < data.length; i++) {
        let record = new Date(data[i].date).toLocaleString();
        let row = "<tr>";
        row += `<td>${data[i].vehicleType}</td>`;
        row += `<td>${data[i].vehicleNumber}</td>`;
        row += `<td>${record}</td>`;
        row += `<td>${data[i].toll_name}</td>`;
        row += `<td>${data[i].tariff}</td>`;
        row += "</tr>";
        dataArray.push(row);
    }
    return dataArray;
}

let viewTolls = () => {
    data = cookieData.tolls;
    toggleView();
    renderTable("toll", data.length == 0 ? [noRecord] : generateTollData(data));
}

let viewEntry = () => {
    data = cookieData.entry;
    toggleView();
    renderTable("entry", data.length == 0 ? [noRecord] : generateEntryData(data));
}


let renderTable = (view, data) => {
    let tab = `<table id="table"><tbody>`;
    if (view == "entry") {
        tab += tHeadEntry;
    } else {
        tab += tHeadTolls;
    }
    let x = $("#table");
    data.forEach(ele => {
        tab += ele;
    });
    tab += "</tbody></table>";
    let tableEle = $('div#table-content');
    tableEle.html(tab);
}

let tollSelectManager = (value, id) => {
    let selectList = $('select.vehicle-type-toll');
    for(let i = 0;i<selectList.length;i++) {
        var ele = selectList[i].children
        if(i == id) {
            continue;
        }
        for(let j = 0;j<ele.length;j++) {
            let option = ele[j].value;
            if(value == option) {
                $(ele[j]).remove();
            }
        }
    }
}

let saveData = (reload = true) => {
    let exp = new Date(Date.now() + 86400 * 1000 * 365).toUTCString();
    document.cookie = `data=${JSON.stringify(cookieData)}; expires=${exp}; path=/;`;

    if(reload) {
        window.location.reload();
    }
}

let addToll = (data) => {
    cookieData.tolls.push(data);
    saveData(); 

}

let deleteToll = (tollName) => {
    if(!window.confirm("Do you really to delete this toll?")) {
        return;
    }
    newTolls = [];

    let tolls = cookieData.tolls;

    for(let i = 0;i<tolls.length;i++) {
        if(tollName != tolls[i].tollName) {
            newTolls.push(tolls[i]);
        }
    }
    cookieData.tolls = newTolls;
    saveData(false);
    renderTable("toll", newTolls.length == 0 ? [noRecord] : generateTollData(cookieData.tolls));
}

let addEntry = (data) => {
    cookieData.entry.push(data);
    saveData();
}
console.log(cookieData);

if(cookieData == undefined || cookieData == ""){
    cookieData = {
        tolls: [],
        entry: [],
    };
    renderTable(view, [noRecord]);

} else {
    temp = cookieData.split("=")[1];
    cookieData = JSON.parse(cookieData.split("=")[1]);
    if (cookieData.entry.length == 0) {
        renderTable(view, [noRecord]);
    } else {
        renderTable("entry", generateEntryData(cookieData.entry));
    }
}
