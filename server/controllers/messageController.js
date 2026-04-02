import { Conversation } from "../models/conversationModel.js";
import { Message } from "../models/messageModel.js";

export const sendMessage = async(req,res)=>{
    try {
        const receiverId = req.params.id;
        const senderId = req.id;
        const {message} = req.body;
        let gotConversation = await Conversation.findOne({participants:{$all:[senderId,receiverId]}});
        if(!gotConversation){
            gotConversation = await Conversation.create({
                participants:[senderId,receiverId]
            })
        };
        const newMessage = await Message.create({
            senderId,
            receiverId,
            message
        });

        if(newMessage){
            gotConversation.messages.push(message._id);
        };
        await gotConversation.save();
        return res.status(200).json({message:"Message send successfully!",success:true})

    } catch (error) {
        console.error("");
        return res.status(500).json({message:"Internal server error"})
    }
}



