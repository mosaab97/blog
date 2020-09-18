import React, { useContext, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import BlogContext from '../../context/blogContext/BlogContext'
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CreateBlogDialog from './CreateBlogDialog'
import { Tooltip } from '@material-ui/core';
import MainContext from '../../context/mainContext/MainContext';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles({
    table: {
      width: '50%',
      textAlign: 'center',
      margin: "20px auto"
    },
    icon: {
        cursor: "pointer",
        margin: '0 5px'
    },
  });

function Home(props) {
    const classes = useStyles();

    const mainContext = useContext(MainContext)
    const { mainState } = mainContext
    
    const blogContext = useContext(BlogContext)
    const { getAllBlogs, 
        blogState, 
        createBlog,
        openCreateDialog, 
        setOpenCreateDialog, 
        saveState,
        updateBlog
    } = blogContext
    useEffect(() => {
        getAllBlogs()
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <TableContainer className={classes.table} component={Paper}>
            <Table  aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Blog title</TableCell>
                    <TableCell align="right">Owner Name</TableCell>
                    <TableCell align="right">Actions</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {blogState.blogsResponse ? blogState.blogsResponse.map((row) => (
                    <TableRow key={row._id}>
                    <TableCell component="th" scope="row">
                        {row.title}
                    </TableCell>
                    <TableCell align="right">{row.title}</TableCell>
                    <TableCell align="right">
                        <Tooltip title="View blog" className={classes.icon}>
                            <VisibilityIcon onClick={() => props.history.push(`/blog/${row._id}`)}/>
                        </Tooltip>
                        {
                            mainState.userResponse && mainState.userResponse.userType === 1 &&
                                <Tooltip className={classes.icon} title="edit blog">
                                    <EditIcon onClick={() => {
                                        saveState({id: "selectedBlog", value: row})
                                        setOpenCreateDialog(true)}}
                                    />
                                </Tooltip>
                        }
                    </TableCell>
                    </TableRow>
                )) : <TableRow>No Data</TableRow>}
                </TableBody>
            </Table>
            </TableContainer>
            <CreateBlogDialog 
                createBlog={createBlog} 
                open={openCreateDialog} 
                setOpen={setOpenCreateDialog} 
                selectedBlog={blogState.selectedBlog}
                updateBlog={updateBlog}
            />
        </>
      );
}

export default withRouter(Home)
