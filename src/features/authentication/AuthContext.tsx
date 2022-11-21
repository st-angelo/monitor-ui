import { Loader } from '@mantine/core';
import React, { useCallback, useContext, useMemo, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { SignInData, SignUpData, User } from '../../models/authentication';
import {
  getUser,
  signIn,
  signOut,
  signUp,
} from '../../repository/authenticationRepository';

interface AuthContextData {
  isAuthenticated: boolean;
  isVerified: boolean;
  user?: User;
  signIn: (input: SignInData) => Promise<void>;
  signUp: (input: SignUpData) => Promise<void>;
  signOut: () => void;
}

const AuthContext = React.createContext<AuthContextData>({
  isAuthenticated: false,
  isVerified: false,
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
  const [user, setUser] = useState<User>();

  const { isFetched } = useQuery(['user'], getUser, {
    onSuccess: result => setUser(result),
    retry: false,
  });

  //#region Handlers

  const signInHandler = useCallback(async (input: SignInData) => {
    const response = await signIn(input);
    response && setUser(response);
  }, []);

  const signUpHandler = useCallback(async (input: SignUpData) => {
    const response = await signUp(input);
    response && setUser(response);
  }, []);

  const signOutHandler = useCallback(async () => {
    await signOut();
    setUser(undefined);
    client.invalidateQueries();
  }, [client]);

  //#endregion

  const data = useMemo(
    () => ({
      isAuthenticated: Boolean(user),
      isVerified: user?.isVerified ?? false,
      user,
      signIn: signInHandler,
      signUp: signUpHandler,
      signOut: signOutHandler,
    }),
    [user, signInHandler, signOutHandler, signUpHandler]
  );

  return (
    <AuthContext.Provider value={data}>
      {!isFetched && (
        <div className='min-h-screen flex justify-center items-center'>
          <Loader variant='bars' />
        </div>
      )}
      {isFetched && children}
    </AuthContext.Provider>
  );
}
