import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Cart from './Components/Cart/CartItems'



const Myroutes = () => {
  return (
    <>
    <Router>
        <Routes>
            <Route path='/' element={<Cart />}/>
        </Routes>
    </Router>
    </>
  )
}

export default Myroutes;