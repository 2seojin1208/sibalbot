const Schema = require("../models/도박")
const comma = require("comma-number")
const { Permissions } = require('discord.js')

module.exports = {
    name: "돈추가",
    async execute(message, args) {
        const ehqkrduqn = await Schema.findOne({
            userid: message.author.id
        })
        if (!message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) return message.reply("당신은 관리자가 아닙니다.")
        if (!ehqkrduqn) return message.reply("**.돈줘로 돈을 먼저 받아주세요.**")
        if (isNaN(args[0])) return message.reply("**베팅 하실 금액을 입력해 주세요.**")
        const money = parseInt(args[0]);
        const random = Math.floor(Math.random() * 101)
        if (random < 0) {
            message.reply(`**꺼억 느그돈 좀 다네? ㅋㅋ\n-${comma(money)}원**`)
            await Schema.findOneAndUpdate({ userid: message.author.id }, {
                money: ehqkrduqn.money - money,
                userid: message.author.id,
                date: ehqkrduqn.date
            })
        } else {
            message.reply(`**돈 추가가 완료 되었습니다. \n+/-${comma(money)}원**`)
            await Schema.findOneAndUpdate({ userid: message.author.id }, {
                money: ehqkrduqn.money + money,
                userid: message.author.id,
                date: ehqkrduqn.date
            })
        }
    }
}