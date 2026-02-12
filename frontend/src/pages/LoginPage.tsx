import { useState } from "react";
import EmailForm from "../components/Login/EmailForm";
import OtpForm from "../components/Login/OtpForm";
import { useRequestOtp } from "../hooks/useRequestOtp";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [step, setStep] = useState<"email" | "otp">("email");

  const { isLoading, error, requestOtp } = useRequestOtp();

  const handleSendOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const success = await requestOtp(email);
    if (success) {
      setStep("otp");
    }
  };

  const handleVerifyOtp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ email, otp });
  };

  const handleChangeEmail = () => {
    setOtp("");
    setStep("email");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-indigo-500 to-purple-600 rounded-2xl mb-4">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>

            <h1 className="text-3xl font-bold text-gray-900">Bem-vindo</h1>

            <p className="text-gray-500">
              {step === "email"
                ? "Entre com seu email para receber o código"
                : "Digite o código enviado para seu email"}
            </p>
          </div>

          {step === "email" && (
            <EmailForm
              email={email}
              setEmail={setEmail}
              onSubmit={handleSendOtp}
              isLoading={isLoading}
              error={error}
            />
          )}

          {step === "otp" && (
            <OtpForm
              otp={otp}
              setOtp={setOtp}
              onSubmit={handleVerifyOtp}
              onChangeEmail={handleChangeEmail}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
