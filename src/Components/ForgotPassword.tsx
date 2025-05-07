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
      setMessage(res?.message || "Kiểm tra email để đặt lại mật khẩu!");
    } catch (error: any) {
      setMessage(`❌ ${error?.Error || "Có lỗi xảy ra!"}`);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="h-screen pt-24 flex items-center justify-center">
      <div className="w-md mx-auto p-6 bg-slate-100 shadow-md rounded">
        <div className="py-4">
          <h2 className="text-xl font-bold mb-4 text-center">Quên Mật Khẩu</h2>
          {message && <p className="text-center text-green-500 py-4">{message}</p>}
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 px-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="text-sm pl-1.5">Email</label>
              <input
                type="email"
                className="w-full p-2 border rounded outline-none bg-gray-200"
                placeholder="Nhập email của bạn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
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
    </div>
  );
};

export default ForgotPassword;
