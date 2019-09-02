
$(document).on('click', '.deck-favourite', function () {
    var t = $(this);

    $.ajax({
        url: cardhero.baseUrl + 'api/Decks/Favourite/' + t.attr('data-deck-id'),
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
