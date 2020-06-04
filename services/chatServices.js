const sequelize = require('sequelize')
const db = require('../models')
const { User, Chat, Message } = db
const helpers = require('../_helpers')

const chatService = {
  postChat: (req, res, callback) => {}

  // // 取得(上線)使用者狀態, 共用 userService ?
  // getUsers: async (req, res, callback) => {},

  // // 取得聊天對象的資訊 API , 共用 userService ?
  // getUser: (req, res, callback) => {},

  // // 取得過去的對話清單 API
  // getChats: async (req, res, callback) => {},

  // // 取得聊天室過去的對話紀錄 API
  // getMessages: async (req, res, callback) => {},

  // // 新增訊息 ( userId, chatId , message) Socket
  // sendMessage: async (req, res, callback) => {},

  // // 新增Chatroom Socket
  // createSocket: async (req, res, callback) => {}
}
module.export = chatService
