export type UserRole = 'manager' | 'admin';

export interface User {
  username: string;
  password: string;
  name: string;
  role: UserRole;
  email: string;
}

export const predefinedUsers: User[] = [
  {
    username: 'admin',
    password: 'admin123',
    name: 'Administrator',
    role: 'admin',
    email: 'admin@amover.pt'
  },
  {
    username: 'manager',
    password: 'manager123',
    name: 'Manager',
    role: 'manager',
    email: 'manager@amover.pt'
  }
];