import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useProduct } from '../hook/useProduct';
import { useNavigate } from 'react-router';

/* ── icon helpers (inline SVG to avoid extra deps) ─────────────────── */
const EditIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const TrashIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6M14 11v6" />
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
  </svg>
);

const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const PackageIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-10 h-10 opacity-30"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

/* ── currency formatter ─────────────────────────────────────────────── */
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

/* ── ProductCard ────────────────────────────────────────────────────── */
const ProductCard = ({ product, onEdit, onDelete }) => {
  const [imgError, setImgError] = useState(false);
  const imageUrl = product?.images?.[0]?.url;
  const navigate = useNavigate();

  return (
    <div
      className="group relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300 ease-out"
      style={{
        background: '#201f1f',
        boxShadow: '0 8px 48px 0 rgba(0,0,0,0.38)',
      }}
    >
      {/* hover inner glow ring */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"
        style={{ boxShadow: 'inset 0 0 0 1px rgba(255,215,0,0.10)' }}
      />

      {/* ── image ── */}
      <div
        className="w-full overflow-hidden"
        style={{ height: '200px', background: '#131313' }}
      >
        {imageUrl && !imgError ? (
          <img
            src={imageUrl}
            alt={product.title}
            className="w-full h-full cursor-pointer object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2">
            <PackageIcon />
            <span
              className="text-xs tracking-widest uppercase"
              style={{ color: '#4d4732', fontFamily: 'Inter, sans-serif' }}
            >
              No Image
            </span>
          </div>
        )}
      </div>

      {/* ── body ── */}
      <div className="flex flex-col flex-1 gap-3 p-5">
        {/* title */}
        <h3
          className="text-base font-semibold leading-tight tracking-tight truncate"
          style={{
            color: '#e5e2e1',
            fontFamily: "'Space Grotesk', sans-serif",
            letterSpacing: '-0.01em',
          }}
        >
          {product.title}
        </h3>

        {/* description */}
        <p
          className="text-sm leading-relaxed line-clamp-2 flex-1"
          style={{
            color: '#999077',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          {product.description || 'No description provided.'}
        </p>

        {/* price badge */}
        <div className="mt-1">
          <span
            className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold tracking-wide"
            style={{
              background: 'rgba(255,215,0,0.12)',
              color: '#ffd700',
              fontFamily: 'Inter, sans-serif',
              border: '1px solid rgba(255,215,0,0.20)',
            }}
          >
            {formatPrice(product.price?.priceAmount, product.price?.priceCurrency)}
            <span style={{ color: 'rgba(255,215,0,0.55)', fontWeight: 400 }}>
              {product.price?.priceCurrency}
            </span>
          </span>
        </div>

        {/* ── actions ── */}
        <div
          className="flex items-center justify-end gap-2 pt-3"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <button
            id={`edit-${product._id}`}
            onClick={() => onEdit(product)}
            title="Edit product"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200"
            style={{
              color: '#d0c6ab',
              background: 'transparent',
              fontFamily: 'Inter, sans-serif',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(255,215,0,0.08)';
              e.currentTarget.style.color = '#ffd700';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#d0c6ab';
            }}
           >
            <EditIcon />
            Edit
          </button>

          <button
            id={`delete-${product._id}`}
            onClick={() => onDelete(product._id)}
            title="Delete product"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200"
            style={{
              color: '#d0c6ab',
              background: 'transparent',
              fontFamily: 'Inter, sans-serif',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(255,100,100,0.08)';
              e.currentTarget.style.color = '#ffb4ab';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#d0c6ab';
            }}
          >
            <TrashIcon />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

/* ── Dashboard ──────────────────────────────────────────────────────── */
const Dashboard = () => {
  const sellerProducts = useSelector(state => state.product.sellerProducts);
  const { handleGetSellerProduct } = useProduct();
  const navigate = useNavigate();

  useEffect(() => {
    handleGetSellerProduct();
  }, []);

  const handleEdit = product => {
    navigate(`/sellerProductVarient/${product._id}`, { state: { product } });
  };

  const handleDelete = productId => {
    // wire to your delete action when ready
    console.log('Delete:', productId);
  };

  const products = sellerProducts || [];

  return (
    <div
      id="seller-dashboard"
      className="min-h-screen px-6 py-10 md:px-12 lg:px-20"
      style={{ background: '#131313', fontFamily: 'Inter, sans-serif' }}
    >
      {/* Google Fonts */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap"
      />

      {/* ── Header ── */}
      <header className="flex items-center justify-between mb-10">
        <div>
          <p
            className="text-xs uppercase tracking-[0.2em] mb-1"
            style={{ color: '#4d4732', fontFamily: 'Inter, sans-serif' }}
          >
            Seller Portal
          </p>
          <h1
            className="text-3xl font-semibold leading-none tracking-tight"
            style={{
              color: '#e5e2e1',
              fontFamily: "'Space Grotesk', sans-serif",
              letterSpacing: '-0.02em',
            }}
          >
            My Products
          </h1>
        </div>

        <button
          id="add-product-btn"
          onClick={() => navigate('/seller/create')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
          style={{
            background: '#ffd700',
            color: '#221b00',
            fontFamily: "'Space Grotesk', sans-serif",
            boxShadow: '0 0 18px rgba(255,215,0,0.28)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.boxShadow = '0 0 30px rgba(255,215,0,0.45)';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.boxShadow = '0 0 18px rgba(255,215,0,0.28)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
         >
          <PlusIcon />
          Add Product
        </button>
      </header>

      {/* ── Stats row ── */}
      <div className="flex items-center gap-3 mb-8">
        <span
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium"
          style={{
            background: '#201f1f',
            color: '#d0c6ab',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: '#ffd700' }}
          />
          {products.length} {products.length === 1 ? 'Product' : 'Products'}
        </span>
      </div>

      {/* ── Product Grid ── */}
      {products.length === 0 ? (
        /* Empty state */
        <div className="flex flex-col items-center justify-center py-32 gap-5">
          <PackageIcon />
          <div className="text-center">
            <p
              className="text-lg font-medium mb-1"
              style={{
                color: '#e5e2e1',
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              No products yet
            </p>
            <p
              className="text-sm"
              style={{ color: '#4d4732', fontFamily: 'Inter, sans-serif' }}
            >
              Add your first product to get started.
            </p>
          </div>
          <button
            onClick={() => navigate('/products/create')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold mt-2 transition-all duration-200"
            style={{
              background: '#ffd700',
              color: '#221b00',
              fontFamily: "'Space Grotesk', sans-serif",
              boxShadow: '0 0 18px rgba(255,215,0,0.25)',
            }}
          >
            <PlusIcon />
            Add Product
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <ProductCard
              key={product._id}
              product={product}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
