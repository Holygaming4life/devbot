const Discord = require('discord.js');

const client = new Discord.Client();

const ms = require("ms");

const token = 'NjQyOTEwNDUxNDYxNTIxNDUx.XdCLGA.jWwBW1SQXTYGkstF2wGBvI-pU8w';

const PREFIX = '.';

client.on('ready', () => {
    console.log('The bot is online and working!');
    client.user.setActivity('this server', { type: 'WATCHING' }).catch(console.error);
})

client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.find(channel => channel.name === "general");
    if (!channel) return;

    channel.send(`Welcome to We-Are-Devs, ${member}, feel free to look around and make yourself at home!`)
});

client.on('message', message => {
    const user = message.mentions.users.first();
    
    const member = message.guild.member(user);


    let args = message.content.substring(PREFIX.length).split(" ");

    switch (args[0]) {

///////////////////////////////////////////////    MODERATION    //////////////////////////////////////////////////////////////////////////////////////////


        case 'kick':
            if (!message.member.roles.find(r => r.name === "Owner Of The Server" || "Manager Of Server" || "Head Of Moderators" || "Administrator" || "Staff")) return message.channel.send('You do not have permission to do this!')

            if (!args[1]) message.channel.send('You need to specify a member to complete this action')



            if (user) {
 

                if (member) {
                    member.kick('You were kicked from We-Are-Devs!').then(() => {
                        message.reply(`Sucessfully kicked ${user.tag}`);
                    }).catch(err => {
                        message.reply('I couldnt kick this user!');
                        console.log(err);
                    });
                } else {
                    message.reply('That user isn\'t in this server!')
                }
            } else {
                message.reply('You need to specify a person!')
            }


            break;



                case 'ban':
                    if (!message.member.roles.find(r => r.name === "Owner Of The Server" || "Manager Of Server" || "Head Of Moderators" || "Administrator" || "Staff")) return message.channel.send('You do not have permission to do this!')

                    if (!args[1]) message.channel.send('You need to specify a member to complete this action')

                    if (user) {

                        if (member) {
                            member.bannable('You were banned from We-Are-Devs!').then(() => {
                                message.reply(`Sucessfully banned ${user.tag}`);
                            }).catch(err => {
                                message.reply('I couldnt ban this user!');
                                console.log(err);
                            });
                        } else {
                            message.reply('That user isn\'t in this server!')
                        }
                    } else {
                        message.reply('You need to specify a person!')
                    }


                    break;

                    case 'mute':
                            var person  = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));
                            if(!person) return  message.reply("I cannot find the member " + person)
                 
                            let mainrole = message.guild.roles.find(role => role.name === "We Are Devs (WAD)");
                            let role = message.guild.roles.find(role => role.name === "Muted");
                           
                 
                            if(!role) return message.reply("I couldn\'t find the \"Muted\" role")
                 
                 
                            let time = args[2];
                            if(!time){
                                return message.reply("You need to specify a time!");
                            }
                 
                            person.removeRole(mainrole.id)
                            person.addRole(role.id);
                 
                 
                            message.channel.send(`@${person.user.tag} has now been muted for ${ms(ms(time))}`)
                 
                            setTimeout(function(){
                               
                                person.addRole(mainrole.id)
                                person.removeRole(role.id);
                                console.log(role.id)
                                message.channel.send(`@${person.user.tag} has been unmuted.`)
                            }, ms(time));
                 
                 
                   
                        break;
                    }
            

});
client.login(process.env.BOT_TOKEN);
