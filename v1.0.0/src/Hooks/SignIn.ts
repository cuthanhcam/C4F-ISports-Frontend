import { useState } from "react";

export default function useSignIn() {
    const [showPassword, setShowPassword] = useState(false);

    return {
        showPassword,
        setShowPassword,
    }
}