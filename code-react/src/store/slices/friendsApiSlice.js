import { apiSlice } from "./apiSlice";

export const friendApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getFriendRequests: builder.query({
            query: () => '/api/friends/requests',
            providesTags: ['FriendRequests'],
        }),
        sendFriendRequest: builder.mutation({
            query: ({ recipientspaceName }) => ({
                url: '/api/friends/send', // Assuming your endpoint URL for sending friend requests
                method: 'POST',
                body: { recipientspaceName },
            }),
            invalidatesTags: ['FriendRequests'],
        }),
        acceptFriendRequest: builder.mutation({
            query: (requestId) => ({
                url: `/api/friends/accept/${requestId}`, // Check your endpoint URL for accepting friend requests
                method: 'PUT',
            }),
            invalidatesTags: ['FriendRequests'],
        }),
        rejectFriendRequest: builder.mutation({
            query: (requestId) => ({
                url: `/api/friends/reject/${requestId}`, // Check your endpoint URL for rejecting friend requests
                method: 'PUT',
            }),
            invalidatesTags: ['FriendRequests'],
        }),
        deleteFriendRequest: builder.mutation({
            query: (requestId) => ({
                url: `/api/friends/delete/${requestId}`, // Check your endpoint URL for deleting friend requests
                method: 'DELETE',
            }),
            invalidatesTags: ['FriendRequests'],
        }),
        // Additional endpoints can be added here
    })
});

export const { 
    useGetFriendRequestsQuery,
    useSendFriendRequestMutation,
    useAcceptFriendRequestMutation,
    useRejectFriendRequestMutation,
    useDeleteFriendRequestMutation,
    // Export additional hooks as needed
} = friendApiSlice;
