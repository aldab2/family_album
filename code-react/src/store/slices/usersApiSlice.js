import { apiSlice } from "./apiSlice";
const USERS_URL = '/api/auth/users'
const REGISTER_FAMILY_URL = '/api/auth/family'
const LOGIN_URL = '/api/auth'
const LOGOUT_URL = '/api/auth/logout'
const AUTH_BASE_URL = '/api/auth'

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data)=> ({
                url: `${LOGIN_URL}`,
                method: 'POST',
                body: data
            })
        }),
        registerFamily: builder.mutation({
            query: (data)=> ({
                url: `${REGISTER_FAMILY_URL}`,
                method: 'POST',
                body: data
            })
        }),
        logout:builder.mutation({
            query: ()=>({
                url: `${LOGOUT_URL}`,
                method: 'POST'
            })
        }),
        sendVerificationCode: builder.query({
            query: ()=> ({
                url: `${AUTH_BASE_URL}/send-verification-email`,
                method: 'GET'
            })
        }),
        activateUser: builder.mutation({
            query: (data)=> ({
                url: `${AUTH_BASE_URL}/verify-code`,
                method: 'POST',
                body: data
            })
        }),
    })
});

export const { useLoginMutation , useLogoutMutation, useRegisterFamilyMutation, useLazySendVerificationCodeQuery, useActivateUserMutation} = usersApiSlice;