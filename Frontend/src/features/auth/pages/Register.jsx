import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import ContinuewithGoogle from "../components/ContinuewithGoogle";

export default function Register() {
  const { handleRegister } = useAuth();

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contact: "",
    password: "",
    isSeller: false,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    await handleRegister({
      email: formData .email,
      password: formData.password,
      fullName: formData.fullName,
      contact: formData.contact,
      isSeller: formData.isSeller,
    });
    navigate("/")

  };
  return (
    <div className="bg-background text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container min-h-screen">
      <style>
        {`
          .glow-sm { text-shadow: 0 0 10px rgba(255, 215, 0, 0.4); }
          .material-symbols-outlined {
              font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
          }
          input:-webkit-autofill,
          input:-webkit-autofill:hover, 
          input:-webkit-autofill:focus {
              -webkit-text-fill-color: #fff6df;
              -webkit-box-shadow: 0 0 0px 1000px #0e0e0e inset;
              transition: background-color 5000s ease-in-out 0s;
          }
        `}
      </style>

      <header className="bg-[#131313]/80 backdrop-blur-xl text-[#ffd700] fixed top-0 w-full z-50">
        <nav className="flex justify-between items-center px-8 h-20 w-full">
          <div className="text-2xl font-black tracking-[0.2em] text-[#ffd700] font-['Space_Grotesk'] uppercase">
            SNITCH
          </div>
          <div className="flex gap-8 items-center font-['Space_Grotesk'] tracking-tighter uppercase font-bold text-[13px]">
            <a
              className="text-[#fff6df]/60 hover:text-[#ffd700] transition-colors duration-300"
              href="#"
            >
              EXPLORE
            </a>
            <a
              className="text-[#fff6df]/60 hover:text-[#ffd700] transition-colors duration-300"
              href="#"
            >
              NETWORK
            </a>
            <Link
              className="text-[#ffd700] glow-sm transition-colors duration-300"
              to="/login"
            >
              LOGIN
            </Link>
          </div>
        </nav>
        <div className="bg-gradient-to-b from-[#353534]/20 to-transparent h-px w-full"></div>
      </header>

      <main className="min-h-screen pt-20 flex flex-col md:flex-row overflow-hidden">
        <section className="relative w-full md:w-1/2 lg:w-[60%] h-64 md:h-auto overflow-hidden">
          <img
            alt="Cinematic Noir Detail"
            className="w-full h-full object-cover grayscale brightness-50"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8ynUekdKHWEKYpBSnRZbggQ4mdMNvqIHOIEeHcdALiIsVUS7eFT2Z0UI1ODzY9g2V_57dhLnGeZBMSLLWxeRa-CHO8A6AAvoQNw03W_xfFOEmLKJFbEbrzpPL0BsLhLxjkIi0-XYida_PSt9vXPVRrS6pzqEPe6YfLBqtXGT3L5k0vZ8-74Y2CuwpvF6FcQRRZBuxLzB5uoO0UcTILBkHlc_Z0Aa2VeutDlcmekiiX15vsq1x3VX1S70mqCUXjB97ogYV43nKErfo"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background hidden md:block"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent md:hidden"></div>
          <div className="absolute bottom-12 left-12 max-w-md hidden lg:block">
            <h1 className="font-headline text-5xl font-black tracking-tighter text-primary-container uppercase leading-none mb-4">
              ENTER THE
              <br />
              OBSIDIAN CIPHER
            </h1>
            <p className="font-body text-on-surface-variant text-sm tracking-widest uppercase opacity-60">
              ACCESS TO THE CLANDESTINE NETWORK REQUIRES MANDATORY PROTOCOL
              ENCRYPTION.
            </p>
          </div>
        </section>

        <section className="w-full md:w-1/2 lg:w-[40%] flex items-center justify-center p-8 md:p-16 lg:p-24">
          <div className="w-full max-w-md">
            <div className="mb-10">
              <span className="text-primary-container font-headline text-[10px] tracking-[0.5em] uppercase mb-2 block">
                PROTOCOL: NEW_IDENTITY
              </span>
              <h2 className="text-4xl font-headline font-bold tracking-tighter text-on-surface uppercase mb-2">
                Registration
              </h2>
              <p className="text-on-surface-variant font-body text-sm">
                Secure your credentials to access the internal dashboard.
              </p>
            </div>

            <form className="space-y-6" onSubmit={onSubmit}>
              <div className="group">
                <label
                  className="block text-[10px] font-headline font-bold text-on-surface-variant uppercase tracking-widest mb-2 group-focus-within:text-primary-container transition-colors"
                  htmlFor="fullname"
                >
                  Full Name
                </label>
                <div className="relative">
                  <input
                    className="w-full bg-surface-container-lowest border-none font-headline text-sm tracking-tight text-on-surface p-4 focus:ring-0 focus:outline-none transition-all placeholder:text-[#353534]"
                    id="fullName"
                    name="fullName"
                    placeholder="AGENT NAME"
                    type="text"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                  <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-primary-container group-focus-within:w-full transition-all duration-500 shadow-[0_0_8px_#ffd700]"></div>
                </div>
              </div>

              <div className="group">
                <label
                  className="block text-[10px] font-headline font-bold text-on-surface-variant uppercase tracking-widest mb-2 group-focus-within:text-primary-container transition-colors"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <div className="relative">
                  <input
                    className="w-full bg-surface-container-lowest border-none font-headline text-sm tracking-tight text-on-surface p-4 focus:ring-0 focus:outline-none transition-all placeholder:text-[#353534]"
                    id="email"
                    name="email"
                    placeholder="CIPHER@SNITCH.INTEL"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-primary-container group-focus-within:w-full transition-all duration-500 shadow-[0_0_8px_#ffd700]"></div>
                </div>
              </div>

              <div className="group">
                <label
                  className="block text-[10px] font-headline font-bold text-on-surface-variant uppercase tracking-widest mb-2 group-focus-within:text-primary-container transition-colors"
                  htmlFor="contact"
                >
                  Contact Number
                </label>
                <div className="relative">
                  <input
                    className="w-full bg-surface-container-lowest border-none font-headline text-sm tracking-tight text-on-surface p-4 focus:ring-0 focus:outline-none transition-all placeholder:text-[#353534]"
                    id="contact"
                    name="contact"
                    placeholder="e.g. +1 555-0198"
                    type="tel"
                    value={formData.contact}
                    onChange={handleChange}
                    required
                  />
                  <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-primary-container group-focus-within:w-full transition-all duration-500 shadow-[0_0_8px_#ffd700]"></div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group">
                  <label
                    className="block text-[10px] font-headline font-bold text-on-surface-variant uppercase tracking-widest mb-2 group-focus-within:text-primary-container transition-colors"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      className="w-full bg-surface-container-lowest border-none font-headline text-sm tracking-tight text-on-surface p-4 focus:ring-0 focus:outline-none transition-all placeholder:text-[#353534]"
                      id="password"
                      name="password"
                      placeholder="********"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-primary-container group-focus-within:w-full transition-all duration-500 shadow-[0_0_8px_#ffd700]"></div>
                  </div>
                </div>
              </div>

              <div className="group pt-2 pb-2 flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer text-on-surface hover:text-[#ffd700] transition-colors">
                  <input
                    type="checkbox"
                    name="isSeller"
                    checked={formData.isSeller} // ✅ direct binding
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        isSeller: e.target.checked, // ✅ true / false
                      })
                    }
                    className="w-4 h-4 accent-yellow-500 cursor-pointer"
                  />

                  <span className="text-sm font-headline tracking-tighter font-bold whitespace-nowrap ">
                    Register as a Seller
                  </span>
                </label>
               <ContinuewithGoogle/>
              </div>

              <div className="pt-4">
                <button
                  className="w-full bg-[#ffd700] text-on-primary-fixed py-5 font-headline font-black tracking-[0.2em] uppercase text-sm hover:shadow-[0_0_15px_#ffd700] hover:scale-[1.02] active:scale-95 transition-all duration-300"
                  type="submit"
                >
                  CREATE ACCOUNT
                </button>
              </div>

              <div className="text-center pt-6">
                <p className="text-[10px] font-headline tracking-widest text-on-surface-variant uppercase">
                  ALREADY HAVE AN ACCOUNT?
                  <Link
                    className="text-[#ffd700] hover:glow-sm transition-all ml-2 border-b border-[#ffd700]/20 pb-0.5"
                    to="/login"
                  >
                    LOGIN
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer className="bg-[#131313] w-full py-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-10 gap-6">
          <div className="font-['Inter'] text-[10px] uppercase tracking-[0.3em] text-[#353534] opacity-80 hover:opacity-100">
            © 2024 SNITCH INTEL. CLANDESTINE OPERATIONS DIVISION.
          </div>
          <div className="flex gap-8 font-['Inter'] text-[10px] uppercase tracking-[0.3em]">
            <a
              className="text-[#353534] hover:text-[#fff6df] transition-all"
              href="#"
            >
              SYSTEM STATUS
            </a>
            <a
              className="text-[#353534] hover:text-[#fff6df] transition-all"
              href="#"
            >
              PROTOCOL
            </a>
            <a
              className="text-[#353534] hover:text-[#fff6df] transition-all"
              href="#"
            >
              ENCRYPTION
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
