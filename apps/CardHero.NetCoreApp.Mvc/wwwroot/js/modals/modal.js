
(function ($modal) {
    var modalId = 'cardhero-modal';
    var modalSelector;
    var modalHtmlString = `
<div id="${ modalId }" class="modal fade">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title"></h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">OK</button>
      </div>
    </div>
  </div>
</div>`;

    var bindShown = function () {
        var buttonSelector = '.modal-footer .btn-primary';
        modalSelector.find(buttonSelector).off('click').on('click', function () {
            var autoPostForm = modalSelector.find('form.auto-post');

            if (autoPostForm.length > 0) {
                $.ajax({
                    url: autoPostForm.attr('action'),
                    method: autoPostForm.attr('method'),
                    data: autoPostForm.serialize()
                })
                    .done(function (data, textStatus, jqXHR) {
                        if (typeof (data) == 'object' && data.redirectUrl) {
                            window.location = data.redirectUrl;
                        }

                        modalSelector.hide();
                    });
            }
        });
    };

    var initModal = function () {
        $('#' + modalId).remove();
        $('body').append(modalHtmlString);
        modalSelector = $('#' + modalId);

        modalSelector.on('shown.bs.modal', bindShown);
    };

    var bindHidden = function () {
    };

    $modal.show = function (content, title) {
        initModal();

        modalSelector.find('.modal-body').append(content);
        modalSelector.find('.modal-title').text(title);
        modalSelector.modal();
    };
})(window.cardhero.modal);
