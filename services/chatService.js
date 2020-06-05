const { Op } = require('sequelize')
const db = require('../models')
const { User, Chat, Message } = db
const helpers = require('../_helpers')
// const { print } = require('../__helper')

const chatService = {
  // db 開新的聊天室
  postChat: async (req, res, callback) => {
    /*
      帶入聊天對象的 userId，
      檢查特例
      建立chat
    */
    try {
      // 檢查 userId
      if (!req.body.userId) {
        return callback({
          status: 'error',
          message: 'userId did not exist'
        })
      }
      let currentUser = helpers.getUser(req)
      let userId = req.body.userId
      //檢查 chat 是否存在
      let chat = await Chat.findOne({
        //
        where: {
          [Op.or]: [
            { CreatedUserId: currentUser.id, InvitedUserId: userId },
            { CreatedUserId: userId, InvitedUserId: currentUser.id }
          ]
        }
      })
      if (chat) {
        chat = chat.dataValues
        return callback({
          status: 'error',
          message: `chats:${chat.id} is already exists`
        })
      }
      chat = await Chat.create({
        CreatedUserId: currentUser.id,
        InvitedUserId: userId
      })
      chat = chat.dataValues
      return callback({
        status: 'success',
        message: `chat:${chat.id} was successfully created`
      })
    } catch (err) {
      callback({ status: 'error', message: err.toString() })
    }
  },
  //db 抓取開過的聊天室清單
  getChats: async (req, res, callback) => {
    /*
    帶入使用者本身的 id，
    檢查特例
    db 找 chats 包含聊天對象資料
     */
    try {
      let currentUser = helpers.getUser(req)
      let chats = await Chat.findAll({
        where: {
          [Op.or]: [
            { CreatedUserId: currentUser.id },
            { InvitedUserId: currentUser.id }
          ]
        },
        attributes: ['id', 'CreatedUserId', 'InvitedUserId', 'createdAt']
      })

      chats = chats.map((e) => ({
        ...e.dataValues
      }))
      let userIds = []
      // 依照角色判斷，聊天對象id 存入users
      chats.forEach((c) => {
        if (c.CreatedUserId === currentUser.id) {
          userIds.push(c.InvitedUserId)
        } else {
          userIds.push(c.CreatedUserId)
        }
      })
      // find users information
      let users = await User.findAll({
        where: {
          id: userIds
        },
        attributes: ['id', 'name', 'avatar', 'isOnline']
      })
      // each user add chatId
      chats.forEach((c, index) => {
        users[index].dataValues.chatId = c.id
      })

      callback({ users })
    } catch (err) {
      callback({
        status: 'error',
        message: err.toString()
      })
    }
  },
  // db 抓取單一聊天室，要拿到聊天對象的userId
  getChat: async (req, res, callback) => {
    try {
      /*
      帶入chatId，
      檢查特例
      db 找 chat 
      */
      if (!req.params.id) {
        return callback({
          status: 'error',
          message: 'chatId did not exist'
        })
      }
      let chatId = req.params.id
      let chat = await Chat.findByPk(chatId)
      if (!chat) {
        return callback({
          status: 'error',
          message: 'chat did not exist'
        })
      }
      chat = chat.dataValues
      // 檢查身分
      let currentUser = helpers.getUser(req)
      let userId = ''
      if (chat.CreatedUserId === currentUser.id) {
        userId = chat.InvitedUserId
      } else if (currentUser.id === chat.InvitedUserId) {
        userId = chat.CreatedUserId
      } else {
        callback({ status: 'error', message: 'U do not belong to this chat' })
      }
      let user = await User.findByPk(userId, {
        attributes: ['id', 'name', 'avatar', 'isOnline']
      })
      user = user.dataValues
      user.chatId = chatId
      callback({ user })
    } catch (err) {
      callback({ status: 'error', message: err.toString() })
    }
  },
  // db 將發出的新訊息存入
  postMsg: async (req, res, callback) => {
    try {
      if (isNaN(req.params.id)) {
        callback({ status: 'error', message: 'chatId need to be a number!' })
      }
      let chatId = req.params.id
      let currentUser = helpers.getUser(req)
      let message = req.body.message
      let msg = await Message.create({
        ChatId: chatId,
        UserId: currentUser.id,
        message: message
      })
      callback({
        status: 'success',
        message: 'message was successfully created'
      })
    } catch (err) {
      callback({ status: 'error', message: err.toString() })
    }
  },
  //db 取得聊天室的全部訊息
  getMsgs: async (req, res, callback) => {
    try {
      if (isNaN(req.params.id)) {
        callback({ status: 'error', message: 'chatId need to be a number!' })
      }
      let chatId = req.params.id
      console.log(chatId)

      let msgs = await Message.findAll({
        where: { ChatId: chatId },
        include: [
          { model: User, attributes: ['id', 'name', 'avatar', 'isOnline'] }
        ],
        attributes: ['id', 'message', 'createdAt'],
        // 按時間遞減
        order: [['createdAt', 'DESC']]
      })
      callback({ msgs })
    } catch (err) {
      callback({ status: 'error', message: err.toString() })
    }
  }

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
module.exports = chatService
