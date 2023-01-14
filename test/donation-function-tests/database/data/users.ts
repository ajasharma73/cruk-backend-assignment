type UserRecord = {
  id: string;
  email: string;
};

export const users = [
  {
    id: '1',
    email: 'testuser01@gmail.com'
  },
  {
    id: '2',
    email: 'testuser02@gmail.com'
  },
  {
    id: '3',
    email: 'testuser03@gmail.com'
  }
] as UserRecord[];
