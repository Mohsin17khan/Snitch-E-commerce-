import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useProduct } from '../hook/useProduct';
import { Navigate, useNavigate } from 'react-router';

/* -- Icon Helpers -- */
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const ShoppingCartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

const ArrowRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
    </svg>
)

const formatPrice = (amount, currency = 'INR') => {
  try {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${currency} ${amount}`;
  }
};

const ProductCard = ({ product }) => {
    const imageUrl = product?.images?.[0]?.url;
    const navigate = useNavigate();
    
    return (
        <div 
            className="group relative flex flex-col rounded-2xl overflow-hidden transition-all duration-500 ease-out cursor-pointer"
            style={{
                background: '#201f1f',
                boxShadow: '0 12px 64px 0 rgba(0,0,0,0.45)',
            }}
        >
            {/* Image Section */}
            <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#1a1a1a]">
                {imageUrl ? (
                    <img 
                        src={imageUrl} 
                        alt={product.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center opacity-20">
                        <span className="text-sm uppercase tracking-widest text-[#4d4732]">No Image</span>
                    </div>
                )}
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button
                    onClick={() => navigate(`/product/detail/${product._id}`)}
                      className="px-6 py-2 bg-[#ffd700] cursor-pointer text-black text-xs font-bold uppercase tracking-widest rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        View Details
                    </button>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-5 flex flex-col gap-2">
                <div className="flex justify-between items-start gap-2">
                    <h3 className="text-lg font-medium leading-tight text-[#e5e2e1] font-['Space_Grotesk'] truncate">
                        {product.title}
                    </h3>
                    <span className="text-sm font-bold text-[#ffd700] font-['Space_Grotesk']">
                        {formatPrice(product.price?.priceAmount, product.price?.priceCurrency)}
                    </span>
                </div>
                <p className="text-sm text-[#999077] line-clamp-2 font-['Inter'] leading-relaxed">
                    {product.description}
                </p>
                
                {/* Subtle Action Line */}
                <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#4d4732]">Classified Drop</span>
                    <button className="p-1 hover:text-[#ffd700] transition-colors">
                        <ShoppingCartIcon />
                    </button>
                </div>
            </div>
            
            {/* Corner Accent */}
            <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[200%] h-[200%] bg-[#ffd700] opacity-0 group-hover:opacity-5 transition-opacity duration-500 rotate-45 translate-x-1/2 -translate-y-1/2"></div>
            </div>
        </div>
    );
};

const Home = () => {
    const { handleGetAllProducts } = useProduct();
    const products = useSelector(state => state.product.products) || [];
    
    useEffect(() => {
        handleGetAllProducts();
    }, []);

    return (
        <div className="min-h-screen bg-[#131313] text-[#e5e2e1] selection:bg-[#ffd700]/30 overflow-x-hidden">
            {/* Google Fonts */}
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap"
            />

            {/* Navigation / Header */}
            <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-[#131313]/80 border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="text-2xl font-bold tracking-[0.4em] font-['Space_Grotesk'] text-[#ffd700]">
                        SNITCH
                    </div>
                    
                    <div className="hidden md:flex items-center gap-10 text-[11px] uppercase tracking-[0.3em] font-medium text-[#d0c6ab]">
                        <a href="#" className="hover:text-[#ffd700] transition-colors">Intelligence</a>
                        <a href="#" className="hover:text-[#ffd700] transition-colors">Operations</a>
                        <a href="#" className="hover:text-[#ffd700] transition-colors">Archive</a>
                    </div>

                    <div className="flex items-center gap-6">
                        <button className="p-2 hover:bg-white/5 rounded-full transition-colors">
                            <SearchIcon />
                        </button>
                        <button className="p-2 hover:bg-white/5 rounded-full transition-colors relative">
                            <ShoppingCartIcon />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-[#ffd700] rounded-full"></span>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-40 pb-24 px-6 overflow-hidden">
                {/* Ambient Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#ffd700]/5 rounded-full blur-[120px] pointer-events-none"></div>
                
                <div className="max-w-7xl mx-auto relative">
                    <div className="flex flex-col gap-6 max-w-3xl">
                        <span className="text-xs uppercase tracking-[0.5em] text-[#ffd700] font-semibold">Season Zero / Active</span>
                        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter font-['Space_Grotesk'] leading-[0.9]">
                            UNCOMPROMISING <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffd700] to-[#fff6df]">STYLE.</span>
                        </h1>
                        <p className="text-lg md:text-xl text-[#999077] font-['Inter'] leading-relaxed max-w-xl">
                            Engineered for those who operate with surgical precision. Our latest drops combine technical superiority with cinematic aesthetics.
                        </p>
                        <div className="flex items-center gap-8 mt-4">
                            <button className="group flex items-center gap-3 px-8 py-4 bg-[#ffd700] text-black font-bold uppercase tracking-widest text-xs rounded-full hover:scale-105 transition-transform duration-300 shadow-[0_0_40px_rgba(255,215,0,0.2)]">
                                Explore Drops
                                <ArrowRightIcon />
                            </button>
                            <button className="text-xs uppercase tracking-widest font-bold border-b border-[#ffd700]/30 pb-1 hover:border-[#ffd700] transition-colors">
                                View Intelligence
                            </button>
                        </div>
                    </div>
                </div>
                
                {/* Tech Detail Decoration */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:block opacity-10">
                    <div className="rotate-90 text-[100px] font-bold tracking-tighter select-none pointer-events-none">CODE-X01</div>
                </div>
            </section>

            {/* Product Section */}
            <section className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-end justify-between mb-16">
                        <div className="flex flex-col gap-2">
                            <span className="text-[10px] uppercase tracking-[0.3em] text-[#4d4732] font-bold">Latest Intelligence</span>
                            <h2 className="text-4xl font-bold tracking-tight font-['Space_Grotesk']">Field Gear</h2>
                        </div>
                        <div className="flex gap-4">
                             {/* Filter Tabs placeholder */}
                             <div className="flex bg-[#201f1f] p-1 rounded-full">
                                <button className="px-6 py-2 bg-[#ffd700] text-black text-[10px] font-bold uppercase tracking-widest rounded-full">All</button>
                                <button className="px-6 py-2 text-[#999077] text-[10px] font-bold uppercase tracking-widest rounded-full hover:text-[#e5e2e1]">Apparel</button>
                                <button className="px-6 py-2 text-[#999077] text-[10px] font-bold uppercase tracking-widest rounded-full hover:text-[#e5e2e1]">Tech</button>
                             </div>
                        </div>
                    </div>

                    {products.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {products.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-32 border border-dashed border-white/10 rounded-3xl">
                            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6">
                                <div className="w-8 h-8 border-2 border-[#ffd700]/20 border-t-[#ffd700] rounded-full animate-spin"></div>
                            </div>
                            <p className="text-[#4d4732] uppercase tracking-[0.3em] text-xs">Awaiting Data Link...</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Newsletter / CTA Section */}
            <section className="py-32 px-6">
                <div className="max-w-7xl mx-auto bg-gradient-to-br from-[#201f1f] to-[#1a1a1a] rounded-[40px] p-12 md:p-24 relative overflow-hidden text-center">
                    <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                    <div className="relative z-10 max-w-2xl mx-auto flex flex-col gap-8">
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight font-['Space_Grotesk']">JOIN THE INTEL</h2>
                        <p className="text-[#999077] font-['Inter'] leading-relaxed">
                            Be the first to access classified drops, limited operations, and exclusive tactical gear. No spam, only intelligence.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 mt-4">
                            <input 
                                type="email" 
                                placeholder="OPERATIVE EMAIL" 
                                className="flex-1 bg-[#131313] border border-white/10 rounded-full px-8 py-4 text-xs tracking-widest focus:outline-none focus:border-[#ffd700]/50 transition-colors"
                            />
                            <button className="px-10 py-4 bg-[#ffd700] text-black font-bold uppercase tracking-widest text-xs rounded-full hover:scale-105 transition-transform duration-300">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-6 border-t border-white/5">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-xl font-bold tracking-[0.4em] font-['Space_Grotesk'] text-[#4d4732]">
                        SNITCH
                    </div>
                    <div className="flex gap-8 text-[10px] uppercase tracking-widest font-bold text-[#4d4732]">
                        <a href="#" className="hover:text-[#e5e2e1] transition-colors">Privacy</a>
                        <a href="#" className="hover:text-[#e5e2e1] transition-colors">Terms</a>
                        <a href="#" className="hover:text-[#e5e2e1] transition-colors">Contact</a>
                    </div>
                    <div className="text-[10px] uppercase tracking-widest font-medium text-[#4d4732]">
                        © 2026 SNITCH OPERATIONS. ALL RIGHTS RESERVED.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
