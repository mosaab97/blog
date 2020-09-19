import React from 'react'
import { Route, Switch } from 'react-router-dom'
import BlogPage from '../components/blogPage/BlogPage'
import Home from '../components/Home/Home'
import Login from '../components/login/Login'
import SignUp from '../components/signUp/SignUp'
const Routes = () => {
    return (
        <Switch>
            <Route path='/' component={Home} exact />
            <Route path='/login' component={Login} exact/>
            <Route path='/signup' component={SignUp} exact />
            <Route path='/blog/:id' component={BlogPage} exact />
            <Route path="/**" component={() => <div>404</div>} />
        </Switch>
    )
}

export default Routes
