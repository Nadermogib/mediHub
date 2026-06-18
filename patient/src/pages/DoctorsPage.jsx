import React, { useState } from "react";
import { Search, Star, MapPin, Clock, ChevronLeft, SlidersHorizontal, X } from "lucide-react";
import { Link } from "react-router";
import docImg from "../assets/doc1.png";

const SPECIALTIES = [
  "الكل", "قلب", "جلدية", "عظام", "أطفال", "نساء وتوليد",
  "عيون", "أسنان", "باطنية", "أعصاب", "نفسية", "جراحة",
];

const CITIES = ["كل المدن", "الرياض", "جدة", "الدمام", "مكة المكرمة", "المدينة المنورة"];

const DOCTORS = [
  { id: 1, name: "د. سارة الأحمد",      specialty: "جلدية",         city: "الرياض", rating: 4.9, reviews: 127, price: 150, distance: "2.3 كم",  nextSlot: "غداً 10:30 ص",   available: true,  img: docImg },
  { id: 2, name: "د. محمد الغامدي",     specialty: "قلب",           city: "جدة",    rating: 4.8, reviews: 98,  price: 200, distance: "1.1 كم",  nextSlot: "اليوم 4:00 م",   available: true,  img: docImg },
  { id: 3, name: "د. نورة القحطاني",    specialty: "أطفال",         city: "الرياض", rating: 4.9, reviews: 134, price: 120, distance: "3.5 كم",  nextSlot: "الاثنين 9:00 ص", available: true,  img: docImg },
  { id: 4, name: "د. خالد العسيري",     specialty: "عظام",          city: "الدمام", rating: 4.8, reviews: 98,  price: 180, distance: "5.0 كم",  nextSlot: "الثلاثاء 11:00 ص", available: false, img: docImg },
  { id: 5, name: "د. فاطمة الزهراني",   specialty: "نساء وتوليد",   city: "جدة",    rating: 4.9, reviews: 210, price: 150, distance: "2.8 كم",  nextSlot: "غداً 2:00 م",    available: true,  img: docImg },
  { id: 6, name: "د. أحمد السيد",       specialty: "باطنية",        city: "الرياض", rating: 4.7, reviews: 76,  price: 100, distance: "0.9 كم",  nextSlot: "اليوم 6:00 م",   available: true,  img: docImg },
  { id: 7, name: "د. ليلى حسن",        specialty: "عيون",          city: "مكة المكرمة", rating: 4.6, reviews: 55, price: 130, distance: "4.2 كم", nextSlot: "الأربعاء 10:00 ص", available: true, img: docImg },
  { id: 8, name: "د. عمر الشهري",      specialty: "أعصاب",         city: "الرياض", rating: 4.8, reviews: 89,  price: 220, distance: "6.1 كم",  nextSlot: "الخميس 1:00 م",  available: false, img: docImg },
];

function DoctorsPage() {
  const [search, setSearch] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("الكل");
  const [selectedCity, setSelectedCity] = useState("كل المدن");
  const [sortBy, setSortBy] = useState("rating");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = DOCTORS
    .filter((d) => {
      const matchSearch = d.name.includes(search) || d.specialty.includes(search);
      const matchSpec = selectedSpecialty === "الكل" || d.specialty === selectedSpecialty;
      const matchCity = selectedCity === "كل المدن" || d.city === selectedCity;
      return matchSearch && matchSpec && matchCity;
    })
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "price_asc") return a.price - b.price;
      if (sortBy === "price_desc") return b.price - a.price;
      return 0;
    });

  return (
    <div className="flex flex-col gap-5 pb-8">

      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-text">ابحث عن طبيب</h1>
        <p className="text-text-secondary text-sm mt-1">احجز موعدك مع أفضل الأطباء</p>
      </div>

      {/* Search bar */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-text-secondary" />
          <input
            type="text"
            placeholder="ابحث بالاسم أو التخصص..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-border-primary rounded-xl py-2.5 pr-10 pl-4 text-sm text-text placeholder:text-text-secondary focus:outline-none focus:border-primary transition-colors"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute left-3 top-1/2 -translate-y-1/2">
              <X className="size-4 text-text-secondary" />
            </button>
          )}
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 rounded-xl border text-sm font-medium transition-colors ${
            showFilters ? "bg-primary text-white border-primary" : "bg-white border-border-primary text-text"
          }`}>
          <SlidersHorizontal className="size-4" />
          فلاتر
        </button>
      </div>

      {/* Filters panel */}
      {showFilters && (
        <div className="bg-white rounded-2xl border border-border-primary p-4 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="text-xs text-text-secondary mb-1.5 block">المدينة</label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full bg-background border border-border-primary rounded-xl px-3 py-2 text-sm text-text focus:outline-none focus:border-primary">
              {CITIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="flex-1">
            <label className="text-xs text-text-secondary mb-1.5 block">ترتيب حسب</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-background border border-border-primary rounded-xl px-3 py-2 text-sm text-text focus:outline-none focus:border-primary">
              <option value="rating">الأعلى تقييماً</option>
              <option value="price_asc">الأقل سعراً</option>
              <option value="price_desc">الأعلى سعراً</option>
            </select>
          </div>
        </div>
      )}

      {/* Specialty chips */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
        {SPECIALTIES.map((spec) => (
          <button
            key={spec}
            onClick={() => setSelectedSpecialty(spec)}
            className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              selectedSpecialty === spec
                ? "bg-primary text-white"
                : "bg-white border border-border-primary text-text-secondary hover:border-primary hover:text-primary"
            }`}>
            {spec}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-sm text-text-secondary">
        <span className="font-bold text-text">{filtered.length}</span> طبيب متاح
      </p>

      {/* Doctors grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtered.map((doc) => (
          <div
            key={doc.id}
            className="bg-white rounded-2xl border border-border-primary shadow-sm hover:border-primary/30 hover:shadow-md transition-all p-4 flex gap-4">
            {/* Image */}
            <div className="relative shrink-0">
              <img src={doc.img} alt={doc.name} className="size-20 rounded-2xl object-cover" />
              <span className={`absolute -bottom-1 -left-1 w-3.5 h-3.5 rounded-full border-2 border-white ${
                doc.available ? "bg-success" : "bg-text-secondary"
              }`} />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-bold text-text">{doc.name}</p>
                  <p className="text-xs text-text-secondary mt-0.5">{doc.specialty}</p>
                </div>
                <span className="text-sm font-bold text-primary shrink-0">{doc.price} ريال</span>
              </div>

              <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2">
                <span className="flex items-center gap-1 text-xs text-warning-primary font-medium">
                  <Star className="size-3.5 fill-warning-primary" />
                  {doc.rating}
                  <span className="text-text-secondary font-normal">({doc.reviews})</span>
                </span>
                <span className="flex items-center gap-1 text-xs text-text-secondary">
                  <MapPin className="size-3.5" />
                  {doc.city} — {doc.distance}
                </span>
              </div>

              <div className="flex items-center justify-between mt-3 gap-2">
                <span className={`flex items-center gap-1 text-xs font-medium ${
                  doc.available ? "text-success" : "text-text-secondary"
                }`}>
                  <Clock className="size-3.5" />
                  {doc.available ? doc.nextSlot : "لا توجد مواعيد قريبة"}
                </span>
                <Link
                  to={`/doctors/${doc.id}`}
                  className="flex items-center gap-1 bg-primary text-white text-xs font-medium px-3 py-1.5 rounded-xl hover:bg-primary-dark transition-colors shrink-0">
                  احجز الآن
                  <ChevronLeft className="size-3.5" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="bg-background-primary rounded-full p-5 mb-4">
            <Search className="size-8 text-primary" />
          </div>
          <p className="font-bold text-text">لا توجد نتائج</p>
          <p className="text-sm text-text-secondary mt-1">جرب تغيير الفلاتر أو كلمة البحث</p>
        </div>
      )}
    </div>
  );
}

export default DoctorsPage;
