import { apiSlice } from "./apiSlice";
const USER_URL = '/api/auth/user'
const FAMILY_URL = '/api/auth/family'



export const profileApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getFamilyMembers: builder.query({
            query: ()=> ({
                url: `${FAMILY_URL}`,
                method: 'GET'
            })
        }),
        getUserInfo: builder.query({
            query: ()=> ({
                url: `${USER_URL}`,
                method: 'GET'
            })
        }),
        deleteUser: builder.mutation({
            query: (data)=> ({
                url: `${USER_URL}`,
                method: 'DELETE',
                body:data
            })
        }),
        
    })
});

export const { useGetFamilyMembersQuery, useGetUserInfoQuery, useDeleteUserMutation } = profileApiSlice;