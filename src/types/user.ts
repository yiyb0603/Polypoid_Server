export interface IAuthTypes {
  id: string;
  password: string;
  name?: string;
}

export interface IGoogleBody {
  accessToken: string;
}

export interface IGoogleResponse {
  sub: string;
  name: string;
}