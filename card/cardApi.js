const express = require("express");
const router = express.Router();
const cardService = require('./cardService');
const { insertValidation } = require('./cardValidation')
const verify = require('../user/verifyToken');

router.post('/' ,async (request, response) => {
    const {error} = insertValidation(request.body);

    if(error) return response.status(400).send(error.details[0].message)

    const nameExists = await cardService.getCard(request.body.name)
    
    if(nameExists) return response.status(400).send('Card with specified name already exists')

    try{
        const savedCard = await cardService.createCard(request.body.name, request.body.picture)
        response.send({card: savedCard._id});
    }catch (err){
        response.status(400).send(err);
    }
})

router.get('/' ,async (request, response) => {

    try{
        const cards = await cardService.getCards()
        response.json(cards);
      } catch(err){
        response.json({message:err});
      }
})

router.get('/:cardId', async (request, response) => {
    try{
    const card = await cardService.getCard(request.params.cardId)
    response.json(card)
    }catch(err) {
      response.json({message:err})
    }
  });

  router.delete('/:cardId', async (request, response) => {
    try{
      const removedCard = await cardService.removedCard({_id: request.params.dreamId});
      response.json(removedCard);
    } catch (err) {
      response.json({message: err})
    }
  });
  
  router.patch(':/cardId', async (request, response) => {
    try{
      const updatedCard = await cardService.updateCard(
        {_id: request.params.dreamId },
        {$set: {name: request.body.name}}
      );
      response.json(updatedCard);
    } catch(err){
      response.json({message: err});
    }
  });

module.exports = router;