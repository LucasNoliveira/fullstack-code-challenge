import { useState } from 'react';
import { authService, type ApiError } from '../services/authService';

interface UseRequestOtpReturn {
    isLoading: boolean;
    error: string | null;
    requestOtp: (email: string) => Promise<boolean>;
}

export function useRequestOtp(): UseRequestOtpReturn {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const requestOtp = async (email: string): Promise<boolean> => {
        setIsLoading(true);
        setError(null);

        try {
            await authService.requestOtp({ email });
            return true;
        } catch (err) {
            const apiError = err as ApiError;
            setError(apiError.message ?? 'Não foi possível enviar o código. Tente novamente.');
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    return { isLoading, error, requestOtp };
}