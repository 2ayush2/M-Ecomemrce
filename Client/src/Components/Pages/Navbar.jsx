import React from "react";
import logo from "../../assets/ecom.png";
import { BsCart2 } from "react-icons/bs";
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
  const navigate = useNavigate()

  return (
    <div>
      <div className="bg-orange-500">
        {/* upper nav section  */}
        <div className="">
            <ul className="flex text-white gap-6 font-semibold justify-end px-4">
                <li><a href="">SAVE MORE ON APP</a></li>
                <li><a href="">BECOME SELLER</a></li>
                <li><a href="">HELP & SUPPORT</a></li>
                <li><a href="" onClick={()=> navigate('/login')}>LOGIN</a></li>
                <li><a href="" onClick={()=> navigate('/signup')}>SIGN UP</a></li>
                <li><a href="">CHANGE LANGUAGE</a></li>
            </ul>
        </div>

        {/* lower nav section  */}
        <div className="flex justify-between items-center px-4 py-2">
          {/* logo section  */}
          <div>
            <img src={logo} alt="" onClick={()=> navigate('/')} className="cursor-pointer"/>
          </div>
          {/* search section  */}
          <div className="flex items-center" >
            <input type="search" 
            placeholder="search" 
            className="w-[700px] h-[50px] px-4 focus:outline-none"
            />
            <IoIosSearch className="text-5xl p-2 bg-orange-200"/>
          </div>
          {/* cart section  */}
          <div>
            < BsCart2 className="text-5xl text-white cursor-pointer" onClick={()=> navigate('/cart')}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
