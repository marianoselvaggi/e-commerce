import React, { FC, ReactNode, useReducer, useEffect } from 'react'
import { IUser } from '../../interfaces';
import { AuthContext, authReducer } from './';
import tesloApi from '../../api/tesloApi';
import Cookies from 'js-cookie';
import axios from 'axios';

export interface AuthState {
   isLoggedIn: boolean;
   user?: IUser;
};

interface Props {
   children?: ReactNode,
}

const Auth_INITIAL_STATE: AuthState = {
   isLoggedIn: false,
   user: undefined,
};

export const AuthProvider: FC<Props> = ({ children }) => {
   const [state, dispatch] = useReducer(authReducer, Auth_INITIAL_STATE);

   useEffect(() => {
    checkToken();
   }, [])

   const checkToken = async (): Promise<void> => {
    try {
        const { data } = await tesloApi.post('/users/validate-token');
        Cookies.set('token', data.token);
        dispatch({ type: '[Auth] login', payload: data.user })
    } catch (err) {
        Cookies.remove('token');
    }
   }

    const loginUser = async (email: string, password: string): Promise<boolean> => {
        try {
            const { data } = await tesloApi.post('/users/login', { email, password })
            const { token, user } = data;
            Cookies.set('token', token);
            dispatch({ type: '[Auth] login', payload: user });
            return true;
        } catch (err) {
            return false;
        }
    }

    const registerUser = async (name: string, email: string, password: string): Promise<{
        hasError: boolean;
        message?: string,
    }> => {
        try {
            const { data } = await tesloApi.post('/users/register', { name, email, password })
            const { token, user } = data;
            Cookies.set('token', token);
            dispatch({ type: '[Auth] login', payload: user });
            return {
                hasError: false,
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                return {
                    hasError: true,
                    message: err.response?.data.message,
                }
            }

            return {
                hasError: true,
                message: 'There was an error and we could not create the user.',
            }
        }
    }

   return (
      <AuthContext.Provider value={{
        ...state,
        
        loginUser,
        registerUser,
   }}>
         { children }
      </AuthContext.Provider>
   )
}