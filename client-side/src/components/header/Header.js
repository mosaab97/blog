import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import BlogContext from '../../context/blogContext/BlogContext';
import { isNullOrEmptyOrUndifind } from '../helper/helper';
import MainContext from '../../context/mainContext/MainContext';
import Loading from '../sharedComponents/Loading';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  homeBtn: {
    flexGrow: 1,
    textAlign: 'left'
  },
}));

const Header = (props) => {
  const classes = useStyles();
  const mainContext = useContext(MainContext)
  const { mainState, getUserData } = mainContext

  const blogContext = useContext(BlogContext)
  const { setOpenCreateDialog } = blogContext

  useEffect(() => {
    !isNullOrEmptyOrUndifind(localStorage.getItem('token')) && 
    isNullOrEmptyOrUndifind(mainState.userResponse) && 
    getUserData()
    // eslint-disable-next-line
  }, [])
  const changeRoute = (path) => {
    props.history.push(path)
  }

  return (
  <>
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <div className={classes.homeBtn}>
            <Button color='inherit' onClick={() => changeRoute('/')}>
              Home
          </Button>

          </div>
          {
            isNullOrEmptyOrUndifind(localStorage.getItem('token')) ? <>
              <Button color="inherit" onClick={() => changeRoute('/login')}>Login</Button>
              <Button color="inherit" onClick={() => changeRoute('/signup')}>Sign Up</Button>
            </>
            :
            <>
              <Button color="inherit" onClick={() => setOpenCreateDialog(true)}>Create Blog</Button>
              <Button color="inherit" onClick={() => {
                localStorage.setItem('token', "")
                changeRoute('/')
              }}>Logout</Button>
            </>
          }
        </Toolbar>
      </AppBar>
    </div>
    {mainState.loading && <Loading/>}
  </>
  );
}
export default withRouter(Header)
