import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

type Data = {
  result?: string;
};

const generateChatCompletion = async (prompt: string) => {
  const result = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  });

  return result.data.choices[0].message?.content;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { prompt } = req.body;

  try {
    const result = await generateChatCompletion(prompt);
    res.status(200).json({ result });
  } catch (error) {
    console.error("Error generating chat completion: ", error);
    res.status(500).json({ result: "An error occurred." });
  }
}
