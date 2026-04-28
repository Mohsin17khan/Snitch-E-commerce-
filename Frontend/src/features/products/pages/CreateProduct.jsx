import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { useProduct } from '../hook/useProduct';

const MAX_IMAGES = 7;

export default function CreateProduct() {
  const navigate = useNavigate();
  const { handleCreateProduct } = useProduct();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priceAmount: '',
    priceCurrency: 'USD',
  });

  const [images, setImages] = useState([]); // Array of { file, preview }
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  /* ─── Two-way binding for text fields ─── */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* ─── Image handling ─── */
  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    const remaining = MAX_IMAGES - images.length;
    const toAdd = files.slice(0, remaining).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...toAdd]);
    // Reset so the same file can be picked again if needed
    e.target.value = '';
  };

  const handleRemoveImage = (index) => {
    setImages((prev) => {
      URL.revokeObjectURL(prev[index].preview);
      return prev.filter((_, i) => i !== index);
    });
  };

  /* ─── Submit ─── */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert('Title is required.');
      return;
    }
    if (!formData.priceAmount || isNaN(formData.priceAmount)) {
      alert('A valid price is required.');
      return;
    }

    setIsSubmitting(true);
    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('priceAmount', formData.priceAmount);
      data.append('priceCurrency', formData.priceCurrency);
      images.forEach(({ file }) => data.append('images', file));

      await handleCreateProduct(data);
      navigate('/seller/dashboard');
    } catch (err) {
      console.error(err);
      alert('Failed to publish listing. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ─── Helpers ─── */
  const inputBase =
    'w-full bg-[#0e0e0e] border-0 border-b-2 py-4 px-0 text-[#e5e2e1] placeholder:text-[#d0c6ab]/30 focus:outline-none transition-all duration-300 font-[Inter] text-sm';

  const inputFocused = (field) =>
    focusedField === field
      ? 'border-[#ffd700] shadow-[0_2px_8px_rgba(255,215,0,0.25)]'
      : 'border-[#4d4732]/30';

  const sectionLabel =
    'text-[10px] font-bold uppercase tracking-[0.25em] text-[#ffd700] font-[Inter] mb-6 block';

  const fieldLabel =
    'block text-[10px] font-bold uppercase tracking-widest text-[#d0c6ab] font-[Inter] mb-2';

  return (
    <div className="min-h-screen bg-[#131313] text-[#e5e2e1] font-[Inter] selection:bg-[#ffd700] selection:text-[#221b00]">

      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .image-slot:hover .remove-btn { opacity: 1; }
      `}</style>

      {/* ── Top App Bar ── */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center gap-4 px-6 py-5 bg-gradient-to-b from-[#131313] via-[#131313]/90 to-transparent">
        <button
          id="btn-back"
          onClick={() => navigate(-1)}
          className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-[#1c1b1b] transition-colors"
          aria-label="Go back"
        >
          <span className="material-symbols-outlined text-[#d0c6ab] text-xl"> X</span>
        </button>
        <h1
          className="text-base font-bold uppercase tracking-[0.25em] text-[#ffd700] drop-shadow-[0_0_8px_rgba(255,215,0,0.25)]"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          New Listing
        </h1>
      </header>

      {/* ── Scrollable Body ── */}
      <main className="pt-24 pb-36 px-6 max-w-lg mx-auto">
        <form id="create-product-form" onSubmit={handleSubmit} noValidate>

          {/* ── PRODUCT DETAILS ── */}
          <section className="mb-10">
            <span className={sectionLabel}>Product Details</span>

            {/* Title */}
            <div className="mb-8 group">
              <label htmlFor="field-title" className={fieldLabel}>Title</label>
              <input
                id="field-title"
                name="title"
                type="text"
                placeholder="e.g. Vintage Leather Jacket"
                value={formData.title}
                onChange={handleChange}
                onFocus={() => setFocusedField('title')}
                onBlur={() => setFocusedField(null)}
                className={`${inputBase} ${inputFocused('title')}`}
                required
              />
            </div>

            {/* Description */}
            <div className="mb-2 group">
              <label htmlFor="field-description" className={fieldLabel}>Description</label>
              <textarea
                id="field-description"
                name="description"
                rows={4}
                placeholder="Describe your item — material, condition, story…"
                value={formData.description}
                onChange={handleChange}
                onFocus={() => setFocusedField('description')}
                onBlur={() => setFocusedField(null)}
                className={`${inputBase} resize-none ${inputFocused('description')}`}
              />
            </div>
          </section>

          {/* ── PRICING ── */}
          <section className="mb-10 bg-[#1c1b1b] -mx-6 px-6 py-8">
            <span className={sectionLabel}>Pricing</span>

            <div className="flex gap-4">
              {/* Price Amount */}
              <div className="flex-1">
                <label htmlFor="field-priceAmount" className={fieldLabel}>Price</label>
                <input
                  id="field-priceAmount"
                  name="priceAmount"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.priceAmount}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('priceAmount')}
                  onBlur={() => setFocusedField(null)}
                  className={`${inputBase} ${inputFocused('priceAmount')}`}
                  required
                />
              </div>

              {/* Price Currency */}
              <div className="w-28">
                <label htmlFor="field-priceCurrency" className={fieldLabel}>Currency</label>
                <input
                  id="field-priceCurrency"
                  name="priceCurrency"
                  type="text"
                  maxLength={5}
                  placeholder="USD"
                  value={formData.priceCurrency}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('priceCurrency')}
                  onBlur={() => setFocusedField(null)}
                  className={`${inputBase} ${inputFocused('priceCurrency')} uppercase`}
                />
              </div>
            </div>
          </section>

          {/* ── PRODUCT IMAGES ── */}
          <section className="mb-10">
            <span className={sectionLabel}>Product Images</span>

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              id="field-images"
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleImageSelect}
            />

            {/* Image Grid */}
            <div className="grid grid-cols-3 gap-3">

              {/* Existing image previews */}
              {images.map((img, i) => (
                <div
                  key={i}
                  className="image-slot relative aspect-square rounded-sm overflow-hidden bg-[#1c1b1b]"
                >
                  <img
                    src={img.preview}
                    alt={`Product image ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {/* Remove overlay */}
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(i)}
                    className="remove-btn absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity duration-200"
                    aria-label={`Remove image ${i + 1}`}
                  >
                    <span className="material-symbols-outlined text-[#ffb4ab] text-2xl">close</span>
                  </button>
                  {/* Index badge */}
                  <span className="absolute top-1.5 left-1.5 text-[9px] font-bold bg-[#131313]/80 text-[#d0c6ab] px-1.5 py-0.5 rounded-sm font-[Inter] uppercase tracking-wider">
                    {i + 1}
                  </span>
                </div>
              ))}

              {/* Add slot — visible only when under 7 images */}
              {images.length < MAX_IMAGES && (
                <button
                  type="button"
                  id="btn-add-image"
                  onClick={() => fileInputRef.current?.click()}
                  className="aspect-square flex flex-col items-center justify-center gap-1.5 border border-dashed border-[#4d4732]/60 rounded-sm bg-[#0e0e0e] hover:border-[#ffd700]/50 hover:bg-[#1c1b1b] transition-all duration-200 group"
                  aria-label="Add image"
                >
                  <span className="material-symbols-outlined text-[#4d4732] group-hover:text-[#ffd700] text-2xl transition-colors">
                    add_photo_alternate
                  </span>
                  <span className="text-[9px] uppercase tracking-widest text-[#4d4732] group-hover:text-[#d0c6ab] font-[Inter] transition-colors">
                    Add
                  </span>
                </button>
              )}

              {/* Empty placeholder slots to maintain grid shape */}
              {Array.from({ length: Math.max(0, MAX_IMAGES - images.length - 1) }).map((_, i) => (
                <div
                  key={`empty-${i}`}
                  className="aspect-square flex items-center justify-center bg-[#0e0e0e] rounded-sm"
                >
                  <span className="material-symbols-outlined text-[#2a2a2a] text-xl">photo_camera</span>
                </div>
              ))}
            </div>

            <p className="mt-3 text-[10px] uppercase tracking-widest text-[#d0c6ab]/40 font-[Inter]">
              Up to {MAX_IMAGES} images · {images.length}/{MAX_IMAGES} selected
            </p>
          </section>

        </form>
      </main>

      {/* ── Sticky Submit Button ── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 px-6 py-5 bg-gradient-to-t from-[#131313] via-[#131313]/95 to-transparent">
        <button
          id="btn-publish"
          type="submit"
          form="create-product-form"
          disabled={isSubmitting}
          className="w-full max-w-lg mx-auto block bg-[#ffd700] text-[#3a3000] font-bold uppercase tracking-[0.2em] py-5 rounded-sm hover:shadow-[0_0_24px_rgba(255,215,0,0.4)] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {isSubmitting ? 'Publishing…' : 'Publish Listing'}
        </button>
      </div>

    </div>
  );
}
