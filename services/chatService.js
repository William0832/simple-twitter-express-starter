const { Op } = require('sequelize')
const db = require('../models')
const { User, Chat, Message } = db

const chatService = {
  userOnline: async (userId) => {
    try {
      let user = await User.findByPk(userId)
      await user.update({ isOnline: true })
    } catch (err) {
      console.log(err.toString())
    }
  },
  userOffline: async (userId) => {
    try {
      let user = await User.findByPk(userId)
      await user.update({ isOnline: false })
    } catch (err) {
      console.log(err.toString())
    }
  },
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
        },
        attributes: ['id']
      })
      if (chat) {
        console.log(`error: chats is already exists`)
        chat = chat.dataValues
        chat.chatId = chat.id
        delete chat.id
        return chat.dataValues
      }
      newChat = await Chat.create({
        CreatedUserId: myId,
        InvitedUserId: guestId
      })
      chat = { chatId: newChat.dataValues.id }
      console.log(`chat was successfully created`)
      // add user info for frontend
      let user = await User.findByPk(guestId, {
        attributes: ['id', 'name', 'avatar', 'isOnline']
      })
      user = user.dataValues
      // final merger
      user.userId = user.id
      delete user.id
      chat = {
        ...user,
        ...chat
      }
      return chat
    } catch (err) {
      console.log(err)
    }
  },
  getNewUser: async (id) => {
    try {
      let user = await User.findByPk(id, {
        attributes: ['id', 'name', 'avatar', 'isOnline']
      })
      user = user.dataValues
      user.userId = user.id
      user.lastMsg = null
      delete user.id
      return user
    } catch (err) {
      console.log(err.toString())
    }
  },

  //db 抓取開過的聊天室清單
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
        attributes: ['id', 'CreatedUserId', 'InvitedUserId']
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

      // each chats add chatId and guest
      chats = chats.map((e, index) => ({
        chatId: e.id,
        ...guests[index]
      }))
      chats = Promise.all(
        chats.map(async (chat) => {
          let lastMsg = await Message.findAll({
            where: { ChatId: chat.chatId },
            attributes: ['message', 'createdAt', 'UserId'],
            sort: ['created', 'DEC'],
            limit: 1
          })
          lastMsg = lastMsg[0]
          if (!lastMsg) {
            lastMsg = null
          } else {
            lastMsg = lastMsg.dataValues
          }
          let temp = {
            ...chat,
            userId: chat.id,
            lastMsg: lastMsg
          }
          delete temp.id
          return temp
        })
      )
      return chats
    } catch (err) {
      console.log(err.toString())
    }
  },
  // 抓取單一聊天室，要拿到聊天對象的userId
  getChat: async (myId, guestId) => {
    try {
      let chat = await Chat.findOne({
        where: {
          [Op.or]: [
            { CreatedUserId: myId, InvitedUserId: guestId },
            { CreatedUserId: guestId, InvitedUserId: myId }
          ]
        },
        attributes: ['id']
      })
      if (!chat) {
        console.log('chat did not exist')
        return null
      }
      chat = chat.dataValues
      chat.chatId = chat.id
      delete chat.id
      return chat
    } catch (err) {
      console.log(err.toString())
    }
  },
  getChatByChatId: async (id) => {
    try {
      let chat = await Chat.findByPk(id, {
        attributes: ['id', 'InvitedUserId', 'CreatedUserId']
      })
      chat = chat.dataValues
      let inviter = await User.findByPk(chat.CreatedUserId, {
        attributes: ['name', 'avatar']
      })
      let guest = await User.findByPk(chat.InvitedUserId, {
        attributes: ['name', 'avatar']
      })
      inviter = inviter.dataValues
      guest = guest.dataValues
      let data = {
        invitedUsername: inviter.name,
        guestUserName: guest.name,
        invitedUserAvatar: inviter.avatar,
        guestUserAvatar: inviter.avatar,
        chatroomId: chat.id
      }
      return data
    } catch (err) {
      console.log(err.toString())
    }
  },
  // db 將發出的新訊息存入
  postMsg: async (myId, chatId, message) => {
    try {
      console.log('creating msg ')

      // let chatId = req.params.id
      // let message = req.body.message
      let msg = await Message.create({
        ChatId: chatId,
        UserId: myId,
        message: message,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      console.log('successfully create msg ')
    } catch (err) {
      console.log(err.toString())
    }
  },
  //db 取得聊天室的全部訊息
  getMsgs: async (chatId) => {
    try {
      let msgs = await Message.findAll({
        where: { ChatId: chatId },
        attributes: ['message', 'userId'],
        // 按時間遞減
        order: [['createdAt', 'DESC']]
      })
      msgs = msgs.map((e) => ({ ...e.dataValues }))
      return msgs
    } catch (err) {
      console.log(err.toString())
    }
  }
}
module.exports = chatService
