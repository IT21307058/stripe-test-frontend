export default function ProgressBar({ progress }) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
      <div
        className="bg-blue-600 h-2.5 rounded-full transition-all"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}
