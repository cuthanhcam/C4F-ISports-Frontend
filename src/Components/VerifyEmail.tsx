import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const statusParam = searchParams.get("status");
    const messageParam = searchParams.get("message");

    setStatus(statusParam);
    setMessage(messageParam ? decodeURIComponent(messageParam) : "Đang xử lý...");

    // Nếu xác thực thành công, chuyển hướng sau 3 giây
    if (statusParam === "success") {
      setTimeout(() => navigate("/login"), 3000);
    }
  }, [searchParams, navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-6 bg-white shadow-lg rounded-lg">
        <h2 className={`text-2xl font-semibold ${status === "success" ? "text-green-600" : "text-red-600"}`}>
          {message}
        </h2>
      </div>
    </div>
  );
};

export default VerifyEmail;
