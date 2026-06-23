import { api, setToken } from "../client";

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  tokenType: string;
  user: {
    id: string;
    email: string;
    name: string | null;
    isSuperuser: boolean;
  };
}

export const authService = {
  async login(payload: LoginPayload): Promise<LoginResponse> {
    const data = await api.post<{
      access_token: string;
      token_type: string;
      user: {
        id: string;
        email: string;
        name: string | null;
        is_superuser: boolean;
      };
    }>("/auth/login", payload);
    setToken(data.access_token);
    if (data.user.id) {
      localStorage.setItem("userId", data.user.id);
    }
    return {
      accessToken: data.access_token,
      tokenType: data.token_type,
      user: {
        id: data.user.id,
        email: data.user.email,
        name: data.user.name,
        isSuperuser: data.user.is_superuser,
      },
    };
  },

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  },
};
