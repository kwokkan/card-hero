
$(function () {
    var selectedClass = ['bg-primary', 'text-white'];
    var disabledClass = ['disabled', 'bg-secondary', 'text-white'];
    var playableClass = 'playable';
    var gameCards = document.querySelector('.game-cards');
    var currentCard;

    $(document).on('click', '.current-card, .game-card', function () {
        // usable cards
        if (this.classList.contains('current-card') && !this.classList.contains(disabledClass[0])) {
            if (currentCard) {
                currentCard.classList.remove(...selectedClass);
            }

            if (currentCard == this) {
                currentCard = null;
                gameCards.classList.remove(playableClass);
            }
            else {
                currentCard = this;
                currentCard.classList.add(...selectedClass);
                gameCards.classList.add(playableClass);
            }
        }
        // cards on grid
        else if (this.classList.contains('game-card')) {
            if (currentCard) {
                var collectionId = 'data-card-collection-id';
                if (!this.getAttribute(collectionId)) {
                    this.setAttribute(collectionId, currentCard.getAttribute(collectionId));
                    this.children[0].textContent = currentCard.textContent;

                    currentCard.classList.remove(...selectedClass);
                    currentCard.classList.add(...disabledClass);
                    currentCard = null;
                    gameCards.classList.remove(playableClass);

                    var data = {
                        row: this.getAttribute('data-row'),
                        column: this.getAttribute('data-column'),
                        cardCollectionId: this.getAttribute(collectionId),
                        successCallback: function (data) {
                            console.log(data);
                        }
                    };

                    cardhero.game.tripletriad.move(data);
                }
            }
        }
    });
});
