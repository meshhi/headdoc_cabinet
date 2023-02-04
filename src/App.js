import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMoList } from './store/reducers/ActionCreators';
import AppRouter from './router/AppRouter';
import { BrowserRouter } from 'react-router-dom';

function App() {
  const dispatch = useDispatch();
  const {moList, isLoading, error} = useSelector(state => state.moListReducer)

  useEffect(() => {
    dispatch(fetchMoList());
  }, [])

  return (
    <BrowserRouter>
      <header>Some header</header>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
