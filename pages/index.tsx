import React from "react";
import { AnswerArea, QuestionArea } from "@/components/QuestionAnswer";
import { getDartData, sendChatToGPT as chatToGPT } from "@/lib/api";
import { stock_traslate_prompt_eng } from "@/lib/constants";

const CATEGORIES = [
  {
    id: "hyslrSttus",
    name: "현금흐름표",
  },
];

export type QuestionAnswer = {
  question: string;
  answer: string;
};

export default function Home() {
  const [prompt, setPrompt] = React.useState<string>("");
  const [results, setResults] = React.useState<QuestionAnswer[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [dartData, setDartData] = React.useState<string>("");

  const resultsEndRef = React.useRef<HTMLDivElement>(null);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
  };

  const scrollToBottom = () => {
    if (resultsEndRef.current) {
      resultsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // 여기서 프롬프트가 token 제한을 넘을 경우 프롬프트를 나눠서 여러번 요청을 보내거나,
  // pdf 등의 형태로 한번에 큰 데이터를 읽을 수 있게 하는 등의 방법 필요.
  // 여러번 요청을 보낼 경우 보내는 동안은 '확인' 이라고 응답하고 '분석해줘' 라고 하면 분석 시작하도록 프롬프트 설정.
  // 한번에 읽을 수 있게되면 위의 '확인', '분석해줘' 는 안해도 됨.
  const chatHandler = async () => {
    if (!prompt) {
      return;
    }

    setLoading(true);
    const currentPrompt = prompt;
    setPrompt("");

    const answer = await chatToGPT(currentPrompt);
    setResults([...results, { question: currentPrompt, answer: answer }]);

    setLoading(false);
  };

  const dartHandler = async () => {
    CATEGORIES.forEach(async (category) => {
      const data = await getDartData({
        category: category.id,
        corp_code: "00126380",
        bsns_year: "2021",
        reprt_code: "11011",
      });
      setDartData(
        (prev) => prev + `${category.name} : ${JSON.stringify(data?.list)}`
      );
    });

    // '분석해줘' 라는 메시지를 보내면 분석 시작하도록 prompt 설정됨.
    setDartData((prev) => prev + `분석해줘`);
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [results]);

  React.useEffect(() => {
    if (dartData) {
      setPrompt(`
      ${dartData}
      ${stock_traslate_prompt_eng}
      분석해줘
      `);
    }

    console.log("🚀 turbo : dartData", dartData);
  }, [dartData]);

  return (
    <div className="pb-14 flex flex-col h-screen bg-gray-800 text-white">
      <AnswerArea results={results} />

      <div>
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-4 mb-4"
          onClick={dartHandler}
        >
          다트 정보 가져오기
        </button>
      </div>

      <QuestionArea
        loading={loading}
        prompt={prompt}
        handleInput={handleInput}
        requestHandler={chatHandler}
      />
    </div>
  );
}
