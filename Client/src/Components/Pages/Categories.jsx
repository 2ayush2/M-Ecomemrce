import React from 'react'
import { useEffect, useState } from 'react'
import electronics from '../../assets/categories/electronics.jpg'
import jwellery from '../../assets/categories/jwellery.jpg'
import mensclothing from '../../assets/categories/mens clothing.jpg'
import womensclothing from '../../assets/categories/womens clothing.jpeg'


const categoryData=[
  {
    id:1,
    categoryName: 'Electronics',
    categoryImage: `${electronics}`,
  },
  {
    id:2,
    categoryName: 'jwelery',
    categoryImage: `${jwellery}`,
  },
  {
    id:3,
    categoryName: `men's clothing`,
    categoryImage: `${mensclothing}`,
  },
  {
    id:4,
    categoryName: `women's clothing`,
    categoryImage: `${womensclothing}`,
  },
]


const Categories = () => {

  return (
    <div className='mx-auto py-4'>
      <div>
        <h2 className='text-xl py-2'>Categories</h2>
        <div className='flex gap-3'>
          {categoryData.map((item,index) => (
            <div key={item.id} className='w-[257px] h-[280px] border hover:shadow-md'>
              <img src={item.categoryImage} alt="" className='object-cover w-[257px] h-[250px]'/>
              <p className='font-semibold text-center text-xl py-1'>{item.categoryName}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Categories;