'use strict'
// 設定聊天人數
let usersNum = 5
// 每人在聊天室的訊息數量
let megNum = 2
let usersList = Array.from({ length: usersNum }).map((e, i) => i + 1)

// 對應的聊天室
let chatsList = []
// n*n塞入，排除重號，先不管順序
usersList.forEach((u1) => {
  usersList.forEach((u2) => {
    if (u1 !== u2) {
      chatsList.push([u1, u2])
    }
  })
})
// 先遞增排列[]內順序，並轉string
chatsList = chatsList.map((e) => e.sort()).map((e) => e.toString())
// 去除重複
chatsList = chatsList.filter((e, i) => chatsList.indexOf(e) === i)
// 再轉回[]
chatsList = chatsList.map((e) => e.split(','))

// 罐頭訊息庫
let megsList = [
  '安安你好',
  '洗澡睡',
  '晚安',
  '你在幹嘛?',
  '88',
  '在嗎?',
  '早!',
  '吃午餐?',
  '哈哈',
  'lol',
  '^v^',
  '6/6繼續發大財',
  '你就是百年難得一見的練武奇才'
]
// add time function
Date.prototype.addSeconds = function (s) {
  let ms = s * 1000
  this.setTime(this.getTime() + ms)
  return this
}
// create message seed
let messages = []
chatsList.forEach((chat, chatIndex) => {
  let addSecond = 0
  for (let i = 0; i < megNum; i++) {
    chat.forEach((user, userIndex) => {
      addSecond = addSecond + 1
      let time = new Date()
      let newTime = time.addSeconds(addSecond)
      messages.push({
        message: megsList[Math.floor(Math.random() * megsList.length)],
        UserId: user,
        ChatId: chatIndex,
        createdAt: newTime,
        updatedAt: newTime
      })
    })
  }
})
// export
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Messages', messages)
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Messages', null, { truncate: true })
  }
}
