export interface LoginRequestType {
    email: string;
    password: string;
};

export interface RegisterRequestType {
    email: string;
    password: string;
    fullname: string;
    phone: string;
    role: string;
};

export interface ForgotPasswordType {
    email: string;
};


