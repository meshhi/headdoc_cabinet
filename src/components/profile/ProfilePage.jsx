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
import React from 'react';
import { connect } from 'react-redux';

// const ProfilePage = () => {
//   const {isAuth, isLoading, userData, error} = useSelector(state => state.user);
//   const dispatch = useDispatch();


//   useEffect(() => {
//   }, []);

//   return(
//   )
// }


class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <>
        <div>This is class</div>
        <div>{this.props.user.userData.auth_token}</div>
      </>
    )
  }
}

const mapStateToProps = state => {
  //replace Reducer name with state.'Your Reducer name' and .property
        return {
          user: state.user,
        };
      };
// const mapDispatchToProps = dispatch => {
//   return {
//     CallinComponent: () => {
//       dispatch(MiddlewareName.ActionName());
//     },
//   }
// };
  
export default connect(mapStateToProps)(ProfilePage);