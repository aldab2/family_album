import { apiSlice } from "./apiSlice";
const POSTS_URL = '/api/post'



export const postsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPosts: builder.query({
            query: (queryParams) => {
                // Destructure the optional parameters and provide default values
                const { page = 1, onlyMyPosts = false, type = '' } = queryParams;

                // Construct query string based on parameters
                const queryString = new URLSearchParams({
                    ...(page && { page: page.toString() }),
                    ...(onlyMyPosts && { onlyMyPosts: onlyMyPosts.toString() }),
                    ...(type && { type }),
                }).toString();

                // Construct the final URL
                const url = `${POSTS_URL}?${queryString}`;

                

                return {
                    url,
                    method: 'GET'
                };
            },
        }),
        addPost: builder.mutation({
            query: (data)=> ({
                url: `${POSTS_URL}`,
                method: 'POST',
                body:data
            })
        }),
        
    })
});

export const { useAddPostMutation, useGetPostsQuery, useLazyGetPostsQuery } = postsApiSlice;