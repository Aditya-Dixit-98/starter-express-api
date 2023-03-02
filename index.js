const { Configuration, OpenAIApi } = require("openai");
const cors = require('cors')
const express = require('express')
const app = express()
require('dotenv').config();
app.use(cors())
app.use(express.json()); 
console.log(process.env.OPENAI_API_KEY)
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
app.post('/', async (req, res) => {
    console.log(req.body.prompt)
    openai.createCompletion({
        model: "text-davinci-003",
        prompt: req.body.prompt,
      }).then(data => {
        console.log(data.data.choices)
        res.send(data.data.choices[0])
      }).catch(error => {
        console.error(error)
      })
  })

  app.listen(3001)




    
