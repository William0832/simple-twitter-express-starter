const { Op } = require('sequelize')
const db = require('../models')
const { User, Chat, Message } = db
const helpers = require('../_helpers')

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
      let chats = await Chat.findAll({
        //
        where: {
          [Op.or]: [
            { CreatedUserId: currentUser.id, InvitedUserId: userId },
            { CreatedUserId: userId, InvitedUserId: currentUser.id }
          ]
        }
      })
      if (chats) {
        return callback({
          status: 'error',
          message: `chat:${chat.id} is already exists`
        })
      }
      await Chat.create({
        CreatedUserId: currentUser.id,
        InvitedUserId: userId
      })
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
      let users = await User.findAll({
        where: {
          id: userIds
        },
        attributes: ['id', 'name', 'avatar', 'isOnline']
      })
      chats.forEach((c, index) => {
        console.log(c)
        users[index].dataValues.chatId = c.id
      })

      callback({
        status: 'success',
        message: users
      })
    } catch (err) {
      callback({
        status: 'error',
        message: err.toString()
      })
    }
  },
  // db 抓取單一聊天室，要拿到聊天對象的userId
  // TODO: 快寫!
  getChat: async (req, res, callback) => {
    try {
    } catch (err) {
      callback({ status: 'error', message: err.toString() })
    }
  },
  // db 將發出的新訊息存入
  postMsg: async (req, res, callback) => {
    try {
    } catch (err) {
      callback({ status: 'error', message: err.toString() })
    }
  },
  //db 取得聊天室的全部訊息
  getMsgs: async (req, res, callback) => {
    try {
    } catch (err) {
      callback({ status: 'error', message: err.toString() })
    }
  }

  // doSomething: async (req, res, callback) => {
  //   try {
  //   } catch (err) {
  //     callback({ status: 'error', message: err.toString() })
  //   }
  // }

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
