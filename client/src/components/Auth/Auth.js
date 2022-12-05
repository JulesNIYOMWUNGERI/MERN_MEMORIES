import React, { useState } from 'react';
import { Avatar,Button,Grid,Paper,Container,Typography } from '@material-ui/core';
import{GoogleLogin} from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';
import {useNavigate} from 'react-router-dom';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { signup,signin } from '../../actions/auth';
import useStyles from './styles';
import Input from './Input';

const initialState = { firstName:'', lastName:'', email:'', password:'', comfirmPassword:''}

const Auth = () => {
    const history = useNavigate();
    const classes= useStyles();
    const [ showPassword,setShowPassword ] = useState(false);
    const [isSignUp,setIsSignUp] = useState(false);
    const [ formData,setFormData ] = useState(initialState);
    const dispatch = useDispatch();

    const handleShowPassword = () => setShowPassword(!showPassword);

    const handleSubmit = (e) => {
        e.preventDefault();

        if(isSignUp) {
            dispatch(signup( formData,history ))
        }else {
            dispatch(signin( formData,history ))
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData,[e.target.name]:e.target.value })
    };

    const switchMode = () => {
        setIsSignUp(!isSignUp);
        setShowPassword(false)
    };

    const googleSuccess = async(response) => {
        const decoded= jwt_decode(response?.credential);

        const result = {
            _id: decoded?.sub,
            _type:'user',
            userName: decoded?.name,
            image: decoded?.picture,
            email: decoded?.email,
        };

        const token = response?.credential;

       try {
        dispatch({ type: 'AUTH', data: { result,token }});

        history("/");

       } catch (error) {
        console.log(error)
       }
    };
    const googleFailure = () => {
        console.log('Error')
       console.log("Google Sign In was Unsuccessful. Try Again Later")
    };

  return (
   <Container component='main' maxWidth='xs'>
    <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
        </Avatar>
        <Typography variant='h5'>{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                {
                    isSignUp && (
                        <>
                          <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half />
                          <Input name='lastName' label='Last Name' handleChange={handleChange} half />
                        </>
                    )}
                <Input name='email' label='Email Address' handleChange={handleChange} type="email" />
                <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                {isSignUp && <Input name='comfirmPassword' label='Repeat Password' handleChange={handleChange} type='password'/>}
            </Grid>
            <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
                {isSignUp ? 'Sign Up' : 'Sign In'}
            </Button>
            <GoogleLogin 
              onSuccess={googleSuccess}
              onError={googleFailure}
            />
            <Grid container justifyContent='flex-end'>
                <Grid item>
                    <Button onClick ={switchMode}>
                        {isSignUp ? 'Allready Have An Account? Sign In' : 'Dont Have An Account? Sign Up'}
                    </Button>
                </Grid>
            </Grid>
        </form>
    </Paper>
   </Container>
  )
}

export default Auth
