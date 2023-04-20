import React from "react";

export default function Home() {
  const [prompt, setPrompt] = React.useState<string>("");
  const [results, setResults] = React.useState<{ q: string; a: string }[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  const resultsEndRef = React.useRef<HTMLDivElement>(null);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
  };

  const requestAnalaze = async () => {
    if (!prompt) {
      return;
    }

    setLoading(true);
    const currentPrompt = prompt;
    setPrompt("");

    const response = await fetch("/api/hello", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: currentPrompt }),
    });

    const data = await response.json();

    setResults([
      ...results,
      { q: currentPrompt, a: data.result || "No answer found" },
    ]);

    setLoading(false);
  };

  const scrollToBottom = () => {
    if (resultsEndRef.current) {
      resultsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [results]);

  return (
    <div className="pb-14 flex flex-col h-screen">
      <div className="overflow-scroll flex-grow mb-4 relative">
        {results.length > 0 &&
          results.map(({ q, a }) => (
            <AnswerArea
              key={`${q.substring(0, 10)}-${a.substring(0, 10)}`}
              question={q}
              answer={a}
            />
          ))}
        <div ref={resultsEndRef} />
      </div>
      <QuestionArea
        loading={loading}
        prompt={prompt}
        handleInput={handleInput}
        requestAnalaze={requestAnalaze}
      />
    </div>
  );
}

function AnswerArea({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  return (
    <>
      <div className="bg-gray-700 text-white p-5">
        <div className="text-gray-400">question </div>
        <div>{question}</div>
      </div>
      <div className="bg-gray-500 text-gray-200 p-5">
        <div className="text-gray-400">answer</div>
        <div>{answer}</div>
      </div>
    </>
  );
}

function QuestionArea({
  loading,
  prompt,
  handleInput,
  requestAnalaze,
}: {
  loading: boolean;
  prompt: string;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  requestAnalaze: () => void;
}) {
  return (
    <div
      className="flex justify-between items-center space-x-4 mb-4 
        fixed bottom-0 left-4 right-4"
    >
      <div className="relative w-full">
        <input
          className="bg-gray-200 rounded-md p-2 w-full"
          value={prompt}
          onChange={handleInput}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              requestAnalaze();
            }
          }}
          placeholder={loading ? "" : "Type your prompt here"}
          disabled={loading}
        />
        {loading && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <ThreeDotsLoader />
          </div>
        )}
      </div>
      <button
        onClick={requestAnalaze}
        className="bg-blue-500 text-white rounded-md p-2"
        disabled={loading}
      >
        Send
      </button>
    </div>
  );
}

function ThreeDotsLoader() {
  return (
    <div className="flex space-x-2">
      <div className="bg-pink-500 h-1 w-1 rounded-full animate-bounce-big-1"></div>
      <div className="bg-pink-500 h-1 w-1 rounded-full animate-bounce-big-2 delay-300"></div>
      <div className="bg-pink-500 h-1 w-1 rounded-full animate-bounce-big-3 delay-700"></div>
    </div>
  );
}
