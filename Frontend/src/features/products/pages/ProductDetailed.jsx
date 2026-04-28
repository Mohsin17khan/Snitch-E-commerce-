import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useProduct } from '../hook/useProduct';

/* -- Icon Helpers -- */
const ArrowLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
    </svg>
);

const ShareIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><polyline points="16 6 12 2 8 6" /><line x1="12" y1="2" x2="12" y2="15" />
    </svg>
);

const HeartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
);

const ShieldIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
);

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

const ProductDetailed = () => {
    const { productId } = useParams();
    const { handleGetProductDetail } = useProduct();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState(0);
    const navigate = useNavigate();

    async function fetchDetail() {
        setLoading(true);
        try {
            const data = await handleGetProductDetail(productId);
            setProduct(data);
        } catch (error) {
            console.error("Failed to fetch product details:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchDetail();
    }, [productId]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#131313] flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-[#ffd700]/20 border-t-[#ffd700] rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-[#131313] flex flex-col items-center justify-center text-[#e5e2e1]">
                <h1 className="text-2xl font-bold mb-4 font-['Space_Grotesk']">DATA NOT FOUND</h1>
                <button onClick={() => navigate(-1)} className="text-[#ffd700] uppercase tracking-widest text-xs border-b border-[#ffd700]/30 pb-1">Return to Operations</button>
            </div>
        );
    }

    const currentImage = product.images?.[activeImage]?.url;

    return (
        <div className="min-h-screen bg-[#131313] text-[#e5e2e1] selection:bg-[#ffd700]/30 font-['Inter'] overflow-x-hidden">
            {/* Google Fonts */}
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap"
            />

            {/* Top Navigation Bar */}
            <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-[#131313]/80 border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <button 
                        onClick={() => navigate(-1)}
                        className="p-2 hover:bg-white/5 rounded-full transition-colors group flex items-center gap-3"
                    >
                        <ArrowLeftIcon />
                        <span className="text-[10px] uppercase tracking-[0.2em] font-bold hidden md:block group-hover:text-[#ffd700] transition-colors">Back to Archive</span>
                    </button>
                    
                    <div className="text-xl font-bold tracking-[0.4em] font-['Space_Grotesk'] text-[#ffd700] absolute left-1/2 -translate-x-1/2">
                        SNITCH
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="p-2 hover:bg-white/5 rounded-full transition-colors">
                            <ShareIcon />
                        </button>
                        <button className="p-2 hover:bg-white/5 rounded-full transition-colors">
                            <HeartIcon />
                        </button>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-6 pt-32 pb-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24">
                    
                    {/* Left: Product Imagery */}
                    <div className="flex flex-col gap-6">
                        <div className="relative aspect-[4/5] bg-[#201f1f] rounded-3xl overflow-hidden group">
                            {currentImage ? (
                                <img 
                                    src={currentImage} 
                                    alt={product.title} 
                                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center opacity-10">
                                    <span className="uppercase tracking-[0.5em] text-lg">No Intel Image</span>
                                </div>
                            )}
                            
                            {/* Technical Overlay */}
                            <div className="absolute top-6 left-6 flex flex-col gap-1 pointer-events-none">
                                <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-[#ffd700]/50">Target Identifier</span>
                                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#e5e2e1]">CODE-{product._id.slice(-6).toUpperCase()}</span>
                            </div>
                        </div>

                        {/* Thumbnails */}
                        {product.images?.length > 1 && (
                            <div className="grid grid-cols-4 gap-4">
                                {product.images.map((img, idx) => (
                                    <button 
                                        key={idx}
                                        onClick={() => setActiveImage(idx)}
                                        className={`aspect-square rounded-xl overflow-hidden border-2 transition-all duration-300 ${activeImage === idx ? 'border-[#ffd700]' : 'border-transparent opacity-50 hover:opacity-100'}`}
                                    >
                                        <img src={img.url} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right: Product Intelligence */}
                    <div className="flex flex-col gap-8 py-4">
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-3">
                                <span className="px-3 py-1 bg-[#ffd700]/10 text-[#ffd700] text-[9px] font-bold uppercase tracking-[0.3em] rounded-full flex items-center gap-2">
                                    <ShieldIcon /> Verified Agent Drop
                                </span>
                                <span className="text-[10px] uppercase tracking-[0.3em] text-[#4d4732] font-bold">Category / Apparel</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight font-['Space_Grotesk'] mt-4 leading-tight">
                                {product.title}
                            </h1>
                            <div className="flex items-end gap-3 mt-2">
                                <span className="text-3xl font-bold text-[#ffd700] font-['Space_Grotesk']">
                                    {formatPrice(product.price?.priceAmount, product.price?.priceCurrency)}
                                </span>
                                <span className="text-xs text-[#4d4732] uppercase tracking-widest mb-1.5 font-bold italic">Inc. All Duties</span>
                            </div>
                        </div>

                        <div className="h-px bg-white/5 w-full"></div>

                        <div className="flex flex-col gap-4">
                            <h3 className="text-[11px] uppercase tracking-[0.3em] text-[#ffd700] font-bold">Briefing</h3>
                            <p className="text-[#999077] leading-relaxed font-['Inter'] text-sm md:text-base">
                                {product.description}
                            </p>
                        </div>

                        {/* Tactical Specs Section */}
                        <div className="bg-[#1c1b1b] rounded-2xl p-6 flex flex-col gap-4">
                            <h3 className="text-[10px] uppercase tracking-[0.2em] text-[#e5e2e1] font-bold flex items-center gap-2">
                                <div className="w-1 h-1 bg-[#ffd700] rounded-full animate-pulse"></div> Technical Specifications
                            </h3>
                            <div className="grid grid-cols-2 gap-y-4 text-xs">
                                <div className="flex flex-col gap-1">
                                    <span className="text-[#4d4732] uppercase tracking-widest text-[9px] font-bold">Silhouette</span>
                                    <span className="text-[#d0c6ab]">Surgical Slim-Fit</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-[#4d4732] uppercase tracking-widest text-[9px] font-bold">Material</span>
                                    <span className="text-[#d0c6ab]">Italian Technical Wool</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-[#4d4732] uppercase tracking-widest text-[9px] font-bold">Origin</span>
                                    </div>
                                    <span className="text-[#d0c6ab]">Classified Location</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-[#4d4732] uppercase tracking-widest text-[9px] font-bold">Operations</span>
                                    <span className="text-[#d0c6ab]">Multi-Terrain Adaptable</span>
                                </div>
                            </div>
                        </div>

                        {/* Size Selection Placeholder */}
                        <div className="flex flex-col gap-4 mt-2">
                             <div className="flex justify-between items-center">
                                <h3 className="text-[11px] uppercase tracking-[0.3em] text-[#e5e2e1] font-bold">Select Dimension</h3>
                                <button className="text-[9px] uppercase tracking-widest text-[#ffd700] font-bold border-b border-[#ffd700]/30 hover:border-[#ffd700] transition-colors pb-0.5">Measurement Guide</button>
                             </div>
                             <div className="flex gap-3">
                                {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                                    <button 
                                        key={size}
                                        className={`w-12 h-12 flex items-center justify-center text-[10px] font-bold rounded-xl border transition-all duration-300 ${size === 'M' ? 'bg-[#ffd700] text-black border-[#ffd700]' : 'border-white/10 text-[#999077] hover:border-white/30'}`}
                                    >
                                        {size}
                                    </button>
                                ))}
                             </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 mt-6">
                            <button className="flex-1 px-10 py-5 bg-[#ffd700] text-black font-bold uppercase tracking-widest text-xs rounded-2xl hover:scale-[1.02] transition-all duration-300 shadow-[0_0_40px_rgba(255,215,0,0.15)] flex items-center justify-center gap-3 active:scale-95">
                                Add to Vault
                            </button>
                            <button className="flex-1 px-10 py-5 bg-transparent border border-[#ffd700]/30 text-[#ffd700] font-bold uppercase tracking-widest text-xs rounded-2xl hover:bg-[#ffd700]/5 hover:border-[#ffd700] transition-all duration-300 flex items-center justify-center active:scale-95">
                                Acquire Now
                            </button>
                        </div>

                        {/* Trust Elements */}
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5">
                                <div className="text-[#ffd700]"><ShieldIcon /></div>
                                <div className="flex flex-col">
                                    <span className="text-[9px] font-bold uppercase tracking-widest text-[#e5e2e1]">Secured Intel</span>
                                    <span className="text-[8px] uppercase tracking-widest text-[#4d4732]">256-bit Encrypted</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5">
                                <div className="text-[#ffd700]"><ShareIcon /></div>
                                <div className="flex flex-col">
                                    <span className="text-[9px] font-bold uppercase tracking-widest text-[#e5e2e1]">Rapid Extraction</span>
                                    <span className="text-[8px] uppercase tracking-widest text-[#4d4732]">Global Operations</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </main>

            {/* Aesthetic Detail Decoration */}
            <div className="fixed bottom-12 right-12 hidden xl:block opacity-5 pointer-events-none select-none">
                <div className="text-right flex flex-col gap-1">
                    <span className="text-7xl font-bold tracking-tighter leading-none">INTEL-X</span>
                    <span className="text-xs uppercase tracking-[1em] mr-[-1em]">AUTHENTIC GEAR</span>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailed;

