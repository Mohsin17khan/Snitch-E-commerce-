import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useCart } from "../hooks/useCart";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";
import {  useNavigate } from 'react-router';

const Cart = () => {
  const navigate = useNavigate()
  const cart = useSelector((state) => state.cart.items);
  const { handleGetCartItems, handleIncrementCartItem , handleDecrementCartItems, handleRemoveCartItem } = useCart();

  useEffect(() => {
    handleGetCartItems();
  }, [  ]);


  return (
    <div className="min-h-screen bg-[#131313] text-[#e5e2e1]   py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-10">
          <ShoppingBag className="w-8 h-8 text-[#ffd700]" />
          <h1 className="text-4xl md:text-5xl font-medium font-['Space_Grotesk'] tracking-tight">
            Your Cart
          </h1>
        </div>

        {cart?.items?.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-[#1c1b1b] rounded-lg border border-[#4d4732]/15">
            <ShoppingBag className="w-16 h-16 text-[#d0c6ab] mb-4 opacity-50" />
            <h2 className="text-2xl font-['Space_Grotesk'] text-[#e5e2e1] mb-2">
              Your cart is empty
            </h2>
            <p className="text-[#d0c6ab] mb-8">
              Looks like you haven't added anything yet.
            </p>
            <button 
            onClick={()=>navigate("/")}
            className="px-8 py-3 bg-[#ffd700] text-[#3a3000] font-medium rounded-md hover:brightness-110 transition-all shadow-[0_0_15px_rgba(255,215,0,0.3)]">
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Cart Items List */}
            <div className="lg:col-span-8 space-y-6">
              {cart?.items?.map((item) => {
                const variantData = item.product?.variants;
                const image =
                  variantData?.images?.[0]?.url ||
                  item.product.images?.[0]?.url;
                const attributes = variantData?.attributes || {};
                const newPrice = item.product.price.priceAmount;
                const oldPrice = variantData?.price?.amount;
                console.log(newPrice, oldPrice)

                return (
                  <div
                    key={item._id}
                    className="group flex flex-col sm:flex-row gap-6 p-6 bg-[#1c1b1b] hover:bg-[#2a2a2a] rounded-lg border border-[#4d4732]/15 transition-colors duration-300"
                  >
                    {/* Product Image */}
                    <div className="w-full sm:w-40 h-48 sm:h-40 shrink-0 bg-[#0e0e0e] rounded-md overflow-hidden">
                      {image ? (
                        <img
                          src={image}
                          alt={item.product.title}
                          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#d0c6ab]">
                          No Image
                        </div>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="flex flex-col flex-grow justify-between">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <h3 className="text-xl font-medium font-['Space_Grotesk'] text-[#ffd700] mb-1">
                            {item.product.title}
                          </h3>
                          <p className="text-sm text-[#d0c6ab] mb-3 line-clamp-1">
                            {item.product.description}
                          </p>

                          {/* Attributes */}
                          <div className="flex flex-wrap gap-2 mb-4 items-center">
                            {Object.entries(attributes).map(([key, val]) => (
                              <span
                                key={key}
                                className="px-2 py-1 text-xs bg-[#2a2a2a] text-[#e5e2e1] rounded capitalize border border-[#4d4732]/30"
                              >
                                {key.trim()}: {val}
                              </span>
                            ))}
                            <span className={`px-3 py-1 text-xs rounded border font-medium ${
                              variantData?.stock > 0 
                                ? "bg-green-500/10 text-green-400 border-green-500/30" 
                                : "bg-red-500/10 text-red-400 border-red-500/30"
                            }`}>
                              Stock: {variantData?.stock || 0}
                            </span>
                          </div>
                        </div>
                        <p className="text-lg font-medium whitespace-nowrap text-[#e5e2e1]">
                          ₹{newPrice}
                        </p>
                      </div>
                      <p>{
                        newPrice !== oldPrice  && (
                          <>
                          {
                            oldPrice > newPrice
                             ? <p className="text-green-600 text-[15px] font-bold "> You will save { oldPrice - newPrice } buy this at  { newPrice } </p>
                             : <p className="text-red-600 text-[15px] font-bold"> Warning this product will cost You  {newPrice - oldPrice} more. </p>
                          }
                          </>
                        )

                        }</p>

                      {/* Controls */}
                      <div className="flex justify-between items-center mt-auto">
                        <div className="flex items-center gap-1 bg-[#131313] p-1 rounded-md border border-[#4d4732]/20">
                          <button 
                          onClick={() => handleDecrementCartItems({ productId: item.product._id, variantId: item.variant })}  
                          className="p-1.5 text-[#d0c6ab] hover:text-[#ffd700] transition-colors rounded hover:bg-[#2a2a2a]">
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-10 text-center font-medium text-sm text-[#e5e2e1]">
                            {item.quantity}
                          </span>
                          <button 
                          onClick={() =>  handleIncrementCartItem({ productId: item.product._id, variantId: item.variant })}
                           className="p-1.5 text-[#d0c6ab] hover:text-[#ffd700] transition-colors rounded hover:bg-[#2a2a2a]">
                            <Plus className="w-4 h-4" />
                          </button>

                  
                        </div>

                        <button 
                          onClick={() => handleRemoveCartItem({ productId: item.product._id, variantId: item.variant })}
                          className="text-[#d0c6ab] hover:text-[#ffb4ab] flex items-center gap-1 text-sm font-medium transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-4">
              <div className="sticky top-8 p-8 bg-[#1c1b1b]/80 backdrop-blur-xl rounded-xl border border-[#4d4732]/20 shadow-[0_12px_64px_rgba(0,0,0,0.4)]">
                <h2 className="text-2xl font-medium font-['Space_Grotesk'] text-[#e5e2e1] mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 text-sm text-[#d0c6ab] border-b border-[#4d4732]/20 pb-6 mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-[#e5e2e1]">
                      ₹{cart.totalPrice}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-[#e5e2e1]">
                      {
                        cart.totalPrice >= 4000 ? "99" : "Complimentary" 
                      }
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes</span>
                    <span className="text-[#e5e2e1]">
                      Included
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-end mb-8">
                  <span className="text-base text-[#e5e2e1] font-medium">
                    Total
                  </span>
                  <span className="text-3xl font-medium font-['Space_Grotesk'] text-[#ffd700]">
                    ₹{cart.totalPrice}
                  </span>
                </div>

                <button className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-[#ffd700] to-[#e9c400] text-[#221b00] font-semibold rounded-lg hover:brightness-110 transition-all shadow-[0_0_20px_rgba(255,215,0,0.25)]">
                  Proceed to Checkout
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
