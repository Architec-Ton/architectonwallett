import { Dispatch, SetStateAction, createContext, useContext } from 'react';

export interface IAuth {
  address: string;
  tgid: string;
}

interface IAuthContectProps {
  auth: IAuth | null;
  setAuth: Dispatch<SetStateAction<IAuth | null>>;
}

export const AuthContext = createContext<IAuthContectProps>({
  auth: null,
  setAuth: (state: SetStateAction<IAuth> | null) => state,
} as IAuthContectProps);

export const useAuth = () => useContext(AuthContext);
