const express = require("express");
const bodyParser = require("body-parser");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();
const cors = require("cors");

const app = express();
const port = 5000;

const OPENAI_API_KEY = process.env.OPEN_API;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

app.get("/chat/:prompt", async (req, res) => {
  console.log("Start");
  try {
    // const { prompt } = req.body;
    const prompt = req.params.prompt;
    console.log("Print prompt body:", prompt);
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: `${prompt}` }],
    });

    if (completion) {
      res.json({
        success: true,
        message: completion.data.choices[0].message.content,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ error: error });
  }
});

app.listen(port, () => console.log(`Server listening on port ${port}...`));
console.log(`http://localhost:${port}`);
