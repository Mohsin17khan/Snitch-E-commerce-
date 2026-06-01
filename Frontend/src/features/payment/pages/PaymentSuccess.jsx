import React from 'react';
import { Link } from 'react-router';

export default function PaymentSuccess() {
  return (
    <div className="bg-background text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container min-h-[calc(100vh-1px)] flex items-center justify-center p-8">
      <div className="max-w-md w-full bg-surface-container-low rounded-2xl p-10 text-center relative overflow-hidden border border-surface-container-highest shadow-2xl">
        {/* Glow effect */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary-container/10 blur-[80px] rounded-full pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-tertiary-container/10 blur-[80px] rounded-full pointer-events-none"></div>

        {/* Icon */}
        <div className="relative z-10 flex justify-center mb-8">
          <div className="w-20 h-20 rounded-full bg-surface-container-highest flex items-center justify-center shadow-[0_0_20px_rgba(255,215,0,0.2)] border border-primary-container/20">
            <span className="material-symbols-outlined text-5xl text-[#ffd700]" style={{ fontVariationSettings: "'FILL' 1" }}>
              check_circle
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 space-y-2 mb-8">
          <span className="text-primary-container font-headline text-[10px] tracking-[0.5em] uppercase block">
            PROTOCOL: SUCCESS
          </span>
          <h2 className="text-3xl font-headline font-bold tracking-tighter text-on-surface uppercase">
            Transaction Complete
          </h2>
          <p className="text-on-surface-variant text-sm pt-2">
            Your payment has been successfully processed and encrypted in the ledger.
          </p>
        </div>

        {/* Order Details box */}
        <div className="relative z-10 bg-surface-container-lowest p-6 rounded-lg mb-8 border border-outline-variant/30 text-left">
          <div className="flex justify-between items-center mb-4 pb-4 border-b border-surface-container-highest">
            <span className="text-[10px] font-headline font-bold text-on-surface-variant uppercase tracking-widest">Order ID</span>
            <span className="text-sm font-mono text-on-surface">SN-#{Math.floor(Math.random() * 100000) + 900000}</span>
          </div>
          <div className="flex justify-between items-center mb-4 pb-4 border-b border-surface-container-highest">
            <span className="text-[10px] font-headline font-bold text-on-surface-variant uppercase tracking-widest">Date</span>
            <span className="text-sm font-mono text-on-surface">{new Date().toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-headline font-bold text-on-surface-variant uppercase tracking-widest">Status</span>
            <span className="text-xs font-bold uppercase tracking-widest text-[#00f1ff] drop-shadow-[0_0_5px_rgba(0,241,255,0.5)]">Authorized</span>
          </div>
        </div>

        {/* Action */}
        <div className="relative z-10">
          <Link
            to="/"
            className="block w-full bg-[#ffd700] text-on-primary-fixed py-4 font-headline font-black tracking-[0.2em] uppercase text-xs hover:shadow-[0_0_15px_#ffd700] hover:scale-[1.02] active:scale-95 transition-all duration-300 rounded-sm"
          >
            RETURN TO DASHBOARD
          </Link>
        </div>
      </div>
    </div>
  );
}
