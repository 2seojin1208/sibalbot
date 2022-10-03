module.exports = {
    name: "한강온도",
    description: "한강 온도를 표시해요",
    aliases: ['ㅎㄱㅇㄷ', '한강', 'ㅎㄱ', 'gksrkddhseh', 'gksrkd', 'grde', 'gr'],
    execute(message) {
    const fetch = require('node-fetch')
    const { MessageEmbed } = require('discord.js')
        const url = `https://api.hangang.msub.kr/`
        try {
            fetch(url).then(res => res.json()).then(async json => {
                const dd = new MessageEmbed()
                    .setTitle(`지금의 한강 물 온도에요!`)
                    .setDescription(`${json.temp}℃ 
                    ${json.time}에 업데이트 된 정보에요!`)
                    .setColor("BLUE")
                message.channel.send({ embeds: [dd] })
            })
        } catch (error) {
            message.channel.send(error)
        }
    }
}