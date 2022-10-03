const { Client , Intents , Collection}  = require('discord.js')
const client = new Client({intents:32767})
const {prefix , token} = require('./config.json')
const mongoose = require("mongoose")
const fs = require('fs')
module.exports = client

mongoose.connect("mongodb+srv://123:123@cluster0.6krvjy8.mongodb.net/?retryWrites=true&w=majority",{
}).then(console.log("DB연결 성공"))

client.once('ready',()=>{
    console.log("봇이 준비되었습니다")
})

client.commands = new Collection()

const commandsFile = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

for(const file of commandsFile){
    const command = require(`./commands/${file}`)
    client.commands.set(command.name , command)
}

client.on('messageCreate' , message=>{
    if(!message.content.startsWith(prefix)) return
    const args = message.content.slice(prefix.length).trim().split(/ +/)
    const commandName = args.shift()
    const command = client.commands.get(commandName)
    if (!command) return
    try{
        command.execute(message,args)
    } catch (error) {
        console.error(error)
    }
})

client.login(token)