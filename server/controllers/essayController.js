import axios from "axios";
import dotenv from "dotenv";
import { InferenceClient } from "@huggingface/inference";

dotenv.config();

export const generateEssay = async (req, res) => {
    const {topic, wordCount} = req.body;

    if(!topic || !wordCount){
        return res.status(400).json({error: "Topic and word count are required."});
    }

    try {
        const prompt = `Write an insightful and well-structured essay on the topic "${topic}" with approximately ${wordCount} words. Ensure the essay is engaging, informative, and well-organized.`;
        console.log(process.env.HF_API_KEY);
        const client = new InferenceClient(process.env.HF_API_KEY);
        const chatCompletion = await client.chatCompletion({
          provider: "auto",
          model: "mistralai/Mistral-Small-3.1-24B-Instruct-2503",
          messages: [{ role: "user", content: prompt }],
        });

        const essay = chatCompletion.choices[0].message.content.trim();
        res.status(200).json({ essay });
      } catch (error) {
        console.error("Error generating essay:", error);
        res.status(500).json({ error: "An error occurred while generating the essay." });
      }
}