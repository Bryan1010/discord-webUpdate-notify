const cron = require('node-cron');
const express = require('express');
const fs = require('fs');

app = express();

// to make http calls
const axios = require('axios');

let crypto = require('crypto');

const { Webhook, MessageBuilder } = require('discord-webhook-node');

cron.schedule('* * * * *', function () {
    let rawdata = fs.readFileSync('websites.json');
    let websites = JSON.parse(rawdata);
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
                    const hook = new Webhook(e.hook.url);
                    //const webhookClient = new Discord.WebhookClient(e.hook.id, e.hook.token);
                    hook.setUsername(e.user);
                    const embed = new MessageBuilder()
                        // .setTitle('There has been a change on this webiste')
                        .setAuthor('Hook(ER) Bot', e.avatar.length > 0 ? e.avatar : 'https://cdn.discordapp.com/embed/avatars/0.png', 'https://github.com/Bryan1010/discord-webUpdate-notify')
                        .setURL(e.url)

                        .addField('Website Url', e.url)

                        .setDescription(e.message)
                        //.setFooter('Hey its a footer', 'https://cdn.discordapp.com/embed/avatars/0.png')
                        .setTimestamp();
                    hook.send(embed)
                }



            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    });
});
app.listen(3001);