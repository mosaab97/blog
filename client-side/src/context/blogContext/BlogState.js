import React, { useContext, useReducer, useState } from 'react';
import BlogContext from './BlogContext';
import BlogReducer from './BlogReducer';
import {
    SAVE_STATE
} from '../types';
import { createBlogApi, createStoryinBlogApi, getAllBlogsApi, getBlogByIdApi, updateBlogApi } from '../../services/blogServices';
import MainContext from '../mainContext/MainContext';
import { withRouter } from 'react-router-dom';

const BlogState = (props) => {

    const mainContext = useContext(MainContext)
    const { setLoading, setLoadingFalse, setSnackBarMsg, setOpen } = mainContext
    const initialState = {
        blogsResponse: null,
        selectedBlog: null,
        blogByIdResponse: null
    };

    const [state, setState] = useReducer(BlogReducer, initialState);
    const [openCreateDialog, setOpenCreateDialog] = useState(false)
    const [openStoryDialog, setOpenStoryDialog] = useState(false)

    const saveState = (action) => {
        setState({
            type: SAVE_STATE,
            payload: action,
        });
    };

    const getAllBlogs = async () => {
        setLoading()
        try {
            const res = await getAllBlogsApi()
            if (res.status === 200) {
                saveState({ id: "blogsResponse", value: res.data })
            } else {
                saveState({ id: "blogsResponse", value: null })
                setSnackBarMsg({ msg: "No blogs found" })
                setOpen(true)
            }
        } catch (e) {
            saveState({ id: "blogsResponse", value: null })
            setSnackBarMsg({ msg: "Somthing went wrong, please refresh the page" })
            setOpen(true)
        }
        setLoadingFalse()
    }

    const getBlogById = async (payload) => {
        setLoading()
        try {
            const res = await getBlogByIdApi(payload)
            if (res.status === 200) {
                saveState({ id: "blogByIdResponse", value: res.data })
            } else {
                saveState({ id: "blogByIdResponse", value: null })
                setSnackBarMsg({ msg: "blog Not found" })
                setOpen(true)
                props.history.push('/')
            }
        } catch (e) {
            saveState({ id: "blogByIdResponse", value: null })
            setSnackBarMsg({ msg: "blog Not found" })
            setOpen(true)
            props.history.push('/')
        }
        saveState({id: "selectedBlog", value: null})
        setLoadingFalse()
    }

    const createBlog = async (payload) => {
        setLoading()
        try {
            const res = await createBlogApi(payload)
            if (res.status === 201) {
                setSnackBarMsg({ msg: "Blog Posted", type: 0 })
                setOpen(true)
                getAllBlogs()
            } else {
                setSnackBarMsg({ msg: "Couldn't post blog" })
                setOpen(true)
            }
        } catch (e) {
            setSnackBarMsg({ msg: "Couldn't post blog" })
            setOpen(true)
        }
        setLoadingFalse()
    }
    
    const createStoryinBlog = async (payload) => {
        setLoading()
        try {
            const res = await createStoryinBlogApi(payload)
            if (res.status === 200) {
                setSnackBarMsg({ msg: "Story Posted", type: 0 })
                setOpen(true)
                getBlogById({blogId: payload.blogId})
            } else {
                setSnackBarMsg({ msg: "Couldn't post story" })
                setOpen(true)
            }
        } catch (e) {
            setSnackBarMsg({ msg: "Couldn't post story" })
            setOpen(true)
        }
        setLoadingFalse()
    }

    const updateBlog = async (payload) => {
        setLoading()
        try {
            const res = await updateBlogApi(payload)
            if (res.status === 200) {
                setSnackBarMsg({ msg: "Blog updated", type: 0 })
                setOpen(true)
                getAllBlogs()
            } else {
                setSnackBarMsg({ msg: "Couldn't update blog" })
                setOpen(true)
            }
        } catch (e) {
            setSnackBarMsg({ msg: "Couldn't update blog" })
            setOpen(true)
        }
        setLoadingFalse()
    }

    return (
        <BlogContext.Provider
            value={{
                loading: state.loading,
                blogState: state,
                saveState,
                openCreateDialog,
                setOpenCreateDialog,
                getAllBlogs,
                createBlog,
                getBlogById,
                createStoryinBlog,
                openStoryDialog,
                setOpenStoryDialog,
                updateBlog
            }}
        >
            {props.children}
        </BlogContext.Provider>
    );
};

export default withRouter(BlogState);
