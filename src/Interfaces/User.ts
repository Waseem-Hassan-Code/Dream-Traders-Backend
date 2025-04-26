export interface UserData {
  id?: string;
  userName: string;
  email: string;
  phoneNumber?: string;
  password?: string;
}

export interface TokenData {
  token: string;
  refreshToken: string;
  expiresAt: Date;
  userId: string;
}
