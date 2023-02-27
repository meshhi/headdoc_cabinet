import AppRouter from './router/AppRouter';
// import { BrowserRouter } from 'react-router-dom';
import Header from './components/header/Header';
import { Grid } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setAuthFlag } from './store/slices/userSlice';
import { checkAuthentication } from './store/slices/ActionCreators';
import { useLocation } from 'react-router-dom';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (localStorage.getItem('authToken') && location.pathname !== '/callback') {
      dispatch(checkAuthentication());
    }
  }, [])
  
  return (
    // <BrowserRouter>
    <>
      <Header />
      <Grid container spacing={2} sx={{
        width: '80%',
        margin: '0 auto',
        // minHeight: '50vh'
      }}>
        <AppRouter />
      </Grid>
    </>
    // {/* </BrowserRouter> */}
  );
}

export default App;
