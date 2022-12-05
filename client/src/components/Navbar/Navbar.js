import React, { useState, useEffect } from 'react';
import { AppBar,Avatar,Button,Toolbar,Typography } from '@material-ui/core';
import useStyles from './styles';
import memoriesLogo from '../../images/new memorie.png';
import memoriesText from '../../images/memories-Text.png';
import { Link,useNavigate,useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';

const Navbar = () => {
    const history = useNavigate();
    const location = useLocation();
    const classes = useStyles();

    const [ user,setUser ] = useState(JSON.parse(localStorage.getItem('profile')));

    const dispatch = useDispatch();

    const logout = () => {
        history("/");

        dispatch({ type:'LOGOUT' });

        setUser(null);
    }

    useEffect(()=>{
        const token = user?.token;

        if(token) {
            const decodedToken = jwt_decode(token);
            if(decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    },[location])

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
        <Link to='/' className={classes.brandContainer}>
           <img src={memoriesText} alt='icon' height='45px' />
           <img className={classes.image} src={memoriesLogo} alt="icon" height="60" />
        </Link>
    <Toolbar className={classes.toolbar}>
        {user ? (
            <div className={classes.profile}>
                <Avatar className={classes.purple} alt={user.result.userName} src={user.result.image}>{user.result.userName.charAt(0)}</Avatar>
                <Typography className={classes.userName} variant='h6'>{user.result.userName}</Typography>
                <Button variant="contained" className={classes.logout} color='secondary' onClick={logout}>Logout</Button>
            </div>
        ) : (
            <Button component={Link} to="/auth" variant='contained' color='primary'>Sign In</Button>
        )}
    </Toolbar>
  </AppBar>
  )
}

export default Navbar
