import React, { useContext, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import BlogContext from '../../context/blogContext/BlogContext'
import StoryDialog from './StoryDialog'
import './BlogPage.css'

function BlogPage(props) {
    const blogContext = useContext(BlogContext)
    const { blogState, getBlogById, openStoryDialog, setOpenStoryDialog, createStoryinBlog } = blogContext
    const {blogByIdResponse} = blogState
    useEffect(() => {
        getBlogById({blogId : window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1)})
        // eslint-disable-next-line
    }, [])
    return (
        <div className="blog-page">
            {
                blogByIdResponse && <div className="main-blog">
                    <h1>{blogByIdResponse.title}</h1>
                    <hr />
                    <div><strong>created At:</strong> {blogByIdResponse.createdAt.substring(0,10)}</div>
                    <div><strong>created By:</strong> {blogByIdResponse.ownerName}</div>
                    <h3>Content:</h3>
                    <p>{blogByIdResponse.description}</p>
                </div>
            }
            {
                blogByIdResponse && blogByIdResponse.stories.map((story, index) => {
                    return (
                        <div className='main-blog' key={index}>
                            <div><strong>Commented By:</strong> {story.ownerName}</div>
                            <p>Content: {story.content}</p>
                        </div>
                    )
                })
            }
            <div className="pointer" onClick={()=>setOpenStoryDialog(true)}>+ Add Story</div>
            <StoryDialog 
                open={openStoryDialog} 
                setOpen={setOpenStoryDialog} 
                blogId={window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1)}
                createStoryinBlog={createStoryinBlog}
            />
        </div>
    )
}

export default withRouter(BlogPage)
