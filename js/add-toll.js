let validationToll = (tollName, types) => {
    if(tollName == "") {
        toaster("All fields are required with correct data.", red);
        return false;
    }
    for(let i = 0;i<types.length;i++) {
        vehicleType = types[i].vehicleType;
        tariff = types[i].tariff;

        if(vehicleType == "-1") {
            toaster("Please select tariff for all types of vehicle.", red);
            return false;
        }
        if (tariff.single == "" || tariff.return == "") {
            toaster("Enter prices for all type of vehicle", red);
            return false;
        }
        if(isNaN(tariff.single) || isNaN(tariff.return)) {
            toaster("All prices should be numeric values.", red);
            return false;
        }
    }
    return true;
}

$(document).ready(function () {
    $('#form-add-toll').on('submit', function (e) {
        e.preventDefault();
        let newToll = {
            tollName: $('input[name=toll-name]').val().trim(),
            types: [
                {
                    vehicleType: $('select[name=select-first]').val().trim(),
                    tariff: {
                        single: $('input[name=single-first]').val().trim(),
                        return: $('input[name=double-first]').val().trim(),
                    }
                },
                {
                    vehicleType: $('select[name=select-second]').val().trim(),
                    tariff: {
                        single: $('input[name=single-second]').val().trim(),
                        return: $('input[name=double-second]').val().trim(),
                    }
                },
                {
                    vehicleType: $('select[name=select-third]').val().trim(),
                    tariff: {
                        single: $('input[name=single-third]').val().trim(),
                        return: $('input[name=double-third]').val().trim(),
                    }
                },
                {
                    vehicleType: $('select[name=select-fourth]').val().trim(),
                    tariff: {
                        single: $('input[name=single-fourth]').val().trim(),
                        return: $('input[name=double-fourth]').val().trim(),
                    }
                }
            ]
        }
        if(validationToll(newToll.tollName, newToll.types)){
            addToll(newToll);
        }
    });
});