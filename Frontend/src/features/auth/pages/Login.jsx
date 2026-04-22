import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import ContinuewithGoogle from '../components/ContinuewithGoogle';

export default function Login() {

  const { handleLogin } = useAuth();
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData, 
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("All fields are required");
      return;
    }

   await handleLogin({
    email: formData.email,
    password: formData.password 
   });
   navigate("/")
  };

  
  return (
    <div className="bg-background text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container min-h-screen">
      <style>
        {`
          .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
          }
          .cinematic-gradient {
            background: linear-gradient(180deg, rgba(19, 19, 19, 0) 0%, rgba(19, 19, 19, 0.8) 70%, rgba(19, 19, 19, 1) 100%);
          }
        `}
      </style>

      {/* TopAppBar Fragment */}
      <header className="bg-[#131313] flex justify-between items-center w-full px-8 py-6 max-w-full fixed top-0 z-50 bg-gradient-to-b from-[#131313] to-transparent">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#ffd700]" style={{ fontVariationSettings: "'FILL' 1" }}>
            security
          </span>
          <h1 className="text-2xl font-bold tracking-widest text-[#ffd700] drop-shadow-[0_0_10px_rgba(255,215,0,0.3)] font-['Space_Grotesk'] tracking-tighter uppercase">
            SNITCH
          </h1>
        </div>
      </header>

      <main className="min-h-screen flex flex-col relative overflow-hidden">
        {/* Hero Section */}
        <section className="relative h-[397px] w-full shrink-0 overflow-hidden">
          <img
            alt="Intel visual"
            className="absolute inset-0 w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAgmZItz9z3--nQFBhLuQQpB9UF38Gu_y-JQAOdm-XHLMM3dIIlciJ0_bUJb_ETsPAFd7goM0YCBU0ElPfLuDaokpmxbO43weUWO9dUOJtghg8hrUA5xu_2LDltYCLN9LU4C7xO4R5AYWv5aZBT6fs006CBPtFSHgF8hTKTHZ8ngG6osy9NRh1otPueyaGksxhPJ-4I_QcB0JYGD6FT7Q_n7q9HR82o5dQwSXV8zqei_CwdEHugz4gs-W1ftFLiCTFy7TqeWHydBXv"
          />
          <div className="absolute inset-0 cinematic-gradient"></div>
          <div className="absolute bottom-8 px-8 w-full">
            <p className="font-headline text-[#ffd700] text-xs uppercase tracking-[0.3em] mb-2">Authenticated Entry</p>
            <h2 className="font-headline text-4xl font-bold tracking-tighter text-on-surface">SYSTEM LOGIN</h2>
          </div>
        </section>

        {/* Login Form Section */}
        <section className="flex-1 bg-background px-8 pt-4 pb-12 relative z-10 -mt-4 rounded-t-[2rem]">
          <div className="max-w-md mx-auto">
            <div className="space-y-6">
              {/* Email Input */}

            <form className='flex flex-col gap-6' onSubmit={onSubmit} >
              <div className="space-y-2 group">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant px-1">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    className="w-full bg-surface-container-lowest border-0 border-b-2 border-outline-variant/30 py-4 px-4 text-on-surface placeholder:text-on-surface-variant/40 focus:ring-0 focus:border-primary-container transition-all duration-300"
                    placeholder="agent@snitch.intel"
                    type="email"
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant/20 group-focus-within:text-primary-container">
                    alternate_email
                  </span>
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2 group">
                <div className="flex justify-between items-end px-1">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                    Password
                  </label>
                  <a className="text-[10px] font-bold uppercase tracking-widest text-primary-container hover:text-primary transition-colors" href="#">
                    Forgot Password?
                  </a>
                </div>
                <div className="relative">
                  <input
                    className="w-full bg-surface-container-lowest border-0 border-b-2 border-outline-variant/30 py-4 px-4 text-on-surface placeholder:text-on-surface-variant/40 focus:ring-0 focus:border-primary-container transition-all duration-300"
                    placeholder="••••••••••••"
                    type="password"
                    name='password'
                    value={formData.password}
                    onChange={handleChange}
                    required    
                  />
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant/20 group-focus-within:text-primary-container">
                    lock
                  </span>
                </div>
              </div>

              {/* Primary CTA */}
              <div className="pt-4">
                <button className="w-full bg-primary-container text-on-primary-container font-headline font-bold uppercase tracking-[0.2em] py-5 rounded-sm hover:shadow-[0_0_20px_rgba(255,215,0,0.4)] active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 group">
                  Sign In
                </button>
              </div>
              <ContinuewithGoogle  />
            </form>  


              {/* Secondary Options */}
              <div className="flex flex-col items-center gap-4 pt-4">
                <div className="flex items-center gap-4 w-full">
                  <div className="h-[1px] flex-1 bg-surface-container-highest"></div>
                  <span className="text-[10px] uppercase tracking-widest text-on-surface-variant/40">
                    External Protocols
                  </span>
                  <div className="h-[1px] flex-1 bg-surface-container-highest"></div>
                </div>
                <div className="flex gap-4 w-full">
                  <button className="flex-1 border border-outline-variant/20 py-3 flex items-center justify-center gap-2 hover:bg-surface-container-low transition-colors">
                    <span className="material-symbols-outlined text-sm">fingerprint</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest">Biometric</span>
                  </button>
                  <button className="flex-1 border border-outline-variant/20 py-3 flex items-center justify-center gap-2 hover:bg-surface-container-low transition-colors">
                    <span className="material-symbols-outlined text-sm">key</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest">Passkey</span>
                  </button>
                </div>
              </div>

              <div className="text-center pt-8">
                <p className="text-[11px] text-on-surface-variant/60 uppercase tracking-widest">
                  Don't have an account?
                  <Link className="text-[#ffd700] font-bold ml-1 hover:underline underline-offset-4" to="/register">
                    Register
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Decorative Elements */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary-container/5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary-container/20 to-transparent"></div>
      </main>

      {/* Footer Component */}
      <footer className="bg-transparent text-[#ffd700] font-['Inter'] text-[10px] uppercase tracking-[0.2em] fixed bottom-0 w-full flex flex-row justify-between items-center px-12 py-8 z-20 pointer-events-none">
        <div className="pointer-events-auto opacity-60 hover:opacity-100 transition-opacity">
          © 2024 SNITCH INTEL. ALL RIGHTS RESERVED.
        </div>
        <div className="flex gap-6 pointer-events-auto">
          <a className="text-[#fff6df]/40 hover:text-[#ffd700] transition-colors" href="#">
            Privacy
          </a>
          <a className="text-[#fff6df]/40 hover:text-[#ffd700] transition-colors" href="#">
            Terms
          </a>
        </div>
      </footer>
    </div>
  );
}


// import React, { useState } from 'react';
// import { Link } from 'react-router';
// import { useAuth } from '../hooks/useAuth';

// export default function Login() {


//   return (
//     <div className="bg-background text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container min-h-screen">
      
//       <style>
//         {`
//           .material-symbols-outlined {
//             font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
//           }
//           .cinematic-gradient {
//             background: linear-gradient(180deg, rgba(19, 19, 19, 0) 0%, rgba(19, 19, 19, 0.8) 70%, rgba(19, 19, 19, 1) 100%);
//           }
//         `}
//       </style>

//       {/* Header */}
//       <header className="bg-[#131313] flex justify-between items-center w-full px-8 py-6 fixed top-0 z-50 bg-gradient-to-b from-[#131313] to-transparent">
//         <div className="flex items-center gap-2">
//           <span className="material-symbols-outlined text-[#ffd700]" style={{ fontVariationSettings: "'FILL' 1" }}>
//             security
//           </span>
//           <h1 className="text-2xl font-bold tracking-widest text-[#ffd700] uppercase">
//             SNITCH
//           </h1>
//         </div>
//       </header>

//       <main className="min-h-screen flex flex-col relative overflow-hidden">

//         {/* Hero */}
//         <section className="relative h-[397px] w-full overflow-hidden">
//           <img
//             alt="Intel visual"
//             className="absolute inset-0 w-full h-full object-cover"
//             src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAgmZItz9z3--nQFBhLuQQpB9UF38Gu_y-JQAOdm-XHLMM3dIIlciJ0_bUJb_ETsPAFd7goM0YCBU0ElPfLuDaokpmxbO43weUWO9dUOJtghg8hrUA5xu_2LDltYCLN9LU4C7xO4R5AYWv5aZBT6fs006CBPtFSHgF8hTKTHZ8ngG6osy9NRh1otPueyaGksxhPJ-4I_QcB0JYGD6FT7Q_n7q9HR82o5dQwSXV8zqei_CwdEHugz4gs-W1ftFLiCTFy7TqeWHydBXv"
//           />
//           <div className="absolute inset-0 cinematic-gradient"></div>
//           <div className="absolute bottom-8 px-8 w-full">
//             <p className="text-[#ffd700] text-xs uppercase tracking-[0.3em] mb-2">Authenticated Entry</p>
//             <h2 className="text-4xl font-bold text-white">SYSTEM LOGIN</h2>
//           </div>
//         </section>

//         {/* FORM SECTION */}
//         <section className="flex-1 bg-background px-8 pt-4 pb-12 relative z-10 -mt-4 rounded-t-[2rem]">
//           <div className="max-w-md mx-auto">

//             {/* ✅ FORM START */}
//             <form onSubmit={onSubmit} className="space-y-6">

//               {/* Email */}
//               <div className="space-y-2 group">
//                 <label className="text-[10px] font-bold uppercase tracking-widest">
//                   Email Address
//                 </label>
//                 <div className="relative">
//                   <input
//                     name="email"
//                     type="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     placeholder="agent@snitch.intel"
//                     className="w-full border-b-2 py-4 px-4 bg-transparent"
//                   />
//                 </div>
//               </div>

//               {/* Password */}
//               <div className="space-y-2 group">
//                 <label className="text-[10px] font-bold uppercase tracking-widest">
//                   Password
//                 </label>
//                 <div className="relative">
//                   <input
//                     name="password"
//                     type="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     placeholder="••••••••"
//                     className="w-full border-b-2 py-4 px-4 bg-transparent"
//                   />
//                 </div>
//               </div>

//               {/* Button */}
//               <div className="pt-4">
//                 <button
//                   type="submit"
//                   className="w-full bg-yellow-500 text-black py-4 font-bold uppercase"
//                 >
//                   Sign In
//                 </button>
//               </div>

//             </form>
//             {/* ✅ FORM END */}

//             <div className="text-center pt-6">
//               <p className="text-sm">
//                 Don't have an account?
//                 <Link to="/register" className="text-yellow-500 ml-1">
//                   Register
//                 </Link>
//               </p>
//             </div>

//           </div>
//         </section>

//       </main>
//     </div>
//   );
// }