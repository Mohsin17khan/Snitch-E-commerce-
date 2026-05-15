import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useProduct } from "../hook/useProduct";

/* -- Icon Helpers -- */
const ArrowLeftIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const MinusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const TrashIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6M14 11v6" />
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
  </svg>
);

const formatPrice = (amount, currency = "INR") => {
  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${currency} ${amount}`;
  }
};

const SellerProductDetailed = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { handleGetProductDetail, handleProductVarient } = useProduct();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAddingVariant, setIsAddingVariant] = useState(false);

  // Form state for new variant
  const [newVariant, setNewVariant] = useState({
    stock: 0,
    price: { amount: 0, currency: "INR" },
    attributes: {},
    images: [],
  });
  const [attrKey, setAttrKey] = useState("");
  const [attrValue, setAttrValue] = useState("");

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

  const handleAddAttribute = () => {
    if (attrKey && attrValue) {
      setNewVariant((prev) => ({
        ...prev,
        attributes: { ...prev.attributes, [attrKey]: attrValue },
      }));
      setAttrKey("");
      setAttrValue("");
    }
  };

  const handleRemoveAttribute = (key) => {
    const updatedAttrs = { ...newVariant.attributes };
    delete updatedAttrs[key];
    setNewVariant((prev) => ({ ...prev, attributes: updatedAttrs }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (newVariant.images.length + files.length > 7) {
      alert("Maximum 7 images allowed per variant.");
      return;
    }

    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setNewVariant((prev) => ({
      ...prev,
      images: [...prev.images, ...newImages],
    }));
  };

  const handleRemoveImage = (index) => {
    setNewVariant((prev) => {
      const updatedImages = [...prev.images];
      if (updatedImages[index].preview) {
        URL.revokeObjectURL(updatedImages[index].preview);
      }
      updatedImages.splice(index, 1);
      return { ...prev, images: updatedImages };
    });
  };

  const handleCreateVariant = async () => {
      setNewVariant({
      stock: 0,
      price: { amount: 0, currency: "INR" },
      attributes: {},
      images: [],
    });
    setIsAddingVariant(false);
    await handleProductVarient(productId, newVariant);
    await fetchDetail();
    console.log("Creating Variant:", newVariant);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#131313] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#ffd700]/20 border-t-[#ffd700] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product)
    return (
      <div className="min-h-screen bg-[#131313] flex flex-col items-center justify-center text-[#e5e2e1]">
        <h1 className="text-2xl font-bold mb-4 font-['Space_Grotesk']">
          DATA NOT FOUND
        </h1>
        <button
          onClick={() => navigate(-1)}
          className="text-[#ffd700] uppercase tracking-widest text-xs border-b border-[#ffd700]/30 pb-1"
        >
          Return to Operations
        </button>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#131313] text-[#e5e2e1] selection:bg-[#ffd700]/30 font-['Inter'] overflow-x-hidden">
      {/* Google Fonts */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap"
      />

      {/* Header */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-[#131313]/80 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-white/5 rounded-full transition-colors group flex items-center gap-3"
          >
            <ArrowLeftIcon />
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold hidden md:block group-hover:text-[#ffd700] transition-colors">
              Back to Dashboard
            </span>
          </button>
          <div className="text-xl font-bold tracking-[0.4em] font-['Space_Grotesk'] text-[#ffd700] absolute left-1/2 -translate-x-1/2">
            SNITCH{" "}
            <span className="text-[10px] tracking-widest text-[#4d4732] ml-2 uppercase font-medium">
              Ops
            </span>
          </div>
          <div className="w-10"></div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-32 pb-24 flex flex-col gap-12">
        {/* Product Summary Card */}
        <section className="bg-[#1c1b1b] rounded-[32px] p-8 md:p-12 flex flex-col md:flex-row gap-12 items-start shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#ffd700]/5 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="w-full md:w-64 aspect-square rounded-2xl overflow-hidden bg-[#131313] shadow-inner flex-shrink-0">
            {product.images?.[0]?.url ? (
              <img
                src={product.images[0].url}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center opacity-10 uppercase tracking-widest text-xs">
                No Intel Image
              </div>
            )}
          </div>

          <div className="flex flex-col gap-6 flex-1">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#ffd700] font-bold">
                Base Asset Identification
              </span>
              <h1 className="text-4xl font-bold tracking-tight font-['Space_Grotesk'] leading-tight">
                {product.title}
              </h1>
              <span className="text-xs font-mono text-[#4d4732] mt-1">
                ID: {product._id.toUpperCase()}
              </span>
            </div>
            <p className="text-[#999077] leading-relaxed max-w-2xl font-light">
              {product.description}
            </p>
            <div className="flex items-center gap-4">
              <div className="px-5 py-3 bg-[#131313] rounded-2xl border border-white/5 flex flex-col gap-1">
                <span className="text-[9px] uppercase tracking-widest text-[#4d4732] font-bold">
                  Base Price
                </span>
                <span className="text-xl font-bold text-[#ffd700] font-['Space_Grotesk']">
                  {formatPrice(
                    product.price?.priceAmount,
                    product.price?.priceCurrency,
                  )}
                </span>
              </div>
              <div className="px-5 py-3 bg-[#131313] rounded-2xl border border-white/5 flex flex-col gap-1">
                <span className="text-[9px] uppercase tracking-widest text-[#4d4732] font-bold">
                  Total Variants Deployed
                </span>
                <span className="text-xl font-bold text-[#e5e2e1] font-['Space_Grotesk']">
                  {product.variants?.length || 0}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Variants Management Section */}
        <section className="flex flex-col gap-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#4d4732] font-bold">
                Operational Inventory
              </span>
              <h2 className="text-3xl font-bold tracking-tight font-['Space_Grotesk']">
                Variant Ecosystem
              </h2>
            </div>
            <button
              onClick={() => setIsAddingVariant(true)}
              className="flex items-center justify-center gap-3 px-8 py-4 bg-[#ffd700] text-black font-bold uppercase tracking-widest text-[10px] rounded-2xl hover:scale-[1.02] transition-all duration-300 shadow-[0_0_40px_rgba(255,215,0,0.2)] active:scale-95"
            >
              <PlusIcon /> Initialize New Variant
            </button>
          </div>

          {/* Variants List */}
          <div className="flex flex-col gap-4">
            {product.variants && product.variants.length > 0 ? (
              product.variants.map((variant, idx) => (
                <div
                  key={idx}
                  className="bg-[#1c1b1b] p-6 rounded-[24px] flex flex-col md:flex-row items-center justify-between gap-8 group hover:bg-[#201f1f] transition-all duration-300 border border-white/2 hover:border-white/10"
                >
                  <div className="flex items-center gap-6 flex-1 w-full md:w-auto">
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#131313] flex-shrink-0 shadow-lg border border-white/5">
                      {variant.images?.[0]?.url ? (
                        <img
                          src={variant.images[0].url}
                          alt="Variant"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center opacity-10 text-[8px] uppercase tracking-widest text-center px-1">
                          Missing Visualization
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-wrap gap-2">
                        {variant.attributes &&
                          Object.entries(variant.attributes).map(([k, v]) => (
                            <span
                              key={k}
                              className="px-3 py-1 bg-[#131313] text-[#ffd700] text-[9px] font-bold uppercase tracking-[0.2em] rounded-md border border-[#ffd700]/10"
                            >
                              {k}: {v}
                            </span>
                          ))}
                      </div>
                      <span className="text-lg font-bold font-['Space_Grotesk'] text-[#e5e2e1]">
                        {formatPrice(
                          variant.price?.amount,
                          variant.price?.currency,
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-8 md:gap-12 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-white/5 pt-4 md:pt-0">
                    {/* Stock Control */}
                    <div className="flex flex-col items-start md:items-center gap-2">
                      <span className="text-[9px] uppercase tracking-[0.3em] text-[#4d4732] font-bold">
                        Active Stock
                      </span>
                      <div className="flex items-center gap-2 bg-[#131313] rounded-xl p-1 border border-white/5">
                        <button className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white/5 text-[#999077] hover:text-[#ffd700] transition-colors">
                          <MinusIcon />
                        </button>
                        <span className="w-14 text-center text-sm font-bold font-mono text-[#ffd700]">
                          {variant.stock}
                        </span>
                        <button className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white/5 text-[#999077] hover:text-[#ffd700] transition-colors">
                          <PlusIcon />
                        </button>
                      </div>
                    </div>

                    <button className="p-4 bg-white/2 rounded-xl text-[#4d4732] hover:text-red-400 hover:bg-red-400/5 transition-all">
                      <TrashIcon />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-32 border border-dashed border-white/10 rounded-[40px] flex flex-col items-center justify-center gap-6 bg-white/2">
                <div className="w-20 h-20 rounded-full bg-[#131313] flex items-center justify-center text-[#4d4732] shadow-inner">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-10 h-10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                  >
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  </svg>
                </div>
                <div className="text-center">
                  <p className="text-[#e5e2e1] uppercase tracking-[0.5em] text-[10px] font-bold mb-1">
                    No Assets Deployed
                  </p>
                  <p className="text-[#4d4732] text-xs font-light">
                    Initialize variants to start operational inventory.
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Add Variant Sidebar/Modal */}
        {isAddingVariant && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 md:px-6">
            <div
              className="absolute inset-0 bg-[#000]/80 backdrop-blur-md"
              onClick={() => setIsAddingVariant(false)}
            ></div>
            <div className="bg-[#1c1b1b] w-full max-w-2xl rounded-[40px] border border-white/10 p-8 md:p-12 relative shadow-[0_0_150px_rgba(0,0,0,1)] animate-in fade-in zoom-in duration-300">
              <div className="flex flex-col gap-2 mb-10">
                <span className="text-[10px] uppercase tracking-[0.4em] text-[#ffd700] font-bold">
                  New Asset Protocol
                </span>
                <h2 className="text-3xl font-bold tracking-tight font-['Space_Grotesk']">
                  Initialize Variant
                </h2>
              </div>

              <div className="flex flex-col gap-8">
                {/* Price & Stock Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] uppercase tracking-[0.3em] text-[#4d4732] font-bold">
                      Liquidity Value (INR)
                    </label>
                    <input
                      type="number"
                      placeholder="12499"
                      className="bg-[#131313] border border-white/5 rounded-2xl px-6 py-4 text-sm focus:border-[#ffd700]/50 outline-none transition-all placeholder:text-[#333]"
                      value={newVariant.price.amount}
                      onChange={(e) =>
                        setNewVariant({
                          ...newVariant,
                          price: {
                            ...newVariant.price,
                            amount: Number(e.target.value),
                          },
                        })
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] uppercase tracking-[0.3em] text-[#4d4732] font-bold">
                      Stock Allocation
                    </label>
                    <input
                      type="number"
                      placeholder="100"
                      className="bg-[#131313] border border-white/5 rounded-2xl px-6 py-4 text-sm focus:border-[#ffd700]/50 outline-none transition-all placeholder:text-[#333]"
                      value={newVariant.stock}
                      onChange={(e) =>
                        setNewVariant({
                          ...newVariant,
                          stock: Number(e.target.value),
                        })
                      }
                    />
                  </div>
                </div>

                {/* Attributes Section */}
                <div className="flex flex-col gap-4 p-6 bg-[#131313] rounded-3xl border border-white/5">
                  <label className="text-[10px] uppercase tracking-[0.3em] text-[#4d4732] font-bold">
                    Technical Specifications
                  </label>
                  <div className="flex gap-4">
                    <input
                      type="text"
                      placeholder="Attribute Key"
                      className="flex-1 bg-white/2 border border-white/5 rounded-xl px-4 py-3 text-[10px] font-bold uppercase tracking-widest focus:border-[#ffd700]/30 outline-none"
                      value={attrKey}
                      onChange={(e) => setAttrKey(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Value"
                      className="flex-1 bg-white/2 border border-white/5 rounded-xl px-4 py-3 text-[10px] font-bold uppercase tracking-widest focus:border-[#ffd700]/30 outline-none"
                      value={attrValue}
                      onChange={(e) => setAttrValue(e.target.value)}
                    />
                    <button
                      onClick={handleAddAttribute}
                      className="w-12 h-12 bg-[#ffd700]/10 rounded-xl text-[#ffd700] flex items-center justify-center hover:bg-[#ffd700] hover:text-black transition-all"
                    >
                      <PlusIcon />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {Object.entries(newVariant.attributes).map(([k, v]) => (
                      <div
                        key={k}
                        className="flex items-center gap-3 px-3 py-1.5 bg-[#1c1b1b] rounded-xl border border-white/5 group"
                      >
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#ffd700]">
                          {k}: {v}
                        </span>
                        <button
                          onClick={() => handleRemoveAttribute(k)}
                          className="text-[#4d4732] hover:text-red-400 transition-colors"
                        >
                          <TrashIcon />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Image Upload */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] uppercase tracking-[0.3em] text-[#4d4732] font-bold">
                      Visualization Assets (Max 7)
                    </label>
                    <span className="text-[10px] text-[#ffd700] font-bold">
                      {newVariant.images.length} / 7
                    </span>
                  </div>

                  <div className="grid grid-cols-4 gap-4">
                    {newVariant.images.map((img, idx) => (
                      <div
                        key={idx}
                        className="relative aspect-square rounded-xl overflow-hidden bg-[#131313] border border-white/5 group"
                      >
                        <img
                          src={img.preview || img.url}
                          alt={`Preview ${idx}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={() => handleRemoveImage(idx)}
                          className="absolute top-1 right-1 p-1 bg-black/50 hover:bg-red-500/80 rounded-md backdrop-blur-sm text-white transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <TrashIcon />
                        </button>
                      </div>
                    ))}

                    {newVariant.images.length < 7 && (
                      <label className="relative aspect-square rounded-xl border-2 border-dashed border-white/10 hover:border-[#ffd700]/50 bg-[#131313] flex flex-col items-center justify-center cursor-pointer transition-colors group">
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageUpload}
                        />
                        <div className="text-[#4d4732] group-hover:text-[#ffd700] transition-colors">
                          <PlusIcon />
                        </div>
                        <span className="text-[8px] uppercase tracking-widest text-[#4d4732] group-hover:text-[#ffd700] mt-2 font-bold text-center px-2">
                          Upload
                        </span>
                      </label>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-6">
                  <button
                    onClick={() => setIsAddingVariant(false)}
                    className="flex-1 px-8 py-5 bg-transparent border border-white/10 text-[#4d4732] font-bold uppercase tracking-widest text-[10px] rounded-[20px] hover:bg-white/2 transition-all"
                  >
                    Abort Mission
                  </button>
                  <button
                    onClick={handleCreateVariant}
                    className="flex-1 px-8 py-5 bg-[#ffd700] text-black font-bold uppercase tracking-widest text-[10px] rounded-[20px] hover:scale-[1.02] transition-all shadow-[0_0_50px_rgba(255,215,0,0.25)]"
                  >
                    Execute Deployment
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Background Texture */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] select-none z-[-1]">
        <svg width="100%" height="100%">
          <filter id="noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.6"
              numOctaves="3"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>
    </div>
  );
};

export default SellerProductDetailed;
