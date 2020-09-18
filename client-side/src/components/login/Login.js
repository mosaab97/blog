import React, { useContext, useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MainContext from '../../context/mainContext/MainContext';
import { withRouter } from 'react-router-dom';
import { handleTextValidation, isNullOrEmptyOrUndifind } from '../helper/helper';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = (props) => {
  const classes = useStyles();
  const mainContext = useContext(MainContext)
  const { login } = mainContext
  const [loginData, SetLoginData] = useState({
    email: "",
    password: ""
  })
  const [loginErrors, setLoginErrors] = useState({
    email: false,
    password: false
  })

  useEffect(() => {
    !isNullOrEmptyOrUndifind(localStorage.getItem('token')) && props.history.push('/')
    // eslint-disable-next-line
  },[])

  const handleChange =(e) => {
    SetLoginData({
      ...loginData, [e.target.id] : e.target.value
    })
    setLoginErrors({
      ...loginErrors, [e.target.id] : handleTextValidation(e.target.id, e.target.value)
    })
  }

  const handleLogin = async () => {
    if(isValidForm()) {
      await login({email: loginData.email, password: loginData.password})
      !isNullOrEmptyOrUndifind(localStorage.getItem('token')) && props.history.push('/')
    }
  }

  const isValidForm = () => {
    const validPass = handleTextValidation('password', loginData.password)
    const validEmail = handleTextValidation('email', loginData.email)
    setLoginErrors({password: validPass, email: validEmail})
    return !validPass && !validEmail    
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
          <TextField
            error={loginErrors.email}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={loginData.email}
            onChange={handleChange}
            autoFocus
          />
          <TextField
            error={loginErrors.password}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={loginData.password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleLogin}
          >
            Sign In
          </Button>
      </div>
    </Container>
  );
}

export default withRouter(Login)