const fs = require('fs');

let rawdata = fs.readFileSync('websites.json');
let websites = JSON.parse(rawdata);

// to make http calls
const axios = require('axios');

let crypto = require('crypto');

let Discord = require('discord.js');

websites["websites"].forEach(e => {
    // make get request
    axios.get(e.url)
        .then(function (response) {

            // get content and hash it
            let pageContent = response.data;
            let hash = crypto.createHash('sha1').update(pageContent).digest('base64');

            // if hash is different, then send discord notification
            if (e.hash != hash) {
                // update file with new hash
                e.hash = hash;

                let content = JSON.stringify(websites);

                fs.writeFile('websites.json', content, function (err) {
                    if (err) console.log(err);
                });
                // send discord notification
                const webhookClient = new Discord.WebhookClient(e.hook.id, e.hook.token);
                const embed = new Discord.MessageEmbed()
                .setTitle('There has been a change on this webiste')
                .setDescription(e.message)
                .setColor('#0099ff');
                
                webhookClient.send(`Something in ${e.url} has changed`, {
                    username: e.user,
                    embeds: [embed],
                });

            }



        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
});
console.log('boom?');