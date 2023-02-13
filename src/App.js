import AppRouter from './router/AppRouter';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/header/Header';
import { Grid } from '@mui/material';

function App() {
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
