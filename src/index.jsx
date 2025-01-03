import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';

// Integrate Custom Styling
import './style/app.css';
import './style/fonts.css';
import './style/custom.css';

// Helpers
import { FetchFromStorage } from "./helpers";

// Query Client Init
const queryClient = new QueryClient();

// Installer
import { Install } from './pages/user/auth/install';
import { Login } from './pages/user/auth/login';
import { Logout } from './pages/user/auth/logout';

// Pages
import { Dashboard } from './pages/user/dashboard';
import { Profile } from './pages/user/profile';
import { Widget } from './pages/user/widget';
import { Billing } from './pages/user/billing';

// Adminstrator Login
import { AdminLogin } from './pages/admin/auth/login';
import { AdminLogout } from './pages/admin/auth/logout';

// Admin Pages
import { AdminDashboard } from './pages/admin/dashboard';
import { AdminProfile } from './pages/admin/profile';
import { AdminUsers } from './pages/admin/users';
import { AdminCampaigns } from './pages/admin/campaigns';
import { AdminManageCampaign } from './pages/admin/manage-campaign';

// Error Page
import { Error404 } from './pages/error404';

// Route Authentication
export const UserLockedRoute = ({ children }) => {
  return FetchFromStorage('token') ? children : <Navigate to="/" />
};

export const AdminLockedRoute = ({ children }) => {
  return FetchFromStorage('admin_token') ? children : <Navigate to="/admin" />
};

const App = () => {
  return (
    <Router>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <Routes>
            {/* App Auth */}
            <Route path="/install" element={<Install />} />
            <Route path="/" element={<Login />} />
            <Route path="/logout" element={<UserLockedRoute><Logout /></UserLockedRoute>} />

            {/* App Pages */}
            <Route path="/dashboard" element={<UserLockedRoute><Dashboard /></UserLockedRoute>} />
            <Route path="/profile" element={<UserLockedRoute><Profile /></UserLockedRoute>} />
            <Route path="/widget" element={<UserLockedRoute><Widget /></UserLockedRoute>} />
            <Route path="/billing" element={<UserLockedRoute><Billing /></UserLockedRoute>} />

            {/* Admin Auth */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/logout" element={<AdminLockedRoute><AdminLogout /></AdminLockedRoute>} />

            {/* Admin Pages */}
            <Route path="/admin/dashboard" element={<AdminLockedRoute><AdminDashboard /></AdminLockedRoute>} />
            <Route path="/admin/profile" element={<AdminLockedRoute><AdminProfile /></AdminLockedRoute>} />
            <Route path="/admin/users" element={<AdminLockedRoute><AdminUsers /></AdminLockedRoute>} />
            <Route path="/admin/campaigns" element={<AdminLockedRoute><AdminCampaigns /></AdminLockedRoute>} />
            <Route path="/admin/manage-campaign/:id" element={<AdminLockedRoute><AdminManageCampaign /></AdminLockedRoute>} />

            {/* Error 404 */}
            <Route path="*" element={<Error404 />} />
          </Routes>
        </QueryClientProvider>
      </RecoilRoot>
    </Router>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);