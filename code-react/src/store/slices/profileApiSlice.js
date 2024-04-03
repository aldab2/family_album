import { apiSlice } from "./apiSlice";
const USER_URL = '/api/auth/user'
const FAMILY_URL = '/api/auth/family'



export const profileApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        
        getUserInfo: builder.query({
            query: (userId)=> ({
                url: userId ? `${USER_URL}?userId=${userId}` : USER_URL,
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
        updateUser: builder.mutation({
            query: (userData) => ({
                url: `${USER_URL}`,
                method: 'PUT', // or 'PUT', depending on how your API is implemented
                body: userData,
            }),
        }),
        addFamilyMember: builder.mutation({
            query: (memberData) => ({
                url: `${USER_URL}`,
                method: 'POST',
                body: memberData,
            }),
        }),

        changePassword: builder.mutation({
            query: ({ currentPassword, newPassword }) => ({
                url: '/api/auth/change-password', // Adjust URL as necessary
                method: 'PUT',
                body: { currentPassword, newPassword },
            }),
        }),

        getFamilyMembers: builder.query({
            query: (familyId)=> ({
                url: familyId ? `${FAMILY_URL}?familyId=${familyId}`: FAMILY_URL,
                method: 'GET'
            })
        }),
        editFamilyProfile: builder.mutation({
            query: (familyData) => ({
                url: `${FAMILY_URL}`,
                method: 'PUT',
                body: familyData,
            }),
        }),
        


        
    })
});

export const { 
    useGetFamilyMembersQuery, 
    useGetUserInfoQuery, 
    useDeleteUserMutation, 
    useUpdateUserMutation, 
    useChangePasswordMutation, 
    useEditFamilyProfileMutation, 
    useAddFamilyMemberMutation 
} = profileApiSlice;