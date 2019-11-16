
module.exports = {
    name: "addrole",
    category: "moderation",
    description: "Adds a role",
    usage: "<id | mention>",
    run: async (client, message, args) => {

        //.addrole @someone (rolehere)
        if(!message.member.hasPermission("Owner Of The Server" || "Staff" || "Manager Of Server" || "Head Of Moderators" || "Administrator" || "Trial Staff")) return message.reply("Sorry pal, you can't do that.");
        let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
        if(!rMember) return message.reply("Couldn't find that user");
        let role = args.join(" ").slice(22);
        if(!role) return message.reply("Specify a role!");
        let gRole = message.guild.roles.find(`name`, role);
        if(!gRole) return message.reply("Couldn't find that role.");
      
        if(rMember.roles.has(gRole.id)) return message.reply("They already have that role.");
        await(rMember.addRole(gRole.id));
      
        try{
          await rMember.send(`Congrats, you have been given the role ${gRole.name}`)
        }catch(e){
          message.channel.send(`Congrats to <@${rMember.id}>, they have been given the role ${gRole.name}. We tried to DM them, but their DMs are locked.`)
        }
      }
    }