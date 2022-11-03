import React, {
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import { SignInData, SignUpData, User } from '../../models/authentication';
import { parseJwt } from '../../utils/functions';
import { auth_jwtName } from '../../utils/constants';
import axios from '../../utils/axios';

interface AuthContextData {
  isAuthenticated: boolean;
  token?: string | null;
  user?: User;
  signIn: (input: SignInData) => Promise<void>;
  signUp: (input: SignUpData) => Promise<void>;
  signOut: () => void;
}

const AuthContext = React.createContext<AuthContextData>({
  isAuthenticated: true,
  signIn: Promise.resolve,
  signUp: Promise.resolve,
  signOut: () => {},
});

export function useAuthentication() {
  return useContext(AuthContext);
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem(auth_jwtName)
  );

  //#region Handlers

  const signIn = useCallback(async ({ email, password }: SignInData) => {
    return await axios
      .post('signin', {
        email,
        password,
      })
      .then(result => {
        if (result && result.data && result.data.token) {
          setToken(result.data.token);
          localStorage.setItem(auth_jwtName, result.data.token);
        }
      });
  }, []);

  const signUp = useCallback(
    async ({ firstName, lastName, email, password }: SignUpData) => {
      return axios
        .post('signup', {
          firstName,
          lastName,
          email,
          password,
        })
        .then(result => {
          if (result && result.data && result.data.token) {
            setToken(result.data.token);
            localStorage.setItem(auth_jwtName, result.data.token);
          }
        });
    },
    []
  );

  const signOut = useCallback(() => {
    localStorage.removeItem(auth_jwtName);
    setToken(null);
  }, []);

  //#endregion

  useEffect(() => {
    let previousJwt: string | null;
    const pollLocalStorage = () => {
      const jwt = localStorage.getItem(auth_jwtName);
      if (jwt === previousJwt) return;
      previousJwt = jwt;
      setToken(jwt);
    };

    const interval = setInterval(pollLocalStorage, 1000);

    return () => clearInterval(interval);
  }, []);

  const user = useMemo(
    () => (token ? (parseJwt(token) as User) : undefined),
    [token]
  );

  const data = useMemo(
    () => ({
      token,
      isAuthenticated: Boolean(user),
      user,
      signIn,
      signUp,
      signOut,
    }),
    [user, token, signIn, signOut, signUp]
  );

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}
