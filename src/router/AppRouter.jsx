import { Routes, Route } from "react-router";


const AppRouter = () => {
  const isAuth = false;

  return(
  <Routes>
    <Route path="/" element={<div>root</div>}></Route>
    <Route path="/appointments/:moId" element={<div>/appointments/:moId</div>}></Route>
  </Routes>)
}

export default AppRouter;