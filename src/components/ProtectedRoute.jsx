import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ requireTexture = false }) => {
    const user = localStorage.getItem('username');
    const faceTexture = localStorage.getItem('faceTexture');

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (requireTexture && !faceTexture) {
        return <Navigate to="/avatar-setup" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
