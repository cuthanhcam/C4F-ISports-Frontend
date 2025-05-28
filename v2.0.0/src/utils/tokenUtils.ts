import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
    exp: number;
  [key: string]: any;
}

export function getTokenExpiration(token: string): Date | null {
    try {
        const decoded = jwtDecode<DecodedToken>(token);
        if (!decoded.exp) return null;
        return new Date(decoded.exp * 1000);
    } catch (error) {
        console.error('Invalid token:', error);
        return null;
    }
}