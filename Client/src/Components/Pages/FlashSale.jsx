import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'


const FlashSale = () => {
  const [flashSaleProducts, SetFlashSaleProducts] = useState([]);
  useEffect(()=>{
    const fetchFlashSaleProduct = async()=> {
      await axios 
          .get("https://fakestoreapi.com/products?limit=6")
          .then((response)=> {
              if(response.status === 200) {
                // console.log(response.data);                
                SetFlashSaleProducts(response.data);                      
              } else {
                console.error("Request failed with status: ", response.status);
              }
            })
          .catch((error)=> {
            console.error("Request failed: ", error);
          });
      };
      fetchFlashSaleProduct();
  })
  return (
    <div>
      <div>
        <h2>Flash Sale</h2>
        <div className='flex justify-between'>
          <h3>On Sale Now</h3>
          <h3>View All Products</h3>
        </div>
        <div className='flex gap-3'>
          {flashSaleProducts.map((item,index) => (
            <div key={item.id} className='w-[257px] h-[430px] border hover:shadow-md'>
              <img src={item.image} alt="" className='w-[257px] h-[235px]'/>
              <p className='text-xl font-semibold'>{item.title}</p>
              {/* <p>{item.category}</p> */}
              {/* <p>{item.description}</p> */}
              <p>${item.price}</p>
              <p>Rating: {item.rating.rate}</p>
              {/* <p>Stocks left: {item.rating.count}</p> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FlashSale