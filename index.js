require("dotenv").config();

const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  organization: process.env.OPEN_AI_ORG,
  apiKey: process.env.OPEN_AI_KEY,
});

const openAI = new OpenAIApi(configuration);

client.on("messageCreate", async function (message) {
  try {
    if (message.author.bot) return;
    const ChatGPTResponse = await openAI.createCompletion({
      model: "davinci",
      prompt: `ChatGPT is a friendly chatbot.\n\
      ${message.author.username}:${message.content}\n\
      ChatGPT:`,
      temperature: 0.9,
      max_tokens: 300,
      stop: ["ChatGPT:", "akshay"],
    });
    message.reply(`${ChatGPTResponse.data.choices[0].text}`);
    return;
  } catch (error) {
    Error(`Bot is Dead ${error}`);
  }
});

client.login(process.env.DISCORD_TOKEN);
