import { ThreeDotsLoader } from "./ThreeDotsLoader";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function QuestionArea({
  loading,
  prompt,
  handleInput,
  requestHandler,
}: {
  loading: boolean;
  prompt: string;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  requestHandler: () => void;
}) {
  return (
    <div
      className="flex justify-between items-center space-x-4 mb-4 
            fixed bottom-0 left-4 right-4"
    >
      <div className="relative w-full">
        <input
          className="bg-gray-700 rounded-md p-2 w-full text-white placeholder-gray-400 focus:outline-none"
          value={prompt}
          onChange={handleInput}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              requestHandler();
            }
          }}
          placeholder={loading ? "" : "Send a message..."}
          disabled={loading}
        />
        {loading && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <ThreeDotsLoader />
          </div>
        )}
      </div>
      <button
        onClick={requestHandler}
        className="bg-pink-500 text-white rounded-md p-2"
        disabled={loading}
      >
        Send
      </button>
    </div>
  );
}

export function AnswerArea({
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
        <ReactMarkdown remarkPlugins={[remarkGfm]} children={question} />
      </div>
      <div className="bg-gray-600 text-gray-200 p-5">
        <div className="text-gray-400">answer</div>
        <ReactMarkdown remarkPlugins={[remarkGfm]} children={answer} />
      </div>
    </>
  );
}
