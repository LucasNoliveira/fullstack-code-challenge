import type { Dispatch, SetStateAction } from "react";
import InputField from "./InputField";

interface EmailFormProps {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  onSubmit: (e: React.SyntheticEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  error: string | null;
}

const EmailForm = ({ email, setEmail, onSubmit, isLoading, error }: EmailFormProps) => (
  <form onSubmit={onSubmit} className="space-y-5">
    <InputField
      label="Email"
      id="email"
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="seu@email.com"
      required
      icon={
        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
          />
        </svg>
      }
    />

    {error && (
      <p className="text-sm text-red-500 text-center">{error}</p>
    )}

    <button
      type="submit"
      disabled={isLoading}
      className="w-full bg-linear-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
    >
      {isLoading ? "Enviando..." : "Send OTP"}
    </button>
  </form>
);

export default EmailForm;