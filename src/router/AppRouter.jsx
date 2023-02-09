import { Routes, Route } from "react-router";
import { TilesPage } from "../components/tiles/TilesPage";
import AdminPanel from "../components/admin/AdminPanel";
import AuthorizationPage from "../components/auth/AuthorizationPage";
import TilemapPage from "../components/TilemapPage";
import { useCallback } from "react";


const AppRouter = () => {
  const isAuth = false;

  // clear credentials watermark on all highcharts diagrams
  const clearHighchartsCredentials = useCallback(() => {
    document.querySelectorAll('.highcharts-credits').forEach((chartCredentials) => chartCredentials.style.display = 'none');
  });

  return(
  <Routes>
    <Route path="/details" element={<TilesPage clearHighchartsCredentials={clearHighchartsCredentials}/>}></Route>
    <Route path="/" element={<TilemapPage clear={clearHighchartsCredentials}/>}></Route>
    <Route path="/admin" element={<AdminPanel />}></Route>
    <Route path="/auth" element={<AuthorizationPage />}></Route>
    <Route path="/appointments/:moId" element={<div>/appointments/:moId</div>}></Route>
  </Routes>)
}

export default AppRouter;