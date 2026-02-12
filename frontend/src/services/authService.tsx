const API_BASE_URL = "http://localhost:8000/api/v1";

export interface RequestOtpPayload {
  email: string;
}

export interface RequestOtpResponse {
  detail: string;
}

export interface ApiError {
  message: string;
  status: number;
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    const error: ApiError = {
      message:
        response.status === 429
          ? "Aguarde antes de solicitar um novo código."
          : errorBody.detail ?? "Ocorreu um erro inesperado.",
      status: response.status,
    };
    throw error;
  }
  return response.json() as Promise<T>;
}

async function apiFetch<T>(url: string, options: RequestInit): Promise<T> {
  try {
    const response = await fetch(url, options);
    return handleResponse<T>(response);
  } catch (err) {
    if (err && typeof err === "object" && "status" in err) {
      throw err;
    }
    throw {
      message: "Não foi possível conectar ao servidor. Verifique sua conexão.",
      status: 0,
    } satisfies ApiError;
  }
}

export const authService = {
  requestOtp: async (
    payload: RequestOtpPayload,
  ): Promise<RequestOtpResponse> => {
    return apiFetch<RequestOtpResponse>(`${API_BASE_URL}/auth/request-otp/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  },
};