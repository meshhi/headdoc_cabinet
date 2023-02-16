import { Routes, Route, Navigate } from "react-router";
import { TilesPage } from "../components/tiles/TilesPage";
import AdminPanel from "../components/admin/AdminPanel";
import AuthorizationPage from "../components/auth/AuthorizationPage";
import TilemapPage from "../components/tilemap/TilemapPage";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import { OAuthPopup } from "@tasoskakour/react-use-oauth2";

const AppRouter = () => {
  // clear credentials watermark on all highcharts diagrams
  const clearHighchartsCredentials = useCallback(() => {
    document.querySelectorAll('.highcharts-credits').forEach((chartCredentials) => chartCredentials.style.display = 'none');
  });

  const {isAuth} = useSelector(state => state.user);

  const ProtectedRoute = ({ user, redirectPath = '/auth', children }) => {
    if (!isAuth) {
      return <Navigate to={redirectPath} replace />;
    }
    return children;
  };

  const AuthRedirectRoute = ({ user, redirectPath = '/', children }) => {
    if (isAuth) {
      return <Navigate to={redirectPath} replace />;
    }
    return children;
  };

  return(
  <Routes>
    <Route path="/" element={
      <ProtectedRoute>
        <TilemapPage clear={clearHighchartsCredentials}/>
      </ProtectedRoute>}>
    </Route>
    <Route path="/auth" element={
      <AuthRedirectRoute>
        <AuthorizationPage />
      </AuthRedirectRoute>
      }>
    </Route>
    <Route path="/details" element={
      <ProtectedRoute>
        <TilesPage clearHighchartsCredentials={clearHighchartsCredentials}/>
      </ProtectedRoute>
    }>
    </Route>
    <Route path="/admin" element={
      <ProtectedRoute>
        <AdminPanel />
      </ProtectedRoute>
    }>
    </Route>
    <Route element={<OAuthPopup />} path="/callback" />
    <Route path="*" element={<p>There's nothing here: 404!</p>} />
  </Routes>)
}

export default AppRouter;