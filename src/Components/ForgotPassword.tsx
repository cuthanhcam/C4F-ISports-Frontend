import { useState } from "react";
import { forgotPassword } from "../Services/authService";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
  
    try {
      const res = await forgotPassword({ email }); // Nhận response từ API
      console.log("Phản hồi từ API:", res); // Debug log
      setMessage(res?.message || "Kiểm tra email để đặt lại mật khẩu!");
    } catch (error: any) {
      setMessage(`❌ ${error?.Error || "Có lỗi xảy ra!"}`);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="h-screen pt-24 flex items-center justify-center">
      <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
        <h2 className="text-xl font-bold mb-4">Quên Mật Khẩu</h2>
        {message && <p className="text-center text-red-500">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            className="w-full p-2 border rounded"
            placeholder="Nhập email của bạn"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded cursor-pointer"
            disabled={loading}
          >
            {loading ? "Đang gửi..." : "Gửi yêu cầu"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
