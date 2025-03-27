import { useSearchParams } from "react-router-dom";
import { useState } from "react";

export default function ResetPasswordForm() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  if (!token || !email) {
    return <p>Invalid reset link.</p>;
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
      const response = await fetch("http://localhost:5231/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
  
      const data = await response.json();
      console.log("Response Status:", response.status);
      console.log("Response Data:", data);
  
      if (response.ok) {
        setMessage("Password reset successfully!");
      } else {
        setMessage(data.message || `Failed to reset password. Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setMessage("An error occurred. Please try again.");
    }
  };
  
  
  

  return (
    <div>
      <h2>Reset Password</h2>
      <p>Email: {email}</p>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}
