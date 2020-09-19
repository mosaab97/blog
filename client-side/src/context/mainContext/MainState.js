import React, { useReducer, useState } from 'react';
import MainContext from './MainContext';
import MainReducer from './MainReducer';
import {
  SAVE_STATE, SET_LOADING, SET_LOADING_FALSE,
} from '../types';
import { getUserDataApi, loginApi, signUpApi } from '../../services/userServices';

const MainState = (props) => {
  const initialState = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    userResponse: null,
    blogs: [
      {
        title: "title 1",
        content: 'content'
      },
      {
        title: "title 1",
        content: 'content'
      },
      {
        title: "title 1",
        content: 'content'
      },
      {
        title: "title 1",
        content: 'content'
      }
    ]
  };

  const [state, setState] = useReducer(MainReducer, initialState);
  const [open, setOpen] = useState(false);
  const [snackBarMsg, setSnackBarMsg] = useState(null);

  const saveState = (action) => {
    setState({
      type: SAVE_STATE,
      payload: action,
    });
  };

  const login = async (payload) => {
    setLoading()
    try {
      const res = await loginApi(payload)
      if(res.status === 200) {
          saveState({id: "userResponse", value: res.data.user})
          localStorage.setItem('token', res.data.token)
      } else {
        saveState({id: "userResponse", value: null})
        setSnackBarMsg({msg: "Email/Password is not correct"})
        setOpen(true)
      }
    } catch (e) {
        saveState({id: "userResponse", value: null})
        setSnackBarMsg({msg: "Email/Password is not correct"})
        setOpen(true)
    }
    setLoadingFalse()
  }

  const signUp = async (payload) => {
    setLoading()
    try {
      const res = await signUpApi(payload)
      if(res.status === 201) {
          saveState({id: "userResponse", value: res.data.user})
          localStorage.setItem('token', res.data.token)
      } else {
        saveState({id: "userResponse", value: null})
        setSnackBarMsg({msg: "Somthing went wrong, please try again"})
        setOpen(true)
      }
    } catch (e) {
        saveState({id: "userResponse", value: null})
        setSnackBarMsg({msg: "Somthing went wrong, please try again"})
        setOpen(true)
    }
    setLoadingFalse()
  }

  const getUserData = async () => {
    setLoading()
    try {
      const res = await getUserDataApi()
      setLoading()
      if(res.status === 200) {
        saveState({id: "userResponse", value: res.data})
      } else {
        saveState({id: "userResponse", value: null})
      }
    } catch (e) {
        saveState({id: "userResponse", value: null})
    }
    setLoadingFalse()
  }

  const setLoading = () => setState({type: SET_LOADING})
  const setLoadingFalse = () => setState({type: SET_LOADING_FALSE})

  return (
    <MainContext.Provider
      value={{
        loading: state.loading,
        mainState: state,
        saveState,        
        snackBarMsg,
        setSnackBarMsg,
        open,
        setOpen,
        setLoading,
        setLoadingFalse,
        login,
        signUp,
        getUserData
      }}
    >
      {props.children}
    </MainContext.Provider>
  );
};

export default MainState;
