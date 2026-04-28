import React from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux'
import { useProduct } from '../hook/useProduct';

const Dashboard = () => {
  const sellerProducts = useSelector(state => state.product.sellerProducts)
  const { handleGetSellerProduct } = useProduct();
  console.log(sellerProducts);
  
  useEffect(()=>{
    handleGetSellerProduct()
  },[])
  
  return (
    <div>
        Dashboard
      
    </div>
  )
}

export default Dashboard
