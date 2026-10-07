import React, { useState } from 'react';
import { ServiceProvider, ServiceCategory, ServiceItem } from '../types';
import { SERVICE_CATEGORIES } from '../data/initialData';
import {
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Building2,
  Plus,
  Trash2,
  Camera,
  Image as ImageIcon,
  Sparkles,
} from 'lucide-react';

interface ListBusinessScreenProps {
  onBack: () => void;
  onSubmit: (newProvider: ServiceProvider) => void;
  defaultTower?: string;
  defaultFlat?: string;
}

export const ListBusinessScreen: React.FC<ListBusinessScreenProps> = ({
  onBack,
  onSubmit,
  defaultTower = 'Tower P',
  defaultFlat = 'P-402',
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Step 1: Basic Details
  const [businessName, setBusinessName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [category, setCategory] = useState<Exclude<ServiceCategory, 'All'>>('Clothes & Fashion');
  const [description, setDescription] = useState('');

  // Step 2: Services & Pricing
  const [serviceItems, setServiceItems] = useState<ServiceItem[]>([
    { name: 'Home Consultation / Trial', price: '₹250' },
    { name: 'Standard Service Order', price: '₹750' },
  ]);
  const [newServiceName, setNewServiceName] = useState('');
  const [newServicePrice, setNewServicePrice] = useState('');

  // Step 3: Contact
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');

  // Step 4: Society Information
  const [tower, setTower] = useState(defaultTower);
  const [flatNo, setFlatNo] = useState(defaultFlat);

  // Step 5: Business Media
  const [selectedPhotoTheme, setSelectedPhotoTheme] = useState<'fashion' | 'craft' | 'wellness' | 'fitness' | 'education' | 'general'>('fashion');
  const [priceRange, setPriceRange] = useState('₹500 – ₹2,500');

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleAddService = () => {
    if (!newServiceName.trim()) return;
    setServiceItems([
      ...serviceItems,
      {
        name: newServiceName.trim(),
        price: newServicePrice.trim() || '₹500',
      },
    ]);
    setNewServiceName('');
    setNewServicePrice('');
  };

  const handleRemoveService = (index: number) => {
    setServiceItems(serviceItems.filter((_, i) => i !== index));
  };

  const handleFinalSubmit = () => {
    const servicesList = serviceItems.map((s) => s.name);
    const newProvider: ServiceProvider = {
      id: `resident-biz-${Date.now()}`,
      name: businessName.trim() || 'My Home Venture',
      category,
      ownerName: ownerName.trim() || 'Society Neighbour',
      flatNo: flatNo.trim().startsWith('Flat') ? flatNo.trim() : `Flat ${flatNo.trim()}`,
      tower,
      phone: phone.trim() || '9810234567',
      whatsapp: whatsapp.trim() || phone.trim() || '9810234567',
      description: description.trim() || 'Proud home business run right within Signature Global Andour Heights.',
      about: description.trim() || 'Proud home business run right within Signature Global Andour Heights.',
      services: servicesList.length > 0 ? servicesList : ['Resident Services', 'Direct WhatsApp Orders'],
      serviceItems: serviceItems.length > 0 ? serviceItems : undefined,
      workingHours: {
        days: 'Monday to Saturday',
        hours: '10:00 AM – 07:00 PM',
        isAvailableNow: true,
        notes: 'Resident-run business in Andour Heights.',
      },
      rating: 5.0,
      reviewCount: 1,
      distribution: { star5: 1, star4: 0, star3: 0, star2: 0, star1: 0 },
      reviews: [
        {
          id: `rev-initial-${Date.now()}`,
          authorName: 'Andour RWA Welcome Committee',
          authorFlat: 'Community Desk',
          rating: 5,
          date: 'Just now',
          comment: `Welcome ${businessName.trim()} to the Andour Connect directory! We are excited to support our fellow neighbours.`,
          helpfulCount: 2,
        },
      ],
      priceRange,
      consultationType: 'Both',
      isRecentlyAdded: true,
      imageKey: selectedPhotoTheme,
    };

    onSubmit(newProvider);
    setIsSubmitted(true);
    setTimeout(() => {
      onBack();
    }, 2000);
  };

  const steps = [
    { num: 1, label: 'Basic' },
    { num: 2, label: 'Services' },
    { num: 3, label: 'Contact' },
    { num: 4, label: 'Society' },
    { num: 5, label: 'Media' },
  ];

  return (
    <div className="flex-1 flex flex-col bg-slate-50 overflow-hidden pb-16">
      {/* 1. TOP HEADER */}
      <div className="px-4 py-3 bg-white border-b border-slate-100 flex items-center justify-between shadow-2xs">
        <button
          onClick={onBack}
          className="p-1.5 rounded-full hover:bg-slate-100 text-slate-700"
          aria-label="Back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <h1 className="font-bold text-base text-slate-900 font-display">
          List Your Business
        </h1>

        <div className="w-8" />
      </div>

      {/* Verified Notice Kicker */}
      <div className="bg-emerald-50 px-4 py-2 border-b border-emerald-100 flex items-center justify-center gap-1.5 text-xs text-emerald-900 font-medium text-center">
        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
        <span>Listings are available only to verified residents.</span>
      </div>

      {/* Step Indicator */}
      <div className="px-6 py-3 bg-white border-b border-slate-100 flex items-center justify-between">
        {steps.map((st) => (
          <div key={st.num} className="flex flex-col items-center gap-1">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                currentStep === st.num
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : currentStep > st.num
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-slate-100 text-slate-400'
              }`}
            >
              {currentStep > st.num ? <CheckCircle2 className="w-4 h-4" /> : st.num}
            </div>
            <span className={`text-[10px] ${currentStep === st.num ? 'font-bold text-slate-900' : 'text-slate-400'}`}>
              {st.label}
            </span>
          </div>
        ))}
      </div>

      {/* Multi-step Form Content */}
      <div className="flex-1 overflow-y-auto p-5 scrollbar-none">
        {isSubmitted ? (
          <div className="py-20 text-center space-y-3 max-w-xs mx-auto">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="font-bold text-xl text-slate-900 font-display">
              Listing Submitted!
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Your business is now live on Andour Connect. Neighbours can now find you on the Home & Explore tabs.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs space-y-4">
            
            {/* STEP 1: BASIC DETAILS */}
            {currentStep === 1 && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <h3 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-2">
                  Step 1: Basic Details
                </h3>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Business / Service Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g. Shalini's Homemade Cakes"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Owner / Provider Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    placeholder="e.g. Shalini Gupta"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Service Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 font-medium"
                  >
                    {SERVICE_CATEGORIES.map((c) => (
                      <option key={c.name} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Short Description *
                  </label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Tell your neighbours what you offer, specialty items, and why they should choose you..."
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>
            )}

            {/* STEP 2: SERVICES & PRICING */}
            {currentStep === 2 && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <h3 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-2">
                  Step 2: Services & Pricing
                </h3>

                <p className="text-xs text-slate-500">
                  Add services with transparent rates so neighbours know what to expect.
                </p>

                <div className="space-y-2">
                  <input
                    type="text"
                    value={newServiceName}
                    onChange={(e) => setNewServiceName(e.target.value)}
                    placeholder="Service title (e.g. Bridal Mehendi, Yoga Batch)"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newServicePrice}
                      onChange={(e) => setNewServicePrice(e.target.value)}
                      placeholder="Price (e.g. ₹500, ₹1,200/mo)"
                      className="flex-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                    <button
                      type="button"
                      onClick={handleAddService}
                      className="px-4 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition-colors flex items-center gap-1 shrink-0"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Item</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  {serviceItems.map((srv, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="font-medium text-slate-800 truncate">{srv.name}</span>
                        <span className="text-[11px] font-bold text-emerald-800 bg-white px-2 py-0.5 rounded-md border border-slate-200 shrink-0">
                          {srv.price}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveService(idx)}
                        className="text-slate-400 hover:text-rose-600 p-1 shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 3: CONTACT */}
            {currentStep === 3 && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <h3 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-2">
                  Step 3: Contact Channels
                </h3>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone Number (Direct Calls) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 9810234567"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    WhatsApp Number (Optional)
                  </label>
                  <input
                    type="tel"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="e.g. 9810234567 (leaves blank to use phone)"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>
            )}

            {/* STEP 4: SOCIETY INFORMATION */}
            {currentStep === 4 && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <h3 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-2">
                  Step 4: Society Information
                </h3>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Society Tower *
                  </label>
                  <select
                    value={tower}
                    onChange={(e) => setTower(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 font-medium"
                  >
                    {['Tower B', 'Tower C', 'Tower F', 'Tower J', 'Tower M', 'Tower N', 'Tower P', 'Tower Q'].map(
                      (t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      )
                    )}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Flat Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={flatNo}
                    onChange={(e) => setFlatNo(e.target.value)}
                    placeholder="e.g. P-402 or Q055"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Estimated Price Range
                  </label>
                  <input
                    type="text"
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    placeholder="e.g. ₹300 – ₹1,500"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>
            )}

            {/* STEP 5: BUSINESS MEDIA */}
            {currentStep === 5 && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <h3 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-2">
                  Step 5: Business Media & Theme
                </h3>

                <p className="text-xs text-slate-500">
                  Choose a photography cover aesthetic for your card in the society directory.
                </p>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'fashion', label: 'Boutique & Handloom', img: '/src/assets/images/home_boutique_craft_1791308100452.jpg' },
                    { id: 'nails', label: 'Nails & Makeover', img: '/src/assets/images/nail_makeover_banner_1791310401888.jpg' },
                    { id: 'jewellery', label: 'Fine Jewellery', img: '/src/assets/images/jewellery_luxury_banner_1791310423328.jpg' },
                    { id: 'fitness', label: 'Sports & Fitness', img: '/src/assets/images/fitness_training_banner_1791310435080.jpg' },
                    { id: 'music', label: 'Classical Dance & Music', img: '/src/assets/images/dance_music_banner_1791310450521.jpg' },
                    { id: 'wellness', label: 'Wellness & Nutrition', img: '/src/assets/images/wellness_nutrition_salon_1791308114033.jpg' },
                  ].map((theme) => (
                    <button
                      key={theme.id}
                      type="button"
                      onClick={() => {
                        setSelectedPhotoTheme(theme.id as any);
                      }}
                      className={`p-2 rounded-2xl border text-left overflow-hidden transition-all ${
                        selectedPhotoTheme === theme.id
                          ? 'border-emerald-600 ring-2 ring-emerald-500/30'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="h-20 rounded-xl overflow-hidden mb-1.5">
                        <img
                          src={theme.img}
                          alt={theme.label}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-[11px] font-bold text-slate-800 block truncate">
                        {theme.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom Nav Buttons */}
            <div className="pt-4 flex items-center justify-between border-t border-slate-100">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
                >
                  Back
                </button>
              ) : (
                <div />
              )}

              {currentStep < 5 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold transition-colors"
                >
                  Continue
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleFinalSubmit}
                  className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-all shadow-md active:scale-95"
                >
                  Submit Listing
                </button>
              )}
            </div>

          </div>
        )}
      </div>
    </div>
  );
};
