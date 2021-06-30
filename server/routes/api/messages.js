const router = require("express").Router();
const { Conversation, Message } = require("../../db/models");
const onlineUsers = require("../../onlineUsers");

// expects {recipientId, text, conversationId } in body (conversationId will be null if no conversation exists yet)
router.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const senderId = req.user.id;
    const { recipientId, text, conversationId, sender } = req.body;

  //find a conversation...
    let conversation = await Conversation.findConversation(
      senderId,
      recipientId
    );

    // if we already know conversation id, find the conversion by senderId and recipientId
    // and make sure conversationId matches. Then add it to message and return
    if (conversationId) {
      if(conversation && conversation.id == conversationId) {
        const message = await Message.create({ senderId, text, conversationId });
        return res.json({ message, sender });
      } 
      // given conversation id doesn't exist
      return res.status(401).json({ error: "Cannot send message to different user's conversation" });
    }
    
    if (!conversation) {
      // create conversation
      conversation = await Conversation.create({
        user1Id: senderId,
        user2Id: recipientId,
      });
      if (sender && onlineUsers.includes(sender.id)) {
        sender.online = true;
      }
    }
    const message = await Message.create({
      senderId,
      text,
      conversationId: conversation.id,
    });
    return res.json({ message, sender });
  } catch (error) {
    next(error);
  }
});




module.exports = router;



