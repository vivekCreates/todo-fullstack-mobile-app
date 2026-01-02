import { clearAuth, getAuth, saveAuth } from '@/utils/auth';
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

interface User{
    _id:string;
    username:string;
    email:string;
    createdAt:Date;
    updatedAt:Date;
}

type AuthContextType = {
  isLoggedIn: boolean;
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function restoreAuth() {
      const auth = await getAuth();
      setToken(auth.token);
      setUser(auth.user);
      setLoading(false);
    }
    restoreAuth();
  }, []);

  async function login(token: string, user: User) {
    await saveAuth(token, user);
    setToken(token);
    setUser(user);
  }

  async function logout() {
    await clearAuth();
    setToken(null);
    setUser(null);
  }

  if (loading) return null;

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
