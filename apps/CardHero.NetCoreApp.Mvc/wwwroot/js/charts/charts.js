
(function (window, cardhero) {
    var charts = {
        render: function (element) {
            var ctx = element.getContext('2d');
            var el = $(element);

            if (ctx) {
                $.ajax(el.attr('data-chart-js-url'), {
                    data: {
                        group: el.attr('data-chart-js-group')
                    },
                    dataType: 'json'
                })
                    .done(function (data, textStatus, jqXHR) {
                        var chart = new Chart(ctx, data);
                    });
            }
        }
    };

    cardhero.charts = charts;
})(window, cardhero);
