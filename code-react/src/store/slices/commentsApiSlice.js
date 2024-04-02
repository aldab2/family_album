// Import the apiSlice to extend it with endpoints for comments
import { apiSlice } from "./apiSlice";

export const commentsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addComment: builder.mutation({
            query: (commentData) => ({
                url: '/api/post/comment',  // Adjust if your API route is different
                method: 'POST',
                body: commentData,
            }),
        }),
        editComment: builder.mutation({
            query: ({ id, ...commentData }) => ({
                url: `/comment`,
                method: 'PUT',
                body: { ...commentData, Id: id }, // Ensure the backend expects 'Id' not 'id'
            }),
        }),
        deleteComment: builder.mutation({
            query: (commentId) => ({
                url: `/comment`,
                method: 'DELETE',
                body: { id: commentId }, // Ensure the backend expects 'id' in the body
            }),
        }),
    })
});

// Export hooks for usage in functional components
export const {
    useAddCommentMutation,
    useEditCommentMutation,
    useDeleteCommentMutation,
} = commentsApiSlice;
