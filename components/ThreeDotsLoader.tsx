export function ThreeDotsLoader() {
  return (
    <div className="flex space-x-2">
      <div className="bg-pink-500 h-1 w-1 rounded-full animate-bounce-big-1"></div>
      <div className="bg-pink-500 h-1 w-1 rounded-full animate-bounce-big-2 delay-300"></div>
      <div className="bg-pink-500 h-1 w-1 rounded-full animate-bounce-big-3 delay-700"></div>
    </div>
  );
}
