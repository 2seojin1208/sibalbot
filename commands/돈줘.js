const comma = require("comma-number")
module.exports = {
    name: "돈줘",
    async execute(message) {
        const t = new Date()
        const date = "" + t.getFullYear() + t.getMonth() + t.getDate();
        const schema = require("../models/도박")
        const ehqkrduqn = await schema.findOne({
            userid: message.author.id
        })
        if (!ehqkrduqn) {
            let newData = new schema({
                money: parseInt(6000),
                userid: message.author.id,
                date: date
            })
            newData.save()
            message.channel.send("**시작하는걸 환영합니다 6,000원을 드렸습니다.**")
        } else {
            if (ehqkrduqn.date == date) return message.channel.send("이미 오늘 돈을 받으셨습니다")
            const money = parseInt(ehqkrduqn.money)
            await schema.findOneAndUpdate({ userid: message.author.id }, {
                money: money + 5000,
                userid: message.author.id,
                date: date
            })
            const f = money + 5000
            message.channel.send(`5,000원을 드렸습니다. ! \n현재잔액 : ${comma(f)}`)
        }
    }
}