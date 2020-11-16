const cardRepository = require('./cardRepository')

function getCard(name) {
    return cardRepository.getCard(name);
}

function getCards() {
    return cardRepository.getCards();
}

function createCard( name, picture) {

    return cardRepository.createCard(name, picture)
}

function deleteCard(id) {
    return cardRepository.deleteCard(id)
}

function updateCard(id, name) {
    return cardRepository.updateOne(
        {_id: id },
        {$set: name}
      );
}



module.exports = { getCard, createCard, deleteCard, getCards , updateCard}