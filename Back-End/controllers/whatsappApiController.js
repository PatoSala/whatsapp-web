const whatsappApiController = {

    fetchChats: (req, res) => {
        client.getChats().then((chats) => {
            res.send(chats);
        }).catch((err) => res.send(err));
    },

    fetchChat: (req, res) => {
        let chatId = req.params.phone;

        client.getChatById(chatId).then((chat) => {
            res.send(chat);
        }).catch(err => console.log(err));
    },

    fetchChatMesages: (req, res) => {
        let chatId = req.params.phone;

        client.getChatById(chatId).then((chat) => {
            chat.fetchMessages().then((messages) => {
                res.send(messages);
            }).catch(err => console.log(err));
        }).catch(err => console.log(err));
    },

    sendMessage: (req, res) => {
        let phone = req.body.phone + "@c.us";
        let message = req.body.message

        client.sendMessage(phone, message);

        res.send({
            status: 200
        })
    }

}

module.exports = whatsappApiController;