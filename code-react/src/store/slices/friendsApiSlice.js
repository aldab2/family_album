import { apiSlice } from "./apiSlice";

export const friendApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getFriendRequests: builder.query({
            // Corrected URL to match your backend route
            query: () => '/api/friend/request',
            providesTags: ['FriendRequests'],
        }),
        sendFriendRequest: builder.mutation({
            // Corrected URL to match your backend route
            query: ({ recipientspaceName }) => ({
                url: '/api/friend/request',
                method: 'POST',
                body: { recipientspaceName },
            }),
            invalidatesTags: ['FriendRequests'],
        }),
        acceptFriendRequest: builder.mutation({
            // Corrected to POST to match your backend and adjusted URL
            query: (requestId) => ({
                url: '/api/friend/acceptRequest', // Assuming requestId is sent in the body
                method: 'POST',
                body: { id: requestId },
            }),
            invalidatesTags: ['FriendRequests'],
        }),
        rejectFriendRequest: builder.mutation({
            // Corrected to POST to match your backend and adjusted URL
            query: (requestId) => ({
                url: '/api/friend/rejectRequest',
                method: 'POST',
                body: { id: requestId },
            }),
            invalidatesTags: ['FriendRequests'],
        }),
        deleteFriendRequest: builder.mutation({
            // Adjusted URL to match your backend
            query: (requestId) => ({
                url: '/api/friend/removeFamilyFriend', // Assuming requestId is sent in the body
                method: 'POST',
                body: { id: requestId },
            }),
            invalidatesTags: ['FriendRequests'],
        }),
        // Assuming there's an endpoint to get family friends list
        getFamilyFriends: builder.query({
            query: () => '/api/friend/getFamilyFriends',
            providesTags: ['FamilyFriends'],
        }),
    })
});

export const { 
    useGetFriendRequestsQuery,
    useSendFriendRequestMutation,
    useAcceptFriendRequestMutation,
    useRejectFriendRequestMutation,
    useDeleteFriendRequestMutation,
    useGetFamilyFriendsQuery, // Added export for fetching family friends
} = friendApiSlice;

