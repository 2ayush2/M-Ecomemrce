import { Routes,Route } from 'react-router-dom';
import Sidebar from '../src/Components/User/Sidebar';
import Profile from '../src/Components/User/userProfiles';

const UserRoutes = () => {
  return (
    <div style={{ display: 'flex' }}>
    {/* Admin Sidebar visible on all admin pages */}
    <Sidebar />
    
    {/* Main content area for admin routes */}
    <div style={{ flex: 1, padding: '20px' }}>
      <Routes>
        <Route path='profile' element={<Profile />} />
    
        {/* Add more admin routes here */}
      </Routes>
    </div>
  </div>
  );
};

export default UserRoutes;
