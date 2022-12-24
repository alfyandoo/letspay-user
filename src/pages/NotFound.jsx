import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <h1 className="text-9xl font-bold text-gray-400">404</h1>
      <h2 className="text-3xl font-bold text-gray-400">Page Not Found</h2>
      <button
        className="py-3 text-gray-500 hover:text-gray-300"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft />
      </button>
    </div>
  );
};
