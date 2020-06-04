const chatService = require('../../services/chatService.js')
const chatController = {
  // db 開新的聊天室
  postChat: (req, res) =>
    chatService.postChat(req, res, (data) => res.json(data)),
  //db 抓取開過的聊天室清單
  getChats: (req, res) => {
    chatService.getChats(req, res, (data) => {
      return res.status(302).json(data)
    })
  },
  // db 抓取單一聊天室，要拿到聊天對象的userId
  getChat: (req, res) =>
    chatService.getChat(req, res, (data) => res.json(data)),
  // db 將發出的新訊息存入
  postMsg: (req, res) =>
    chatService.postMsg(req, res, (data) => res.json(data)),
  //db 取得聊天室的全部訊息
  getMsgs: (req, res) => chatService.getMsgs(req, res, (data) => res.json(data))

  // 取得(上線)使用者狀態, 共用 userCtrler?
  // getUsers: (res, req) => {},

  // // 取得聊天對象的資訊 API, 共用 userCtrler?
  // getUser: (res, req) => {},

  // // 取得過去的對話清單 API
  // getChats: (res, req) => {},

  // // 取得聊天室過去的對話紀錄 API
  // getMessages: (res, req) => {},

  // // 新增訊息 ( userId, chatId , message) Socket
  // sendMessage: (res, req) => {},

  // // 新增Chatroom Socket
  // createSocket: (res, req) => {}
}
module.exports = chatController
