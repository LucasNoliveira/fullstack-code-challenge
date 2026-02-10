import type { Dispatch, SetStateAction } from 'react';
import InputField from './InputField';

interface OtpFormProps {
    otp: string;
    setOtp: Dispatch<SetStateAction<string>>;
    onSubmit: (e: React.SyntheticEvent<HTMLFormElement>) => void;
    onChangeEmail: () => void;
}

const OtpForm = ({ otp, setOtp, onSubmit, onChangeEmail }: OtpFormProps) => (
    <form onSubmit={onSubmit} className="space-y-5">
        <InputField
            label="6-digit OTP"
            id="otp"
            type="text"
            value={otp}
            onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                setOtp(value);
            }}
            inputMode="numeric"
            maxLength={6}
            placeholder="000000"
            required
            icon={
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                </svg>
            }
        />

        <button
            type="submit"
            className="w-full bg-linear-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer"
        >
            Verify OTP
        </button>

        <button
            type="button"
            onClick={onChangeEmail}
            className="w-full text-sm text-indigo-600 hover:text-indigo-500 transition-colors cursor-pointer hover:underline"
        >
            Change email
        </button>
    </form>
);

export default OtpForm;