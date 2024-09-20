import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cart from '../src/Components/Cart/CartItems';
import Register from '../src/auth/Register';
import Login from '../src/auth/Login';
import UserRoutes from './UserRoutes';


const Myroutes = () => {
  return (
    <>
    
      <Router>
        <Routes>
          <Route path='/' element={<Cart />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/user/*' element={<UserRoutes />} />
        </Routes>
      </Router>
    </>
  );
}

export default Myroutes;
