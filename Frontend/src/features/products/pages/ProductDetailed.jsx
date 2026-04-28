import React from 'react'
import { useParams } from 'react-router'
import { useProduct } from '../hook/useProduct';
import { useEffect } from 'react';
import { useState } from 'react';

const ProductDetailed = () => {
    const { productId} = useParams();
    const { handleGetProductDetail } = useProduct()
    const [product, setProduct] = useState(null)

    async function fetchDetail() {
     const data = await handleGetProductDetail(productId)
        setProduct(data)
    }
    console.log(product)

    useEffect(()=>{
        fetchDetail()
    },[productId])
  return (
    <div>
        
      
    </div>
  )
}

export default ProductDetailed
