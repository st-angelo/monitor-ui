import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useQueryClient } from 'react-query';
import { SignInData, SignUpData, User } from '../../models/authentication';
import axios from '../../utils/axios';
import { auth_jwtName } from '../../utils/constants';
import { parseJwt } from '../../utils/functions';

interface AuthContextData {
  isAuthenticated: boolean;
  updateToken: (newToken: string) => void;
  user?: User;
  signIn: (input: SignInData) => Promise<void>;
  signUp: (input: SignUpData) => Promise<void>;
  signOut: () => void;
}

const AuthContext = React.createContext<AuthContextData>({
  isAuthenticated: true,
  updateToken: () => {},
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
  const client = useQueryClient();
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

  const signUp = useCallback(async ({ name, email, password }: SignUpData) => {
    return axios
      .post('signup', {
        name,
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

  const signOut = useCallback(() => {
    localStorage.removeItem(auth_jwtName);
    setToken(null);
    client.invalidateQueries();
  }, [client]);

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

  const updateToken = useCallback(
    (newToken: string) => {
      if (!newToken) return signOut();
      setToken(newToken);
      localStorage.setItem(auth_jwtName, newToken);
    },
    [signOut]
  );

  const data = useMemo(
    () => ({
      updateToken,
      isAuthenticated: Boolean(user),
      user,
      signIn,
      signUp,
      signOut,
    }),
    [user, updateToken, signIn, signOut, signUp]
  );

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}
