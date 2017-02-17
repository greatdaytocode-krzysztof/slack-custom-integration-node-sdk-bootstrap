var RtmClient = require('@slack/client').RtmClient;
var RTM_EVENTS = require('@slack/client').RTM_EVENTS;
var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;

var bot_token = process.env.SLACK_BOT_TOKEN || '';
var rtm = new RtmClient(bot_token);
var bot = {};

/**
    Subscribe to authentication event. If you receive this event your bot has been successfully authenticated.
    Couple of useful information can be found in the callback data. In particular your bot's ID and NAME.
*/
rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, (rtmStartData) => {
    let self = rtmStartData.self;
    bot.id = self.id;
    bot.name = self.name
    console.log(`Logged in as ${bot.name} of team ${rtmStartData.team.name}`);
});

/**
    Subscribe to all messages in all channels your bot is invited to and direct messages sent to your bot.
    Note that this does not include checking whether a user send a message to your bot.
    For instance it does to check if the message mentions your bot's name.
*/
rtm.on(RTM_EVENTS.MESSAGE, (message) => {
    console.log(`Received message from ${message.user} in ${message.channel}`);
    rtm.sendMessage("Hello <@" + message.user + ">!", message.channel);
});

rtm.start();