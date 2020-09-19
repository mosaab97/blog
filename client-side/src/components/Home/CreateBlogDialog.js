import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Slide, TextField } from '@material-ui/core';
import { isNullOrEmptyOrUndifind } from '../helper/helper';

export const Transition = React.forwardRef((props, ref) => (
    <Slide
        direction="up"
        ref={ref}
        {...props}
    />
));

const CreateBlogDialog = ({
    open, setOpen, createBlog, selectedBlog, updateBlog
}) => {

    useEffect(() => {
        if(selectedBlog) {
            SetBlogData({
                title: selectedBlog.title,
                description: selectedBlog.description        
            })
        }
        // eslint-disable-next-line
    }, [selectedBlog])
    const [blogData, SetBlogData] = useState({
        title: "",
        description: ""
    })

    const handleChange = (e) => {
        SetBlogData({
            ...blogData, [e.target.id]: e.target.value
        })
    }

    const handlePost = () => {
        isNullOrEmptyOrUndifind(selectedBlog) ?
            createBlog({
                title: blogData.title,
                description: blogData.description
            })
        :
            updateBlog({
                blogId: selectedBlog._id,
                title: blogData.title,
                description: blogData.description
            })

        SetBlogData({
            title: "",
            description: ""
        })
        setOpen(false)
    }
    return (
        <div>
            <Dialog
                open={open}
                onClose={setOpen}
                keepMounted
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Create Blog</DialogTitle>
                <DialogContent>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="title"
                            label="Title"
                            name="title"
                            autoComplete="title"
                            value={blogData.title}
                            onChange={handleChange}
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            multiline
                            name="description"
                            label="Content"
                            type="description"
                            id="description"
                            value={blogData.description}
                            onChange={handleChange}
                        />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handlePost}
                        color="primary"
                    >
                        Post
                    </Button>
                    <Button
                        onClick={() => {
                            setOpen(false)
                        }}
                        color="secondary"
                    >
                        Close
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
export default CreateBlogDialog;