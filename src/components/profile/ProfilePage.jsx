import axios from 'axios';
import { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthFlag } from '../../store/slices/userSlice';
import { loginEsia } from '../../store/slices/ActionCreators';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import { Link, Navigate } from 'react-router-dom';

const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
  overflow: 'hidden',
  overflowWrap: 'anywhere'
}));

const ProfilePage = () => {
  const {isAuth, isLoading, userData, error} = useSelector(state => state.user);
  const dispatch = useDispatch();


  useEffect(() => {
  }, []);

  return(
    <Div>
      {/* your code is <br />{code} <br /> your state is <br />{state} <br /> <br /> isAuth = {isAuth ? 'true' : 'false'} */}
      profile page
    </Div>

  )
}

export default ProfilePage;