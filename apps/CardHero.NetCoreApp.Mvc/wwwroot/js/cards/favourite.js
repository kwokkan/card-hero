
$(document).on('click', '.card-favourite', function () {
    var t = $(this);

    $.ajax({
        url: cardhero.baseUrl + 'api/Cards/Favourite/' + t.attr('data-card-id'),
        method: 'POST'
    })
        .done(function (data, textStatus, jqXHR) {
            if (data) {
                t.addClass('enabled');
            }
            else {
                t.removeClass('enabled');
            }
        });
});
