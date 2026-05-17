import React from 'react'
import { useNavigate } from 'react-router';


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



const Navbar = () => {
const navigate = useNavigate();
  return (
    <div>
           <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-[#131313]/80 border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div
                    onClick={() =>  navigate("/")}
                     className="text-2xl font-bold cursor-pointer tracking-[0.4em]  text-[#ffd700]">
                        SNITCH
                    </div>
                    
                    <div className="hidden md:flex items-center gap-10 text-[11px] uppercase tracking-[0.3em] font-medium text-[#d0c6ab]">
                        <a href="#" className="hover:text-[#ffd700] transition-colors">Intelligence</a>
                        <a href="#" className="hover:text-[#ffd700] transition-colors">Operations</a>
                        <a href="#" className="hover:text-[#ffd700] transition-colors">Archive</a>
                    </div>

                    <div className="flex items-center gap-6">
                        <button className="p-2 hover:bg-white/5 rounded-full text-white cursor-pointer  transition-colors">
                            <SearchIcon />
                        </button>
                        <button
                        onClick={() => navigate("/cart")}
                         className="p-2 hover:bg-white/5 rounded-full text-white cursor-pointer transition-colors relative">
                            <ShoppingCartIcon />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-[#ffd700] rounded-full"></span>
                        </button>
                    </div>
                </div>
            </nav>
      
    </div>
  )
}

export default Navbar
