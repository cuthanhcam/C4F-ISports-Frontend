import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const status = searchParams.get("status");
  const message = searchParams.get("message") 
    ? decodeURIComponent(searchParams.get("message") as string) 
    : "Đang xử lý...";

  useEffect(() => {
    if (status === "success") {
      setTimeout(() => navigate("/auth/login"), 3000);
    }
  }, [status, navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-6 bg-white shadow-lg rounded-lg">
        <h2 className={`text-2xl font-semibold ${status === "success" ? "text-green-600" : "text-red-600"}`}>
          {message}
        </h2>
        {status === "success" && <p className="text-gray-500">Bạn sẽ được chuyển hướng trong giây lát...</p>}
      </div>
    </div>
  );
};

export default VerifyEmail;
