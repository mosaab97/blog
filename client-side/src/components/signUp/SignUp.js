import React, { useContext, useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MainContext from '../../context/mainContext/MainContext';
import { MenuItem } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { handleTextValidation, isNullOrEmptyOrUndifind } from '../helper/helper';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUp = (props) => {
  const classes = useStyles();

  const mainContext = useContext(MainContext)
  const { signUp } = mainContext

  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: 2
  })
  
  const [signUpErrors, setSignUpErrors] = useState({
    email: false,
    password: false,
    name: false
  })

  useEffect(() => {
    !isNullOrEmptyOrUndifind(localStorage.getItem('token')) && props.history.push('/')
    // eslint-disable-next-line
  },[])
  
  const handleChange =(e) => {
    setSignUpData({
      ...signUpData, [e.target.id] : e.target.value
    })
    setSignUpErrors({
      ...signUpErrors, [e.target.id] : handleTextValidation(e.target.id, e.target.value)
    })
  }

  const handleSignUp = async () => {
    if(isValidForm()){
      await signUp({
        name: signUpData.name,
        email: signUpData.email,
        password: signUpData.password,
        userType: signUpData.userType
      })    
      !isNullOrEmptyOrUndifind(localStorage.getItem('token')) && props.history.push('/')
    }
  }

  const isValidForm = () => {
    const validPass = handleTextValidation('password', signUpData.password) || signUpData.password !== signUpData.confirmPassword
    const validEmail = handleTextValidation('email', signUpData.email)
    const validName = handleTextValidation('name', signUpData.name)
    setSignUpErrors({password: validPass, email: validEmail, name: validName})
    return !validPass && !validEmail && !validName
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                error={signUpErrors.name}
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                name="Name"
                value={signUpData.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={signUpErrors.email}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={signUpData.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={signUpErrors.password}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={signUpData.password}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirm password"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                value={signUpData.confirmPassword}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
            <TextField
              fullWidth
              required
              id="userType"
              select
              label="Select"
              value={signUpData.userType}
              onChange={(e) => {
                setSignUpData({...setSignUpData, userType: e.target.value})
              }}
              helperText="Please select your currency"
            >
                <MenuItem key={1} value={1}>
                  Admin
                </MenuItem>
                <MenuItem key={2} value={2}>
                  Writer
                </MenuItem>
            </TextField>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSignUp}
          >
            Sign Up
          </Button>
      </div>
    </Container>
  );
}

export default withRouter(SignUp)
