import AppRouter from './router/AppRouter';
import { BrowserRouter } from 'react-router-dom';
import PrimarySearchAppBar from './components/header/Header';

function App() {
  return (
    <BrowserRouter>
      <PrimarySearchAppBar />
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
