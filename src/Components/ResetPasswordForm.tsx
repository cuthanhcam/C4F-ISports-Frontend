import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
export default function ResetPasswordForm() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  if (!token || !email) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-red-500 text-lg font-semibold">Invalid reset link.</p>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    const payload = { email, token, newPassword };
    console.log("Sending request payload:", payload);

    try {
      const response = await fetch(
        "http://localhost:5231/api/auth/reset-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();
      console.log("Response Status:", response.status);
      console.log("Response Data:", data);

      if (response.ok) {
        setMessage("Password reset successfully!");
      } else {
        setMessage(
          data.message || `Failed to reset password. Status: ${response.status}`
        );
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-6 bg-white shadow-lg rounded-lg">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
            Reset Password
          </h2>
          <p className="flex justify-center gap-1 text-gray-600 mb-4">
            Xin chào: 
            <span className="font-medium">{email}</span>
          </p>

          {message && (
            <p
              className={`text-sm text-center mb-4 ${
                message.includes("successfully")
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 py-2">
            <div className="relative">
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="text-sm pl-1.5">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {!showPassword ? <IoMdEyeOff className="absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer" onClick={() => setShowPassword(prev => !prev)}/> 
                  : <IoMdEye className="absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer" onClick={() => setShowPassword(prev => !prev)}/>}
                </div>
              </div>
            </div>
            <div className="relative pb-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="text-sm pl-1.5">Confirm password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {!showPassword ? <IoMdEyeOff className="absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer" onClick={() => setShowPassword(prev => !prev)}/> 
                  : <IoMdEye className="absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer" onClick={() => setShowPassword(prev => !prev)}/>}
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition duration-200"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
