const chatService = require('../../services/chatServices')

const chatController = {
  postChat: (req, res) =>
    chatService.postChat(req, res, (data) => res.json(data)),
  // 取得(上線)使用者狀態, 共用 userCtrler?
  getUsers: (res, req) => {},

  // 取得聊天對象的資訊 API, 共用 userCtrler?
  getUser: (res, req) => {},

  // 取得過去的對話清單 API
  getChats: (res, req) => {},

  // 取得聊天室過去的對話紀錄 API
  getMessages: (res, req) => {},

  // 新增訊息 ( userId, chatId , message) Socket
  sendMessage: (res, req) => {},

  // 新增Chatroom Socket
  createSocket: (res, req) => {}
}
module.exports = chatController
