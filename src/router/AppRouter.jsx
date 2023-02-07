import { Routes, Route } from "react-router";
import { TilesPage } from "../components/tiles/TilesPage";
import AdminPanel from "../components/admin/AdminPanel";


const AppRouter = () => {
  const isAuth = false;

  return(
  <Routes>
    <Route path="/" element={<TilesPage />}></Route>
    <Route path="/admin" element={<AdminPanel />}></Route>
    <Route path="/appointments/:moId" element={<div>/appointments/:moId</div>}></Route>
  </Routes>)
}

export default AppRouter;