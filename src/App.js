import AppRouter from './router/AppRouter';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/header/Header';
import { Grid } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setAuthFlag } from './store/slices/userSlice';
import './App.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('authToken')) {
      dispatch(setAuthFlag(true));
    }
  }, [])
  return (
    <BrowserRouter>
      <Header />
      <Grid container spacing={2} sx={{
        width: '80%',
        margin: '0 auto',
      }}>
        <AppRouter />
      </Grid>
    </BrowserRouter>
  );
}

export default App;
