const express = require('express')
const { Configuration, OpenAIApi } = require("openai");
const cors = require('cors')
require('dotenv').config();
app.use(cors())
app.use(express.json());
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express()
app.all('/', (req, res) => {
    openai.createCompletion({
        model: "text-davinci-003",
        prompt: req.body.prompt,
      }).then(data => {
        res.send(data.data.choices[0])
      }).catch(error => {
        console.error(error)
      })
  })
})
app.listen(process.env.PORT || 3000)
