
(function ($tripletriad) {
    var moveFunc = function (options) {
        options = options || {};

        var d = {
            row: options.row,
            column: options.column,
            cardCollectionId: options.cardCollectionId
        };

        $.ajax({
            url: cardhero.baseUrl + 'api/games/tripletriad/' + $tripletriad.current.gameId + '/move',
            method: 'POST',
            data: JSON.stringify(d),
            contentType: 'application/json; charset=utf-8'
        })
            .done(function (data, textStatus, jqXHR) {
                if (typeof (options.successCallback) === 'function') {
                    options.successCallback(data);
                }
            })
            .fail(function () {
            });
    };

    $tripletriad.move = moveFunc;
})(window.cardhero.game.tripletriad);
