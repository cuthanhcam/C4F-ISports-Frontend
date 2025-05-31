// src/components/TokenWatcher.tsx
import { useEffect, useState } from 'react';
import { getTokenExpiration } from '../../utils/tokenUtils';
import { toast } from 'react-toastify';

interface TokenWatcherProps {
  token: string;
  onTokenExpired: () => void;
}

export default function TokenWatcher({ token, onTokenExpired }: TokenWatcherProps) {
  const [warningShown, setWarningShown] = useState(false);

  useEffect(() => {
    const expiration = getTokenExpiration(token);
    if (!expiration) return;

    const now = new Date();
    const timeLeft = expiration.getTime() - now.getTime();

    const warningTime = timeLeft - 2 * 60 * 1000;

    const warningTimeout = setTimeout(() => {
      if (!warningShown) {
        toast.warning('Phiên đăng nhập sắp hết. Vui lòng gia hạn!');
        setWarningShown(true);
      }
    }, warningTime);

    const logoutTimeout = setTimeout(() => {
        toast.warning('Phiên đăng nhập đã hết. Bạn sẽ được đăng xuất.')
        onTokenExpired();
    }, timeLeft);

    return () => {
      clearTimeout(warningTimeout);
      clearTimeout(logoutTimeout);
    };
  }, [token, warningShown, onTokenExpired]);

  return null;
}
