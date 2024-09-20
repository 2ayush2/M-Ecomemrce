import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Cart from './Components/Cart/CartItems'
import Layout from './Components/Services/Layout';
import HomePageSection from './Components/Pages/HomePageSection';
import SignUp from './Components/Pages/SignUp';
import LogIn from './Components/Pages/LogIn';


const Myroutes = () => {
  return (
    <>
    <Router>
        <Routes>
            <Route path='/' element={<Layout />}>
            <Route index element={<HomePageSection />}/>
            <Route path='/cart' element={<Cart />}/>
            <Route path='/login' element={<LogIn />}/>
            <Route path='/signup' element={<SignUp />}/>
            </Route>
        </Routes>
    </Router>
    </>
  )
}

export default Myroutes;