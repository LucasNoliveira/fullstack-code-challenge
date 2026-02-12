const API_BASE_URL = "http://localhost:8000/api/v1";

export interface RequestOtpPayload {
  email: string;
}

export interface VerifyOtpPayload {
  email: string;
  otp: string;
}

export interface RequestOtpResponse {
  detail: string;
}

export interface VerifyOtpResponse {
  access: string;
  refresh: string;
}

export type CompanyStatus = "ready" | "in_progress" | "done" | "cancelled";

export interface Company {
  id: string;
  name: string;
  description: string;
  contact_email: string;
  status: CompanyStatus;
  created_at: string;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface ApiError {
  message: string;
  status: number;
}

async function refreshAccessToken(): Promise<string | null> {
  const refresh = localStorage.getItem("refresh_token");
  if (!refresh) return null;

  try {
    const response = await fetch(`${API_BASE_URL}/auth/token/refresh/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh }),
    });

    if (!response.ok) return null;

    const data = await response.json();
    localStorage.setItem("access_token", data.access);
    return data.access;
  } catch {
    return null;
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    const error: ApiError = {
      message:
        response.status === 429
          ? "Aguarde antes de solicitar um novo código."
          : (errorBody.detail ?? "Ocorreu um erro inesperado."),
      status: response.status,
    };
    throw error;
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

async function apiFetch<T>(
  url: string,
  options: RequestInit = {},
  authenticated = false,
): Promise<T> {
  const buildHeaders = (token?: string | null): Record<string, string> => ({
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
    ...(authenticated && token ? { Authorization: `Bearer ${token}` } : {}),
  });

  try {
    const accessToken = authenticated
      ? localStorage.getItem("access_token")
      : null;

    const response = await fetch(url, {
      ...options,
      headers: buildHeaders(accessToken),
    });

    if (response.status === 401 && authenticated) {
      const newToken = await refreshAccessToken();

      if (!newToken) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login";
        throw {
          message: "Sessão expirada. Faça login novamente.",
          status: 401,
        } satisfies ApiError;
      }

      const retryResponse = await fetch(url, {
        ...options,
        headers: buildHeaders(newToken),
      });

      return handleResponse<T>(retryResponse);
    }

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
      body: JSON.stringify(payload),
    });
  },

  verifyOtp: async (payload: VerifyOtpPayload): Promise<VerifyOtpResponse> => {
    return apiFetch<VerifyOtpResponse>(`${API_BASE_URL}/auth/verify-otp/`, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
};

export const companyService = {
  list: async (params: {
    page: number;
    pageSize?: number;
    search?: string;
    status?: CompanyStatus | "all";
  }): Promise<PaginatedResponse<Company>> => {
    const query = new URLSearchParams();
    query.set("page", String(params.page));
    query.set("page_size", String(params.pageSize ?? 10));
    if (params.search) query.set("search", params.search);
    if (params.status && params.status !== "all")
      query.set("status", params.status);

    return apiFetch<PaginatedResponse<Company>>(
      `${API_BASE_URL}/companies/?${query.toString()}`,
      { method: "GET" },
      true,
    );
  },

  create: async (
    payload: Omit<Company, "id" | "created_at">,
  ): Promise<Company> => {
    return apiFetch<Company>(
      `${API_BASE_URL}/companies/`,
      { method: "POST", body: JSON.stringify(payload) },
      true,
    );
  },

  update: async (
    id: string,
    payload: Omit<Company, "id" | "created_at">,
  ): Promise<Company> => {
    return apiFetch<Company>(
      `${API_BASE_URL}/companies/${id}/`,
      { method: "PUT", body: JSON.stringify(payload) },
      true,
    );
  },

  delete: async (id: string): Promise<void> => {
    return apiFetch<void>(
      `${API_BASE_URL}/companies/${id}/`,
      { method: "DELETE" },
      true,
    );
  },
};
