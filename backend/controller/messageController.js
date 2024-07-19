const conversationModel = require("../model/conversationModel");
const messageModel = require("../model/messageModel");
const { getReceiverSocketId, io } = require("../socket/socket");

const sendMessageController = async (req, res) => {
  try {
    const senderId = req.id;
    const reciverId = req.params.id;
    const { message } = req.body;

    let getconversation = await conversationModel.findOne({
      participants: { $all: [senderId, reciverId] },
    });

    if (!getconversation) {
      getconversation = await conversationModel.create({
        participants: [senderId, reciverId],
      });
    }
    const newMessage = await messageModel.create({
      senderId,
      reciverId,
      message,
    });
    if (newMessage) {
      getconversation.messages.push(newMessage._id);
    }

    await Promise.all([getconversation.save(), newMessage.save()]);
    // await getconversation.save();

    const reciverSoketId = await getReceiverSocketId(reciverId);
    if (reciverSoketId) {
      io.to(reciverSoketId).emit("newMessage", newMessage);
    }

    return res.status(200).send({
      success: true,
      newMessage,
    });
  } catch (error) {
    console.log(error);
  }
};

const getMessageController = async (req, res) => {
  try {
    const senderId = req.id;
    const reciverId = req.params.id;

    const conversation = await conversationModel
      .findOne({
        participants: { $all: [senderId, reciverId] },
      })
      .populate("messages");

    if (!conversation) {
      return res.status(401).send({
        success: false,
        message: "no conversation",
      });
    }

    return res.status(200).send(conversation?.messages);
  } catch (error) {
    console.log(error);
  }
};
module.exports = { sendMessageController, getMessageController };
