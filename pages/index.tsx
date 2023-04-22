import React from "react";
import { AnswerArea, QuestionArea } from "@/components/QuestionAnswer";
import { getDataFromDart, sendRequestToGPT } from "@/lib/api";

export default function Home() {
  const [prompt, setPrompt] = React.useState<string>("");
  const [results, setResults] = React.useState<
    { question: string; answer: string }[]
  >([]);
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

  const requestHandler = async (directPrompt?: string) => {
    if (!prompt || !directPrompt) {
      return;
    }

    setLoading(true);
    const currentPrompt = prompt || directPrompt;
    directPrompt && setPrompt("");

    const answer = await sendRequestToGPT(currentPrompt);
    setResults([...results, { question: currentPrompt, answer: answer }]);

    setLoading(false);
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [results]);

  React.useEffect(() => {
    if (dartData) {
      setPrompt(`
      ${dartData}
      주식 투자 전문가로서 이 데이터를 분석해서 보고서를 작성해줘. 마지막엔 표로 정리해줘.
      `);
    }
  }, [dartData]);

  return (
    <div className="pb-14 flex flex-col h-screen bg-gray-800 text-white">
      <div className="overflow-scroll flex-grow mb-4 relative">
        {results.length > 0 &&
          results.map(({ question, answer }) => (
            <AnswerArea
              key={`${question.substring(0, 10)}-${answer.substring(0, 10)}`}
              question={question}
              answer={answer}
            />
          ))}
        <div ref={resultsEndRef} />
      </div>
      <div>
        <div>dart test</div>
        <button
          onClick={async () => {
            const data = await getDataFromDart({
              category: "hyslrSttus",
              corp_code: "00126380",
              bsns_year: "2019",
              reprt_code: "11011",
            });
            setDartData(JSON.stringify(data?.list));
          }}
        >
          send
        </button>
      </div>
      <QuestionArea
        loading={loading}
        prompt={prompt}
        handleInput={handleInput}
        requestHandler={requestHandler}
      />
    </div>
  );
}
