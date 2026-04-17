// src/pages/dashboard/AddListing.jsx
import { useState, useRef } from "react";
import {
  Upload, X, MapPin, Home, DollarSign, FileText,
  ChevronRight, CheckCircle, Image, Video, AlertTriangle
} from "lucide-react";

const PROPERTY_TYPES = ["House", "Flat / Apartment", "Duplex", "Bungalow", "Land", "Commercial"];
const LISTING_TYPES  = ["For Rent", "For Sale"];
const STATES         = ["Lagos", "Abuja (FCT)", "Oyo", "Rivers", "Kano", "Ogun", "Enugu", "Delta", "Anambra", "Kaduna"];

const Field = ({ label, required, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-bold text-[#6B7280] uppercase tracking-wide">
      {label} {required && <span className="text-red-400">*</span>}
    </label>
    {children}
  </div>
);

const inputCls = "w-full border border-[#E0D9CF] rounded-xl px-4 py-3 text-sm text-[#0A1628] focus:outline-none focus:border-[#C9A84C] transition placeholder:text-[#9CA3AF]";

const AddListing = ({ onBack }) => {
  const imageRef = useRef();
  const videoRef = useRef();

  const [step,       setStep]       = useState(1); // 1=details, 2=media, 3=review, 4=submitted
  const [images,     setImages]     = useState([]);
  const [video,      setVideo]      = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    title:       "",
    type:        "",
    listingType: "",
    price:       "",
    state:       "",
    address:     "",
    beds:        "",
    baths:       "",
    size:        "",
    description: "",
  });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleImages = (e) => {
    const files = Array.from(e.target.files).slice(0, 5);
    const previews = files.map(f => ({ file: f, url: URL.createObjectURL(f), name: f.name }));
    setImages(prev => [...prev, ...previews].slice(0, 5));
  };

  const handleVideo = (e) => {
    const file = e.target.files[0];
    if (file) setVideo({ file, url: URL.createObjectURL(file), name: file.name });
  };

  const removeImage = (idx) => setImages(prev => prev.filter((_, i) => i !== idx));

  const step1Valid = form.title && form.type && form.listingType && form.price && form.state && form.address;
  const step2Valid = images.length > 0;

  const handleSubmit = async () => {
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1800)); // simulate API call
    setSubmitting(false);
    setStep(4);
  };

  // ── Step indicators ──────────────────────────────────────────────────────
  const STEPS = [
    { n: 1, label: "Details"  },
    { n: 2, label: "Media"    },
    { n: 3, label: "Review"   },
  ];

  if (step === 4) return (
    <div className="flex flex-col items-center justify-center py-20 text-center gap-5 max-w-md mx-auto">
      <div className="w-20 h-20 rounded-full bg-[#E8D5A3]/40 border-2 border-[#C9A84C]/30 flex items-center justify-center">
        <CheckCircle size={40} className="text-[#C9A84C]" />
      </div>
      <div>
        <h2 className="text-xl font-bold text-[#0A1628]">Listing Submitted!</h2>
        <p className="text-[#6B7280] text-sm mt-2 leading-relaxed">
          Your listing is now under review by our admin team. We'll notify you once it's approved — usually within 24 hours.
        </p>
      </div>
      <div className="bg-[#F7F4EF] border border-[#E0D9CF] rounded-2xl p-4 w-full text-left flex flex-col gap-2">
        <p className="text-xs font-bold text-[#6B7280] uppercase tracking-wide">What happens next?</p>
        {[
          "Admin reviews your listing for community guidelines",
          "You get notified by email once approved",
          "Listing goes live and buyers can view it",
        ].map((s, i) => (
          <div key={i} className="flex items-start gap-2 text-sm text-[#0A1628]">
            <span className="w-5 h-5 rounded-full bg-[#0A1628] text-[#C9A84C] text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i+1}</span>
            {s}
          </div>
        ))}
      </div>
      <div className="flex gap-3 w-full">
        <button onClick={onBack}
          className="flex-1 border border-[#E0D9CF] hover:border-[#C9A84C]/40 text-[#0A1628] font-semibold py-3 rounded-xl text-sm transition">
          Back to Listings
        </button>
        <button onClick={() => { setStep(1); setForm({ title:"",type:"",listingType:"",price:"",state:"",address:"",beds:"",baths:"",size:"",description:"" }); setImages([]); setVideo(null); }}
          className="flex-1 bg-[#C9A84C] hover:bg-[#b8943d] text-[#0A1628] font-bold py-3 rounded-xl text-sm transition">
          Add Another
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-6 max-w-3xl">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#0A1628]">Add New Listing</h1>
          <p className="text-sm text-[#6B7280]">Fill in the details and upload media for your property</p>
        </div>
      </div>

      {/* Step progress */}
      <div className="flex items-center gap-2">
        {STEPS.map(({ n, label }, idx) => (
          <div key={n} className="flex items-center gap-2 flex-1">
            <div className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-colors
                ${step > n ? "bg-green-500 text-white" : step === n ? "bg-[#C9A84C] text-[#0A1628]" : "bg-[#E0D9CF] text-[#6B7280]"}`}>
                {step > n ? <CheckCircle size={14} /> : n}
              </div>
              <span className={`text-xs font-semibold hidden sm:block ${step === n ? "text-[#0A1628]" : "text-[#6B7280]"}`}>{label}</span>
            </div>
            {idx < STEPS.length - 1 && (
              <div className="flex-1 h-px bg-[#E0D9CF] mx-2">
                <div className={`h-full bg-[#C9A84C] transition-all duration-300 ${step > n ? "w-full" : "w-0"}`} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ── Step 1: Property Details ── */}
      {step === 1 && (
        <div className="bg-white rounded-2xl border border-[#E0D9CF] p-6 flex flex-col gap-5">
          <h2 className="font-bold text-[#0A1628] flex items-center gap-2"><FileText size={16} className="text-[#C9A84C]" /> Property Details</h2>

          <Field label="Listing Title" required>
            <input value={form.title} onChange={e => set("title", e.target.value)}
              placeholder="e.g. Spacious 3 Bedroom Flat in Lekki" className={inputCls} />
          </Field>

          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Property Type" required>
              <select value={form.type} onChange={e => set("type", e.target.value)} className={inputCls}>
                <option value="">Select type</option>
                {PROPERTY_TYPES.map(t => <option key={t}>{t}</option>)}
              </select>
            </Field>
            <Field label="Listing Type" required>
              <select value={form.listingType} onChange={e => set("listingType", e.target.value)} className={inputCls}>
                <option value="">For rent or sale?</option>
                {LISTING_TYPES.map(t => <option key={t}>{t}</option>)}
              </select>
            </Field>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Price (₦)" required>
              <div className="relative">
                <DollarSign size={14} className="absolute left-3 top-3.5 text-[#6B7280]" />
                <input value={form.price} onChange={e => set("price", e.target.value)}
                  placeholder="e.g. 2500000" className={`${inputCls} pl-9`} />
              </div>
            </Field>
            <Field label="State" required>
              <select value={form.state} onChange={e => set("state", e.target.value)} className={inputCls}>
                <option value="">Select state</option>
                {STATES.map(s => <option key={s}>{s}</option>)}
              </select>
            </Field>
          </div>

          <Field label="Full Address" required>
            <div className="relative">
              <MapPin size={14} className="absolute left-3 top-3.5 text-[#6B7280]" />
              <input value={form.address} onChange={e => set("address", e.target.value)}
                placeholder="e.g. 12 Admiralty Way, Lekki Phase 1" className={`${inputCls} pl-9`} />
            </div>
          </Field>

          {form.type !== "Land" && (
            <div className="grid grid-cols-3 gap-4">
              <Field label="Bedrooms">
                <input type="number" min={0} value={form.beds} onChange={e => set("beds", e.target.value)}
                  placeholder="0" className={inputCls} />
              </Field>
              <Field label="Bathrooms">
                <input type="number" min={0} value={form.baths} onChange={e => set("baths", e.target.value)}
                  placeholder="0" className={inputCls} />
              </Field>
              <Field label="Size (sqm)">
                <input type="number" min={0} value={form.size} onChange={e => set("size", e.target.value)}
                  placeholder="0" className={inputCls} />
              </Field>
            </div>
          )}

          <Field label="Description">
            <textarea value={form.description} onChange={e => set("description", e.target.value)}
              placeholder="Describe the property — features, nearby landmarks, access roads..."
              rows={4} className={`${inputCls} resize-none`} />
          </Field>

          <div className="flex justify-end pt-2 border-t border-[#E0D9CF]">
            <button onClick={() => setStep(2)} disabled={!step1Valid}
              className="flex items-center gap-2 bg-[#C9A84C] hover:bg-[#b8943d] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed text-[#0A1628] font-bold px-6 py-3 rounded-xl text-sm transition duration-200">
              Next: Media <ChevronRight size={15} />
            </button>
          </div>
        </div>
      )}

      {/* ── Step 2: Media Upload ── */}
      {step === 2 && (
        <div className="bg-white rounded-2xl border border-[#E0D9CF] p-6 flex flex-col gap-6">
          <h2 className="font-bold text-[#0A1628] flex items-center gap-2"><Image size={16} className="text-[#C9A84C]" /> Photos & Video</h2>

          {/* Images */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-[#0A1628]">Photos <span className="text-[#6B7280] font-normal">({images.length}/5)</span></p>
              {images.length < 5 && (
                <button onClick={() => imageRef.current.click()}
                  className="text-xs text-[#C9A84C] font-semibold hover:underline flex items-center gap-1">
                  <Upload size={12} /> Add photos
                </button>
              )}
            </div>
            <input ref={imageRef} type="file" accept="image/*" multiple onChange={handleImages} className="hidden" />

            {images.length === 0 ? (
              <div onClick={() => imageRef.current.click()}
                className="border-2 border-dashed border-[#E0D9CF] rounded-xl h-36 flex flex-col items-center justify-center cursor-pointer hover:border-[#C9A84C] hover:bg-[#F7F4EF] transition">
                <Image size={28} className="text-[#C9A84C]" />
                <p className="text-sm font-semibold text-[#0A1628] mt-2">Click to upload photos</p>
                <p className="text-xs text-[#6B7280] mt-1">JPG, PNG — up to 5 photos</p>
              </div>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                {images.map((img, i) => (
                  <div key={i} className="relative group aspect-square rounded-xl overflow-hidden border border-[#E0D9CF]">
                    <img src={img.url} alt="" className="w-full h-full object-cover" />
                    {i === 0 && (
                      <span className="absolute bottom-1 left-1 bg-[#0A1628] text-[#C9A84C] text-[9px] font-bold px-1.5 py-0.5 rounded-full">Cover</span>
                    )}
                    <button onClick={() => removeImage(i)}
                      className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                      <X size={10} />
                    </button>
                  </div>
                ))}
                {images.length < 5 && (
                  <button onClick={() => imageRef.current.click()}
                    className="aspect-square rounded-xl border-2 border-dashed border-[#E0D9CF] hover:border-[#C9A84C] flex items-center justify-center text-[#C9A84C] hover:bg-[#F7F4EF] transition">
                    <Upload size={18} />
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Video */}
          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold text-[#0A1628]">Short Video <span className="text-[#6B7280] font-normal">(optional, max 60s)</span></p>
            <input ref={videoRef} type="file" accept="video/*" onChange={handleVideo} className="hidden" />

            {!video ? (
              <div onClick={() => videoRef.current.click()}
                className="border-2 border-dashed border-[#E0D9CF] rounded-xl h-28 flex flex-col items-center justify-center cursor-pointer hover:border-[#C9A84C] hover:bg-[#F7F4EF] transition">
                <Video size={24} className="text-[#C9A84C]" />
                <p className="text-sm font-semibold text-[#0A1628] mt-2">Click to upload a video tour</p>
                <p className="text-xs text-[#6B7280] mt-1">MP4 — max 60 seconds</p>
              </div>
            ) : (
              <div className="flex items-center gap-3 bg-[#F7F4EF] border border-[#E0D9CF] rounded-xl p-3">
                <div className="w-10 h-10 rounded-lg bg-[#0A1628] flex items-center justify-center flex-shrink-0">
                  <Video size={16} className="text-[#C9A84C]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#0A1628] truncate">{video.name}</p>
                  <p className="text-xs text-[#6B7280]">Ready to upload</p>
                </div>
                <button onClick={() => setVideo(null)} className="text-red-400 hover:text-red-500 transition">
                  <X size={16} />
                </button>
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-2 border-t border-[#E0D9CF]">
            <button onClick={() => setStep(1)}
              className="flex-1 sm:flex-none border border-[#E0D9CF] hover:border-[#C9A84C]/40 text-[#0A1628] font-semibold px-6 py-3 rounded-xl text-sm transition">
              Back
            </button>
            <button onClick={() => setStep(3)} disabled={!step2Valid}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-[#C9A84C] hover:bg-[#b8943d] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed text-[#0A1628] font-bold px-6 py-3 rounded-xl text-sm transition duration-200 ml-auto">
              Review Listing <ChevronRight size={15} />
            </button>
          </div>
        </div>
      )}

      {/* ── Step 3: Review ── */}
      {step === 3 && (
        <div className="flex flex-col gap-4">
          <div className="bg-white rounded-2xl border border-[#E0D9CF] overflow-hidden">
            {/* Cover image */}
            {images[0] && (
              <div className="h-52 overflow-hidden">
                <img src={images[0].url} alt="" className="w-full h-full object-cover" />
              </div>
            )}
            <div className="p-6 flex flex-col gap-4">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div>
                  <h2 className="text-lg font-bold text-[#0A1628]">{form.title}</h2>
                  <p className="text-sm text-[#6B7280] flex items-center gap-1 mt-1"><MapPin size={12} /> {form.address}, {form.state}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xl font-bold text-[#0A1628]">₦{Number(form.price).toLocaleString()}</p>
                  <span className="text-[10px] font-bold bg-[#0A1628] text-[#C9A84C] px-2.5 py-1 rounded-full">{form.listingType}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-[#F7F4EF] border border-[#E0D9CF] text-[#0A1628] font-semibold px-3 py-1 rounded-full">{form.type}</span>
                {form.beds && <span className="text-xs bg-[#F7F4EF] border border-[#E0D9CF] text-[#0A1628] font-semibold px-3 py-1 rounded-full">{form.beds} Beds</span>}
                {form.baths && <span className="text-xs bg-[#F7F4EF] border border-[#E0D9CF] text-[#0A1628] font-semibold px-3 py-1 rounded-full">{form.baths} Baths</span>}
                {form.size && <span className="text-xs bg-[#F7F4EF] border border-[#E0D9CF] text-[#0A1628] font-semibold px-3 py-1 rounded-full">{form.size} sqm</span>}
                <span className="text-xs bg-[#F7F4EF] border border-[#E0D9CF] text-[#0A1628] font-semibold px-3 py-1 rounded-full">{images.length} photo{images.length !== 1 ? "s" : ""}</span>
                {video && <span className="text-xs bg-[#F7F4EF] border border-[#E0D9CF] text-[#0A1628] font-semibold px-3 py-1 rounded-full flex items-center gap-1"><Video size={10} /> Video</span>}
              </div>

              {form.description && (
                <p className="text-sm text-[#6B7280] leading-relaxed">{form.description}</p>
              )}
            </div>
          </div>

          <div className="bg-[#F7F4EF] border border-[#E0D9CF] rounded-2xl p-4 flex items-start gap-3">
            <AlertTriangle size={16} className="text-[#C9A84C] flex-shrink-0 mt-0.5" />
            <p className="text-xs text-[#6B7280] leading-relaxed">
              By submitting, you confirm this listing is accurate and complies with our community guidelines. Admin will review before it goes live.
            </p>
          </div>

          <div className="flex gap-3">
            <button onClick={() => setStep(2)}
              className="flex-1 sm:flex-none border border-[#E0D9CF] hover:border-[#C9A84C]/40 text-[#0A1628] font-semibold px-6 py-3 rounded-xl text-sm transition">
              Back
            </button>
            <button onClick={handleSubmit} disabled={submitting}
              className="flex-1 flex items-center justify-center gap-2 bg-[#0A1628] hover:bg-[#1A2E4A] active:scale-95 disabled:opacity-60 text-[#C9A84C] font-bold px-6 py-3 rounded-xl text-sm transition duration-200 ml-auto">
              {submitting ? (
                <><span className="w-4 h-4 border-2 border-[#C9A84C]/30 border-t-[#C9A84C] rounded-full animate-spin" /> Submitting...</>
              ) : (
                <><CheckCircle size={15} /> Submit for Review</>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddListing;