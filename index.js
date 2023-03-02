const { Configuration, OpenAIApi } = require("openai");
const cors = require('cors')
const express = require('express')
const app = express()
require('dotenv').config();
app.use(cors())
app.use(express.json()); 
console.log(process.env.OPENAI_API_KEY)
const configuration = new Configuration({
    organization: "org-gpPliMXAAXLXYe5rP3eHCf24",
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
app.post('/', async (req, res) => {
    console.log(req.body.prompt)
    openai.createCompletion({
        model: "text-davinci-003",
        prompt: req.body.prompt,
        "temperature": 0.7,
        "max_tokens": 256,
        "top_p": 1,
        "n":2,
        "frequency_penalty": 0,
        "presence_penalty": 0
      }).then(data => {
        console.log(data)
        res.send(data.data.choices)
      }).catch(error => {
        console.error(error)
      })
  })

  app.listen(3001)
