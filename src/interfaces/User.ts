export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  lastLogin: string;
  userIp: string;
  userRoleId: number;
  confirmationCode?: string;
}
export interface UserContext {
  user: User;
  setUser: (user: User) => void;
}
