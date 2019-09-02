
$(function () {
    var ownedCards = document.querySelector('#owned-cards');
    var usedCards = document.querySelector('#used-cards');
    var maxCards = usedCards.attributes.getNamedItem('data-max-cards').value;

    dragula([ownedCards, usedCards], {
        accepts: function (el, target, source, sibling) {
            if (source != target && target.id == 'used-cards') {
                return target.childNodes.length < maxCards;
            }

            return true;
        }
    });

    $(document).on('click', '#save-deck', function () {
        var cardCollectionIds = $.map(usedCards.childNodes, function (element, index) {
            return parseInt(element.attributes.getNamedItem('data-card-collection-id').value);
        });

        $.ajax({
            url: cardhero.baseUrl + 'api/Decks/Collection/' + $(this).attr('data-deck-id'),
            method: 'POST',
            //contentType: 'application/json',
            data: {
                cardCollectionIds: cardCollectionIds
            },
            traditional: true
        })
            .done(function (data, textStatus, jqXHR) {
            });
    });
});

