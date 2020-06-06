const { Op } = require('sequelize')
const db = require('../models')
const { User, Chat, Message } = db
const helpers = require('../_helpers')

const chatService = {
  userOnline: async (userId) => {
    try {
      let user = await User.findByPk(userId, {
        attributes: ['id', 'name', 'avatar', 'isOnline']
      })
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
      let guestIds = []
      // 依照角色判斷，聊天對象id 存入users
      chats.forEach((c) => {
        if (c.CreatedUserId === myId) {
          guestIds.push(c.InvitedUserId)
        } else {
          guestIds.push(c.CreatedUserId)
        }
      })
      // find guest information
      let guests = await User.findAll({
        where: {
          id: guestIds
        },
        attributes: ['id', 'name', 'avatar', 'isOnline']
      })
      guests = guests.map((e) => ({
        ...e.dataValues
      }))
      // each chatsList add chatId and guest
      chats = chats.map((e, index) => ({
        chatId: e.id,
        guests: guests[index]
      }))
      return chats
    } catch (err) {
      console.log(err.toString())
    }
  },
  // db 抓取單一聊天室，要拿到聊天對象的userId
  // in: (myId, chatId)
  // out: chats:{'chatId', guest:{'id','name','avatar','isOnline'}}
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
      let guestId = ''
      if (chat.CreatedUserId === myId) {
        guestId = chat.InvitedUserId
      } else if (myId === chat.InvitedUserId) {
        guestId = chat.CreatedUserId
      } else {
        console.log('error: U do not belong to this chat')
        return
      }
      let guest = await User.findByPk(guestId, {
        attributes: ['id', 'name', 'avatar', 'isOnline']
      })
      guest = guest.dataValues
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
