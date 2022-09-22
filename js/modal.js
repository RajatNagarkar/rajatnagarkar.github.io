$(document).ready(function () {
    $('span.close').click(function () {
        $('.modal').hide();
    });

    $('#add-vehicle-entry').click(function () {
        $('#add-vehicle-modal').show();
    });

    $('#add-toll-entry').click(function () {
        $('#add-toll-modal').show();
    });

    $(window).click(function (event) {
        let vehicle = $('#add-vehicle-modal')[0];
        let toll = $('#add-toll-modal')[0];
        let drop = $('#dropped')[0];
        if(event.target == vehicle || event.target == toll || event.target == drop) {
            $('.modal').hide();
            $('#dropped').hide();
        }
    });
});