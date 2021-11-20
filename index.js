const Discord = require("discord.js"); 

const Client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_VOICE_STATES,
        Discord.Intents.FLAGS.GUILD_INVITES,
        Discord.Intents.FLAGS.GUILD_MEMBERS,
        Discord.Intents.FLAGS.GUILD_BANS,
        Discord.Intents.FLAGS.GUILD_INTEGRATIONS
    ]
});

const prefix = "!";

Client.on("ready", () => {
    console.log("Le bot est mis en ligne.");
});

Client.on("messageCreate", message => {
    if (message.author.bot) return;

    //!help
    if (message.content === prefix + "help"){

        message.channel.bulkDelete(1)

        const icon = message.guild.iconURL();

        const embed = new Discord.MessageEmbed()
            .setTitle("Liste des commandes du bot")
            .setAuthor("Private Bot", "https://cdn.discordapp.com/avatars/739827798247735386/0e8dab5462a7623bb0a45667cb8bf8ce.png?size=4096")
            .setColor("#0084ff")
            .setDescription("Test")
            .addField("Informations", "!help - Afficher la liste des commandes \n !serverinfo - Afficher les informations à propos du serveur \n !ping - Afficher le ping du bot")
            .addField("Modération", "!clear - Supprimer des messages")
            .setFooter(`${message.guild}`, `${icon}`)
            .setTimestamp()

        message.channel.send({embeds: [embed]});
    }

    //!ping
    else if (message.content === prefix + "ping") {//ici on utilise else if pour faire un enchainement, "!ping" est vérifier puis "!help" et ainsi de suite...
        
        message.channel.bulkDelete(1)

        var ping = Client.ws.ping

        message.channel.send("🏓 Pong! Mon ping est de " + ping + "ms !")
    }

    //!clear
    else if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content
      .toLowerCase()
      .slice(prefix.length)
      .trim()
      .split(/\s+/);
    const [command, input] = args;

    if (command === 'clear') {
      
        message.channel.bulkDelete(1)

        if (input >= 100) {
            return message.channel
            .send('Veuillez utiliser un chiffre compris entre 1 et 99')
            .then((sent) => {
                setTimeout(() => {
                sent.delete();
                }, 2500);
            });
        }

        if (isNaN(input) || Number(input) < 0) {
            return message.channel
            .send('Utiliser sous la forme ```!clear <nombre>```')
            .then((sent) => {
                setTimeout(() => {
                sent.delete();
                }, 2500);
            });
        }
    
        const amount = Number(input) > 100
            ? 101
            : Number(input) + 1;
    
        message.channel.bulkDelete(amount, true)
        .then((_message) => {
            message.channel
            .send(`\`${_message.size - 1}\` messages ont été supprimé :broom:`)
            .then((sent) => {
                setTimeout(() => {
                sent.delete();
                }, 2500);
            });
        });
    }
    
    //!serverinfo
    else if (message.content === prefix + "serverinfo") {

        message.channel.bulkDelete(1)

        const icon = message.guild.iconURL();
        const embed = new Discord.MessageEmbed()
            .setColor("#0084ff")
            .setTitle("Informations")
            .setImage(icon)
            .setDescription(`Informations de **${message.guild}** !`)
            .addField("**Date de création**", `${message.guild.createdAt.toLocaleString()}`)
            .addField("**Propriétaire**", `Le propriétaire est ${message.guild.owner}`)
            .addField("**Membres**", "Il y a ` " + `${message.guild.memberCount}` + " ` **Membres**")
            .addField("**Emojis**", "Le serveur a ` " + `${message.guild.emojis.cache.size}` + " ` **Emojis**")
            .addField("**Rôles**", "Le serveur a ` " + `${message.guild.roles.cache.size}` + " ` **Rôles**")
            .addField("**Channels**", "Le serveur a ` " + `${message.guild.channels.cache.size}` + " ` **Channels**")
            .addField("**Logo**", "**Downlaod Server Logo**")
            .setURL("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
            .setAuthor("Private Bot", "https://cdn.discordapp.com/avatars/739827798247735386/0e8dab5462a7623bb0a45667cb8bf8ce.png?size=4096")

        message.channel.send({embeds: [embed]})
    }

Client.on('guildMemberAdd', member => {
    member.guild.channels.get('906317133036806154').send("Welcome"); 
});

});

//error
process.on('unhandledRejection', error => {
	console.error('Unhandled promise rejection:', error);
});
Client.on('shardError', error => {
	console.error('A websocket connection encountered an error:', error);
});

Client.login(process.env.TOKEN);
