import React from 'react'
import { MdDeleteForever } from "react-icons/md";
const orderData = [
  {
    id:1,
    title: "Hand-made blue fabric",
    img: "https://luxurauk.com/wp-content/uploads/2022/01/114-scaled.jpeg",
    price: "65",
    quantity: "1",
  },
  {
    id:2,
    title: "Hand-made yellow fabric",
    img: "https://luxurauk.com/wp-content/uploads/2022/01/114-scaled.jpeg",
    price: "105",
    quantity: "3",
  },
  {
    id:3,
    title: "Hand-made red fabric",
    img: "https://luxurauk.com/wp-content/uploads/2022/01/114-scaled.jpeg",
    price: "85",
    quantity: "10",
  },
  {
    id:4,
    title: "blue fabric handmade",
    img: "https://luxurauk.com/wp-content/uploads/2022/01/114-scaled.jpeg",
    price: "10",
    quantity: "15",
  },
  {
    id:5,
    title: "Hand-made green fabric",
    img: "https://luxurauk.com/wp-content/uploads/2022/01/114-scaled.jpeg",
    price: "39",
    quantity: "4",
  },
]


const Cart = () => {
  return (
    <div className='right-0 top-0'>
      <div className='w-[30vw] h-[100vh]'>
        
        <h1 className='bg-black text-white text-xl py-1'>My Order</h1>

        {/* order Item section  */}

        <div>
          <div>
            <ul>
              {orderData.map((item)=>(
                <li key={item.id} className='flex justify-start gap-6'>
                  <img src={item.img} alt="cloth"  className='w-[100px] rounded-full'/>
                  <div className='grid'>
                    <p>{item.title}</p>
                    <div className='flex justify-left items-center gap-3'>
                        <button className='border px-1 font-bold'>+</button>
                        <span className='border px-3'>{item.quantity}</span>
                        <button className='border px-1 font-bold'>-</button>
                    </div>
                  </div>
                  <div className='grid justify-right'>
                    <MdDeleteForever className='size-6' title='remove order'/>
                    <p className='font-semibold'>${item.price}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* order amount section  */}

        <h2>Total Price : </h2>
        <button className='bg-green-300 px-4 font-semibold py-1'>Checkout</button>

      </div>
    </div>
  )
}

export default Cart;