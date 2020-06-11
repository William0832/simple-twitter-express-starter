const sequelize = require('sequelize')
const db = require('../models')
const { User, Chat, Message } = db
const helpers = require('../_helpers')

const chatService = {
  // 取得(上線)使用者狀態, 共用 userService ?
  getUsers: async (res, req, callback) => {},

  // 取得聊天對象的資訊 API , 共用 userService ?
  getUser: (res, req, callback) => {},

  // 取得過去的對話清單 API
  getChats: async (res, req, callback) => {},

  // 取得聊天室過去的對話紀錄 API
  getMessages: async (res, req, callback) => {},

  // 新增訊息 ( userId, chatId , message) Socket
  sendMessage: async (res, req, callback) => {},

  // 新增Chatroom Socket
  createSocket: async (res, req, callback) => {}
}
module.export = chatService
