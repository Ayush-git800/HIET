import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Upload,
  PlusCircle,
  Sparkles,
  MapPin,
  Phone,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  Eye
} from 'lucide-react';
import { useMarketplace, MARKETPLACE_CATEGORIES, ITEM_CONDITIONS } from '../context/MarketplaceContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { ItemCard } from '../components/ItemCard';

const SAMPLE_IMAGES = [
  { label: 'Calculator', url: 'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?w=600&auto=format&fit=crop&q=80' },
  { label: 'Bicycle', url: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=600&auto=format&fit=crop&q=80' },
  { label: 'Study Lamp', url: 'https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?w=600&auto=format&fit=crop&q=80' },
  { label: 'Books', url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80' },
  { label: 'Kettle / Appliance', url: 'https://images.unsplash.com/photo-1585837575652-267c041d77d4?w=600&auto=format&fit=crop&q=80' }
];

export const SellItemPage = () => {
  const navigate = useNavigate();
  const { addItem } = useMarketplace();
  const { currentUser } = useAuth();
  const { showToast } = useToast();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Calculators');
  const [condition, setCondition] = useState('Like New');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [image, setImage] = useState(SAMPLE_IMAGES[0].url);
  const [sellerHostel, setSellerHostel] = useState(currentUser?.hostelBlock || 'Raman Hostel (Block B)');
  const [sellerPhone, setSellerPhone] = useState(currentUser?.phone || '+91 98765 43210');

  const [errors, setErrors] = useState({});

  // Image file handler for base64
  const handleImageFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        showToast('Image size should be under 2MB for fast loading', 'error');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        showToast('Photo uploaded successfully!', 'success');
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    const errs = {};
    if (!title.trim()) errs.title = 'Title is required';
    if (!price || Number(price) <= 0) errs.price = 'Valid price is required';
    if (!description.trim()) errs.description = 'Please describe the condition';
    if (!sellerPhone.trim()) errs.sellerPhone = 'Contact number is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      showToast('Please fix highlighted form errors', 'error');
      return;
    }

    const newItem = addItem(
      {
        title,
        description,
        category,
        condition,
        price,
        originalPrice: originalPrice || Math.round(Number(price) * 1.5),
        image,
        sellerHostel,
        sellerPhone
      },
      currentUser
    );

    navigate(`/marketplace/${newItem.id}`);
  };

  // Real-time Preview Item Object
  const previewItem = {
    id: 'preview',
    title: title || 'Your Item Title Preview Here',
    description: description || 'Detailed description of the item...',
    price: Number(price) || 499,
    originalPrice: Number(originalPrice) || (Number(price) ? Number(price) * 1.5 : 999),
    category,
    condition,
    image: image || SAMPLE_IMAGES[0].url,
    sellerName: currentUser?.name || 'Aarav Sharma',
    sellerAvatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    createdAt: new Date().toISOString(),
    status: 'available'
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-orange-50 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-800 mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Quick Campus Listing</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">
          Sell an Item to Fellow Students
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Turn unused gadgets, books, and hostel stuff into quick cash right inside HIET.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* Form Column */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-5"
          >
            {/* Title */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Item Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Casio fx-991ES Scientific Calculator with Cover"
                className={`w-full text-sm px-4 py-2.5 rounded-xl border ${
                  errors.title ? 'border-rose-500' : 'border-slate-300 dark:border-slate-700'
                } bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              />
              {errors.title && <p className="text-xs text-rose-500 mt-1">{errors.title}</p>}
            </div>

            {/* Category & Condition */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {MARKETPLACE_CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Condition *
                </label>
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {ITEM_CONDITIONS.filter((c) => c !== 'All Conditions').map((cond) => (
                    <option key={cond} value={cond}>
                      {cond}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Price & Original Price */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Selling Price (₹) *
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="e.g. 650"
                  className={`w-full text-sm px-4 py-2.5 rounded-xl border ${
                    errors.price ? 'border-rose-500' : 'border-slate-300 dark:border-slate-700'
                  } bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bold`}
                />
                {errors.price && <p className="text-xs text-rose-500 mt-1">{errors.price}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Original Price (₹) <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="number"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value)}
                  placeholder="e.g. 1295"
                  className="w-full text-sm px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Description & Working Status *
              </label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Mention how long you used it, what semester subjects it is useful for, battery health, any minor scratches, etc."
                className={`w-full text-xs sm:text-sm px-4 py-2.5 rounded-xl border ${
                  errors.description ? 'border-rose-500' : 'border-slate-300 dark:border-slate-700'
                } bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none`}
              />
              {errors.description && <p className="text-xs text-rose-500 mt-1">{errors.description}</p>}
            </div>

            {/* Image Upload & Presets */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Photo Upload (File or Quick Sample Preset)
              </label>
              
              {/* File Input */}
              <div className="mt-1 flex items-center gap-3">
                <label className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl hover:border-indigo-500 cursor-pointer bg-slate-50 dark:bg-slate-800/50 transition-colors">
                  <Upload className="w-5 h-5 text-indigo-500" />
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                    Upload from Computer (Base64)
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageFileChange}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Quick Preset Selector */}
              <div className="mt-3">
                <p className="text-[11px] text-slate-400 font-medium mb-1.5">
                  Or pick a demo photo preset:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {SAMPLE_IMAGES.map((sample) => (
                    <button
                      key={sample.label}
                      type="button"
                      onClick={() => setImage(sample.url)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all ${
                        image === sample.url
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {sample.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact & Hostel */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100 dark:border-slate-800">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Hostel / Meetup Location *
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={sellerHostel}
                    onChange={(e) => setSellerHostel(e.target.value)}
                    placeholder="e.g. Raman Hostel, Room 304"
                    className="w-full text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  WhatsApp Contact No. *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="tel"
                    value={sellerPhone}
                    onChange={(e) => setSellerPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-4 py-3.5 px-6 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 shadow-lg shadow-orange-500/25 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <PlusCircle className="w-5 h-5" />
              <span>Publish Listing to HIET Campus Mart</span>
            </button>
          </form>
        </div>

        {/* Live Preview Column */}
        <div className="lg:col-span-5 space-y-4">
          <div className="sticky top-28">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              <Eye className="w-4 h-4 text-indigo-500" />
              <span>Live Card Preview</span>
            </div>
            
            <div className="max-w-sm mx-auto lg:max-w-none">
              <ItemCard item={previewItem} />
            </div>

            <div className="mt-6 p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-xs text-slate-600 dark:text-slate-300 space-y-1.5">
              <p className="font-bold text-indigo-700 dark:text-indigo-300">
                ✨ Tips for faster selling on HIET Campus:
              </p>
              <p>• Price 30-50% lower than original retail</p>
              <p>• Mention exact semester or lab subject utility</p>
              <p>• Clean the item before handing it over</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
