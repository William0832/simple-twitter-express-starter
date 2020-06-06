const { Op } = require('sequelize')
const db = require('../models')
const { User, Chat, Message } = db
const helpers = require('../_helpers')

const chatService = {
  userOnline: async (userId) => {
    try {
      let user = await User.findByPk(userId)
      user.update({ isOnline: true })
      return user.toJSON()
    } catch (err) {
      console.log(err.toString())
    }
  },
  userOffline: async (userId) => {
    try {
      await User.findByPk(userId).update({ isOnline: false })
    } catch (err) {
      console.log(err.toString())
    }
  },
  // db 開新的聊天室
  postChat: async (myId, guestId) => {
    /*
      帶入聊天對象的 guestId
      檢查特例
      建立chat
    */
    try {
      //檢查 chat 是否存在
      let chat = await Chat.findOne({
        //
        where: {
          [Op.or]: [
            { CreatedUserId: myId, InvitedUserId: guestId },
            { CreatedUserId: guestId, InvitedUserId: myId }
          ]
        }
      })
      if (chat) {
        chat = chat.dataValues
        console.log(`error: chats:${chat.id} is already exists`)
        return chat
      }
      chat = await Chat.create({
        CreatedUserId: myId,
        InvitedUserId: guestId
      })
      chat = chat.dataValues
      console.log(`chat:${chat.id} was successfully created`)
      return chat
    } catch (err) {
      console.log(err.toString())
    }
  },
  //db 抓取開過的聊天室清單
  // in: (myId)
  // out: invitees:[{'id','name','avatar','isOnline','chatId'},...]
  getChats: async (myId) => {
    /*
    帶入使用者本身的 id，
    檢查特例
    db 找 chats 包含聊天對象資料
     */
    try {
      let chats = await Chat.findAll({
        where: {
          [Op.or]: [{ CreatedUserId: myId }, { InvitedUserId: myId }]
        },
        attributes: ['id', 'CreatedUserId', 'InvitedUserId', 'createdAt']
      })

      chats = chats.map((e) => ({
        ...e.dataValues
      }))
      let userIds = []
      // 依照角色判斷，聊天對象id 存入users
      chats.forEach((c) => {
        if (c.CreatedUserId === myId) {
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
      users = users.map((e) => ({
        ...e.dataValues
      }))
      return users
    } catch (err) {
      return {
        status: 'error',
        message: err.toString()
      }
    }
  },
  // db 抓取單一聊天室，要拿到聊天對象的userId
  // in: (myId, chatId)
  // out: invitee:{'id','name','avatar','isOnline','chatId'}
  // TODO: id 版
  getChat: async (myId, chatId) => {
    try {
      let chat = await Chat.findByPk(chatId)
      if (!chat) {
        console.log('chat did not exist')
        return
      }
      chat = chat.dataValues
      // 檢查身分
      let otherUserId = ''
      if (chat.CreatedUserId === myId) {
        otherUserId = chat.InvitedUserId
      } else if (myId === chat.InvitedUserId) {
        otherUserId = chat.CreatedUserId
      } else {
        console.log('error: U do not belong to this chat')
        return
      }
      let otherUser = await User.findByPk(otherUserId, {
        attributes: ['id', 'name', 'avatar', 'isOnline']
      })
      otherUser = otherUser.dataValues
      otherUser.chatId = chatId
      return otherUser
    } catch (err) {
      console.log(err.toString())
    }
  },
  // db 將發出的新訊息存入
  postMsg: async (myId, chatId, msg) => {
    try {
      if (isNaN(req.params.id)) {
        callback({ status: 'error', message: 'chatId need to be a number!' })
      }
      let chatId = req.params.id
      let message = req.body.message
      let msg = await Message.create({
        ChatId: chatId,
        UserId: myId,
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
  getMsgs: async (myId, chatId) => {
    try {
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
}
module.exports = chatService
