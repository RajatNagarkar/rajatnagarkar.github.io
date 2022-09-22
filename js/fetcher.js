var all = false;

let getFiltered = (tollName) => {
    if(!all) { 
        dropDown = $('#dropped');
        let but = `<button value="*" onclick="{window.location.reload()}" >All</button>`;
        all = true;    
        dropDown.prepend(but);
    }
    
    data = [];
    let entry = cookieData.entry;
    for(let i = 0;i<entry.length;i++) {
        if(entry[i].toll_name == tollName) {
            data.push(entry[i]);
        }
    }
    renderTable("entry", generateEntryData(data));
}

let searchTolls = (query) => {
    let tolls = cookieData.tolls;
    data = [];

    for(let i = 0;i<tolls.length;i++) {
        let tn = tolls[i].tollName.toLowerCase();
        if(tn.startsWith(query)) {
            data.push(tolls[i]);
        }
    }
    renderTable("toll", data.length == 0 ? [noRecord] : generateTollData(data));
}


let searchLogs = (query) => {
    entry = cookieData.entry;
    data = [];
    for(let i = 0;i<entry.length;i++) {
        let vn = entry[i].vehicleNumber;
        console.log(typeof(vn));
        if(vn.startsWith(query)) {
            data.push(entry[i]);
        }
    }
    renderTable("entry", data.length == 0 ? [noRecord] : generateEntryData(data));
}

let searchQuery = (query, mode) => {
    console.log(query);
    if(mode == "entry") {
        searchLogs(query);
    } else {
        searchTolls(query);
    }
}


$(document).ready(function () {
    let tollSelect = $('select[name=toll_name]');
    let dropDown = $('#dropped');
    $("#tbd").remove();
    cookieData.tolls.forEach(ele => {
        let opt = `<option value="${ele.tollName}">${ele.tollName}</option>`;
        let but = `<button value="${ele.tollName}" onclick="getFiltered(this.value)" >${ele.tollName}</button>`;
        dropDown.append(but);
        tollSelect.append(opt);
    });

    $('#filter').click(function() {
        let disp = dropDown.css("display");
        if(disp == "none") {
            dropDown.css("display", "flex");
            dropDown.css("flex-direction", "column");
        } else {
            dropDown.css("display", "none");
        }
    });

});