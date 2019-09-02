
$(document).on('click', '.auto-modal', function () {
    var t = $(this);
    var disabled = t.attr('data-modal-enabled') == 'false';

    if (disabled)
        return;

    var url = t.attr('data-modal-url');
    var title = t.attr('data-modal-title');

    if (url) {
        $.ajax({
            url: url
        })
            .done(function (data, textStatus, jqXHR) {
                cardhero.modal.show(data, title);
            });
    }
});
