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
                    page: page.toString(),
                    onlyMyPosts: onlyMyPosts.toString(), // Always include to differentiate true/false
                    ...(type && { type }),
                  }).toString();

                // Construct the final URL
                console.log(`Fetching data: Page ${page }, Type: ${type}`);

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
        editPostVisibility: builder.mutation({
            query: (data)=> ({
                url: `${POSTS_URL}/visibility`,
                method: 'PUT',
                body:data
            })
        }),
        deletePost: builder.mutation({
            query: (data)=> ({
                url: `${POSTS_URL}`,
                method: 'DELETE',
                body:data
            })
        }),
        
    })
});

export const { useAddPostMutation, useGetPostsQuery, useLazyGetPostsQuery, useDeletePostMutation,useEditPostVisibilityMutation } = postsApiSlice;