interface Admin {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  lastLogin?: string;
}

export default Admin;
