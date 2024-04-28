import { useMemo, useState } from 'react';
import { AuthContext, IAuth } from '../../hooks/useAuth';

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [auth, setAuth] = useState<IAuth | null>(null);
  const value = useMemo(() => ({ auth, setAuth }), [auth, setAuth]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  //return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
