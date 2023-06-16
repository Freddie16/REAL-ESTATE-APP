const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
//chat related functionality
router.get('/', chatController.getAllChats);
router.post('/create/chat', chatController.createChat);
router.get('/:id', chatController.getChatById);
router.put('/:id',chatController.updateChatById);
router.delete('/:id', chatController.deleteChatById);

module.exports = router;