import base from "./base";

export const createBlogApi = (payload) => base('POST', {'Authorization': `Bearer ${localStorage.getItem('token')}`}, payload, '/blogs');

export const getAllBlogsApi = () => base('GET', null, null, '/blogs');

export const getBlogByIdApi = (payload) => base('GET', null, null, `/blogs/${payload.blogId}`);

export const createStoryinBlogApi = (payload) => base('Patch', {'Authorization': `Bearer ${localStorage.getItem('token')}`}, {stories: payload.stories}, `/blogs/story/${payload.blogId}`);

export const updateBlogApi = (payload) => base('Patch', {'Authorization': `Bearer ${localStorage.getItem('token')}`}, {title: payload.title, description: payload.description}, `/blogs/${payload.blogId}`);
