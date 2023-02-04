import AppRouter from './router/AppRouter';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <header>Some header</header>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
