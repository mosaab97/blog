import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Slide, TextField } from '@material-ui/core';

export const Transition = React.forwardRef((props, ref) => (
    <Slide
        direction="up"
        ref={ref}
        {...props}
    />
));

const StoryDialog = ({
    open, setOpen, createStoryinBlog, blogId
}) => {

    const [blogData, SetBlogData] = useState({
        stories: ""
    })

    const handleChange = (e) => {
        SetBlogData({
            ...blogData, [e.target.id]: e.target.value
        })
    }

    return (
        <div>
            <Dialog
                open={open}
                onClose={setOpen}
                fullWidth
                keepMounted
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-stories"
            >
                <DialogTitle id="alert-dialog-title">Create Story</DialogTitle>
                <DialogContent>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            multiline
                            name="stories"
                            label="Content"
                            type="stories"
                            id="stories"
                            value={blogData.stories}
                            onChange={handleChange}
                        />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            createStoryinBlog({
                                blogId: blogId,
                                stories: blogData.stories
                            })
                            setOpen(false)
                        }}
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
export default StoryDialog;