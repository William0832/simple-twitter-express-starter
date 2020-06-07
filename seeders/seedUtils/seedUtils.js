// add time function
Date.prototype.addSeconds = function (s) {
  let ms = s * 1000
  this.setTime(this.getTime() + ms)
  return this
}
function generateChat(usersNum, megNum) {
  /*
  usersNum: 設定聊天人數
  megNum: 每人在聊天室的訊息數量
   */
  // 特例輸入採用預設值
  if (usersNum < 2 || megNum < 1 || !usersNum || !megNum) {
    usersNum = 5
    megNum = 2
    // console.log('未輸入數據 or 有誤，採用預設值')
    // console.log(`usersNum = ${usersNum},/n megNum = ${megNum}`)
  }
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
  let usersList = Array.from({
    length: usersNum
  }).map((e, i) => i + 1)

  // 空聊天室群
  let chatsList = []
  // 空訊息群
  let messages = []
  // n*n塞入，排除重號，先不管順序
  usersList.forEach((u1) => {
    usersList.forEach((u2) => {
      if (u1 !== u2) {
        chatsList.push([u1, u2])
      }
    })
  })
  // 先遞增排列[]內順序，並轉string
  chatsList = chatsList.map((e) => e.sort().toString())
  // 去除重複
  chatsList = chatsList.filter((e, i) => chatsList.indexOf(e) === i)
  // 再轉回[]
  chatsList = chatsList.map((e) => e.split(','))
  // create chats seed
  let chats = chatsList.map((e, index) => ({
    id: index + 1,
    CreatedUserId: e[0],
    InvitedUserId: e[1],
    createdAt: new Date(),
    updatedAt: new Date()
  }))
  // create message seed
  chatsList.forEach((chat, chatIndex) => {
    let addSecond = 0
    for (let i = 0; i < megNum; i++) {
      chat.forEach((user) => {
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
  return { chats, messages }
}

module.exports = {
  generateChat
}
