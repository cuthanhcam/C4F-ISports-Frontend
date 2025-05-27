export interface authLogin {
    email: string;
    password: string;
};

export interface authRegister {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: string;
    phone: string;
};

export interface authFogotPassword {
    email: string;
};

export interface authResetPassword {
    email: string;
    token: string;
    password: string;
};

export interface authChangePassword {
    CurrentPassword: string;
    NewPassword: string;
}

