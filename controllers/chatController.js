const Chat = require('../models/Chat');


exports.getAllChats = (req, res) => {
  Chat.find()
      .then(chats => res.json(chats))
      .catch(err => res.status(500).json({error: err.massage}));
}

exports.createChat = (req, res) => {
  const { sender, message } = req.body;

  const newChat = new Chat({
    sender,
    message,
  });

  newChat.save()
      .then(chat => res.status(201).json(chat))
      .chat(err => res.status(500).json({ error: err.message}));


};

exports.getChatById = (req, res) => {
    const chatId = req.params.id;


    Chat.findById(chatId)
        .then(chat => {
          if(!chat) {
            return res.status(404).json({ error: 'Chat not found'})

          }
          res.json(chat);
        })
        .catch(err => res.status(500).json({error: err.message}));
};

exports.updateChatById = (req, res) => {
  const chatId = req.params.id;
  const { sender, message } = req.body;

  Chat.findByIdAndUpdate(
    chatId,
    { sender,message },
    { new: true}
  )

   .then(updatedChat => {
      if (!updatedChat) {
        return res.status(404).json({ error: 'Chat not found'})
      }
      res.json(updatedChat);

   })
   .catch(err => res.status(500).json({error: err.message}));
}

exports.deleteChatById = (req, res) => {
    const chatId = req.params.id;

    Chat.findByAndRemove(chatId)
      .then(deletedChat => {
        if (!deletedChat) {
            return res.status(404).json({ error: 'Chat not found'})
        }
        res.json({ message: 'Chat deleted successfully'});
      })
      .catch(err => res.status(500).json({ error: err.message}));
}