const comma = require("comma-number")
const Schema = require("../models/도박")
const { Permissions } = require('discord.js')

module.exports = {
    name: "돈수정",
    async execute(message, args) {
        if (!message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) return message.reply("당신은 관리자가 아닙니다.")
        const user = message.mentions.members.first() //user를 멘션한 유저로 지정
        if (!user) return message.reply("**수정할 대상을 멘션해주세요**") // 멘션 한 유저가 없다면 리턴
        const sk = await Schema.findOne({ userid: message.author.id }) // 데이터베이스에서 userid 가 메세지를 보낸사람의 id인것을 검색
        const tkdeoqkd = await Schema.findOne({ userid: user.id })// 위에랑 비슷함 ( 데이터베이스에서 멘션한 유저를 검색)
        if (!sk) return message.reply("**가입을 먼저 진행해주세요. ( .돈줘 )**") // 데이터베이스에서 userid 가 메세지를 보낸사람의 id인것이 없다면 리턴
        if (!tkdeoqkd) return message.reply("**송금할 대상이 가입을 하지 않았습니다. (.돈줘)**") // 위에꺼랑 비슷 (데이터베이스에서 멘션한 유저를 찾을 수 없으면 리턴)
        const betting = parseInt(args[1]) //2번쨰 args에서 숫자를 찾음
        if (!betting) return message.reply("**사용법 : .돈수정 @멘션 (금액)**") // 2번쨰 args에서 숫자를 못찾으면 리턴
        const money = parseInt(sk.money) // money를 메세지를 보낸사람의 돈으로 지정
        const money2 = parseInt(tkdeoqkd.money) // money2를 멘션한 유저의 돈으로 지정
        await Schema.findOneAndUpdate({ userid: message.author.id }, { // 데이터베이스를 검색하고 업데이트
            money: money + betting,
            userid: message.author.id,
            date: sk.date
        })
        await Schema.findOneAndUpdate({ userid: user.id }, {
            money: money2 - betting,
            userid: user.id,
            date: tkdeoqkd.date
        })
        const embed = new (require("discord.js")).MessageEmbed() //임베드 생성
            .setTitle("수정이 정상적으로 처리되었습니다") // 임베드 제목
            .setColor("GREEN") // 임베드 색깔
            .setTimestamp() // 밑에쪽에 임베드가 생성된 시간 나타내기
            .setDescription(`**<@${message.author.id}> (관리자)의 잔액 : ${comma(money - betting)}원\n\n<@${user.id}> (수정당한 사람)의 잔액 : ${money2 + betting}원\n\n위의 수정된 돈은 오류가 있습니다. 각자 (.잔액)을 쳐서 남은 돈이 얼마인지 확인하세요.**`)//임베드 설명

        message.channel.send({ embeds: [embed] }) //임베드 보내기
    }
}