import React, { useState } from "react";
import {
  Search, MapPin, Clock, Star, Phone, ChevronLeft,
  Upload, X, CheckCircle, Pill, Package, Send, FileText,
} from "lucide-react";

const PHARMACIES = [
  { id: 1, name: "صيدلية الشفاء",    distance: "300 م",  rating: 4.7, reviews: 89,  open: true,  closes: "11 م",  delivery: "45 دقيقة", city: "الرياض", deliveryFee: 15 },
  { id: 2, name: "صيدلية النهدي",    distance: "1.2 كم", rating: 4.9, reviews: 214, open: true,  closes: "24 ساعة",delivery: "60 دقيقة", city: "الرياض", deliveryFee: 0 },
  { id: 3, name: "صيدلية الدواء",    distance: "2.1 كم", rating: 4.5, reviews: 44,  open: false, closes: "10 م",  delivery: "غير متاح",  city: "الرياض", deliveryFee: 0 },
  { id: 4, name: "صيدلية المسلم",    distance: "3.0 كم", rating: 4.6, reviews: 61,  open: true,  closes: "12 م",  delivery: "90 دقيقة", city: "جدة",    deliveryFee: 20 },
  { id: 5, name: "صيدلية الرحمة",   distance: "4.5 كم", rating: 4.8, reviews: 103, open: true,  closes: "24 ساعة",delivery: "50 دقيقة", city: "جدة",    deliveryFee: 10 },
];

const MEDICINES = [
  { name: "أموكسيسيلين 500mg", category: "مضاد حيوي",     price: 25, available: true },
  { name: "إيبوبروفين 400mg",  category: "مسكن ألم",       price: 12, available: true },
  { name: "أومبرازول 20mg",    category: "أمراض هضمية",    price: 18, available: true },
  { name: "ميتفورمين 1000mg",  category: "سكري",           price: 30, available: false },
  { name: "أملوديبين 5mg",     category: "ضغط الدم",       price: 22, available: true },
  { name: "سيتيريزين 10mg",    category: "مضاد حساسية",    price: 15, available: true },
];

const PRESCRIPTIONS = [
  {
    id: 1,
    doctor: "د. سارة الأحمد",
    date: "15 يناير 2025",
    medicines: ["أموكسيسيلين 500mg — مرتين يومياً", "إيبوبروفين 400mg — عند الحاجة"],
    sent: false,
  },
  {
    id: 2,
    doctor: "د. محمد الغامدي",
    date: "10 يناير 2025",
    medicines: ["أملوديبين 5mg — مرة يومياً"],
    sent: true,
  },
];

function PharmaciesPage() {
  const [activeTab, setActiveTab] = useState("pharmacies");
  const [search, setSearch] = useState("");
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const [sentPrescriptions, setSentPrescriptions] = useState([2]);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadSent, setUploadSent] = useState(false);

  const filteredPharmacies = PHARMACIES.filter((p) =>
    p.name.includes(search) || p.city.includes(search)
  );

  const filteredMedicines = MEDICINES.filter((m) =>
    m.name.includes(search) || m.category.includes(search)
  );

  function handleSendPrescription(id) {
    if (!selectedPharmacy) return;
    setSentPrescriptions((prev) => [...prev, id]);
  }

  function handleUploadSend() {
    if (!uploadedFile || !selectedPharmacy) return;
    setUploadSent(true);
  }

  return (
    <div className="flex flex-col gap-5 pb-8">

      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-text">الصيدليات والأدوية</h1>
        <p className="text-text-secondary text-sm mt-1">ابحث عن دوائك أو أرسل وصفتك للصيدلية</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-white border border-border-primary rounded-xl p-1">
        {[
          { key: "pharmacies",   label: "الصيدليات القريبة", icon: MapPin },
          { key: "medicines",    label: "البحث عن دواء",     icon: Pill },
          { key: "prescriptions",label: "وصفاتي الطبية",    icon: FileText },
        ].map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-colors ${
              activeTab === key
                ? "bg-primary text-white shadow-sm"
                : "text-text-secondary hover:text-text"
            }`}>
            <Icon className="size-3.5" />
            <span className="hidden sm:inline">{label}</span>
            <span className="sm:hidden">{label.split(" ")[0]}</span>
          </button>
        ))}
      </div>

      {/* Search (for pharmacies + medicines tabs) */}
      {(activeTab === "pharmacies" || activeTab === "medicines") && (
        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-text-secondary" />
          <input
            type="text"
            placeholder={activeTab === "pharmacies" ? "ابحث عن صيدلية أو مدينة..." : "ابحث عن دواء أو فئة..."}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-border-primary rounded-xl py-2.5 pr-10 pl-10 text-sm text-text placeholder:text-text-secondary focus:outline-none focus:border-primary transition-colors"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute left-3 top-1/2 -translate-y-1/2">
              <X className="size-4 text-text-secondary" />
            </button>
          )}
        </div>
      )}

      {/* TAB: Pharmacies */}
      {activeTab === "pharmacies" && (
        <div className="flex flex-col gap-3">
          {selectedPharmacy && (
            <div className="flex items-center gap-2 bg-background-primary border border-primary/30 rounded-xl px-4 py-2.5">
              <CheckCircle className="size-4 text-primary shrink-0" />
              <span className="text-sm text-primary font-medium">
                تم اختيار {PHARMACIES.find((p) => p.id === selectedPharmacy)?.name}
              </span>
              <button onClick={() => setSelectedPharmacy(null)} className="mr-auto">
                <X className="size-4 text-primary" />
              </button>
            </div>
          )}

          {filteredPharmacies.map((p) => (
            <div
              key={p.id}
              className={`bg-white rounded-2xl border shadow-sm p-4 transition-all ${
                selectedPharmacy === p.id
                  ? "border-primary ring-1 ring-primary/20"
                  : "border-border-primary hover:border-primary/30"
              }`}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex gap-3 items-start">
                  <div className="bg-background-primary rounded-xl p-3 shrink-0">
                    <Pill className="size-5 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-text">{p.name}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        p.open ? "bg-green-100 text-success" : "bg-gray-100 text-text-secondary"
                      }`}>
                        {p.open ? "مفتوحة" : "مغلقة"}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1.5">
                      <span className="flex items-center gap-1 text-xs text-text-secondary">
                        <MapPin className="size-3.5" />
                        {p.distance}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-text-secondary">
                        <Clock className="size-3.5" />
                        {p.open ? `يغلق ${p.closes}` : `يفتح الساعة 9 ص`}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-warning-primary font-medium">
                        <Star className="size-3.5 fill-warning-primary" />
                        {p.rating} ({p.reviews})
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <Package className="size-3.5 text-primary" />
                      <span className="text-xs text-text-secondary">
                        توصيل: {p.delivery}
                        {p.deliveryFee === 0 ? " — مجاني" : ` — ${p.deliveryFee} ريال`}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => setSelectedPharmacy(p.id === selectedPharmacy ? null : p.id)}
                  className={`flex items-center gap-1.5 flex-1 justify-center text-sm font-medium py-2 rounded-xl transition-colors ${
                    selectedPharmacy === p.id
                      ? "bg-primary text-white"
                      : "bg-background-primary text-primary hover:bg-primary hover:text-white"
                  }`}>
                  {selectedPharmacy === p.id ? <CheckCircle className="size-4" /> : <ChevronLeft className="size-4" />}
                  {selectedPharmacy === p.id ? "تم الاختيار" : "اختر هذه الصيدلية"}
                </button>
                <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border-primary text-text-secondary hover:bg-background transition-colors text-sm">
                  <Phone className="size-4" />
                  اتصل
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB: Medicines */}
      {activeTab === "medicines" && (
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredMedicines.map((med) => (
              <div
                key={med.name}
                className="bg-white rounded-2xl border border-border-primary shadow-sm p-4 flex items-center gap-3">
                <div className={`rounded-xl p-3 shrink-0 ${med.available ? "bg-background-primary" : "bg-gray-100"}`}>
                  <Pill className={`size-5 ${med.available ? "text-primary" : "text-text-secondary"}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-text text-sm">{med.name}</p>
                  <p className="text-xs text-text-secondary mt-0.5">{med.category}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      med.available ? "bg-green-100 text-success" : "bg-gray-100 text-text-secondary"
                    }`}>
                      {med.available ? "متوفر" : "غير متوفر"}
                    </span>
                    <span className="text-sm font-bold text-primary">{med.price} ريال</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {filteredMedicines.length === 0 && (
            <div className="flex flex-col items-center py-12 text-center">
              <div className="bg-background-primary rounded-full p-4 mb-3">
                <Search className="size-7 text-primary" />
              </div>
              <p className="font-bold text-text">لم يتم العثور على هذا الدواء</p>
              <p className="text-sm text-text-secondary mt-1">جرب اسماً آخر أو تواصل مع الصيدلية مباشرة</p>
            </div>
          )}
        </div>
      )}

      {/* TAB: Prescriptions */}
      {activeTab === "prescriptions" && (
        <div className="flex flex-col gap-4">

          {/* Select pharmacy notice */}
          {!selectedPharmacy && (
            <div className="flex items-start gap-3 bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-3">
              <MapPin className="size-4 text-warning-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-text">اختر صيدلية أولاً</p>
                <p className="text-xs text-text-secondary mt-0.5">
                  اذهب لتبويب "الصيدليات القريبة" واختر الصيدلية التي تريد إرسال وصفتك إليها
                </p>
              </div>
            </div>
          )}

          {/* Prescriptions from doctors */}
          <div>
            <h3 className="text-sm font-bold text-text mb-2">وصفات من أطبائي</h3>
            <div className="flex flex-col gap-3">
              {PRESCRIPTIONS.map((rx) => {
                const isSent = sentPrescriptions.includes(rx.id);
                return (
                  <div key={rx.id} className="bg-white rounded-2xl border border-border-primary shadow-sm p-4">
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div>
                        <p className="font-bold text-text text-sm">{rx.doctor}</p>
                        <p className="text-xs text-text-secondary mt-0.5">{rx.date}</p>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${
                        isSent ? "bg-green-100 text-success" : "bg-background-primary text-primary"
                      }`}>
                        {isSent ? "تم الإرسال" : "جديدة"}
                      </span>
                    </div>
                    <div className="bg-background rounded-xl p-3 mb-3">
                      {rx.medicines.map((m, i) => (
                        <p key={i} className="text-xs text-text-secondary flex items-center gap-2 py-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                          {m}
                        </p>
                      ))}
                    </div>
                    <button
                      onClick={() => handleSendPrescription(rx.id)}
                      disabled={isSent || !selectedPharmacy}
                      className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                        isSent
                          ? "bg-green-100 text-success cursor-default"
                          : !selectedPharmacy
                          ? "bg-border-primary text-text-secondary cursor-not-allowed"
                          : "bg-primary text-white hover:bg-primary-dark"
                      }`}>
                      {isSent ? (
                        <><CheckCircle className="size-4" /> تم الإرسال للصيدلية</>
                      ) : (
                        <><Send className="size-4" /> أرسل للصيدلية</>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Upload prescription */}
          <div>
            <h3 className="text-sm font-bold text-text mb-2">أو ارفع وصفة بالصورة</h3>
            <div className="bg-white rounded-2xl border border-border-primary shadow-sm p-4">
              {uploadSent ? (
                <div className="flex flex-col items-center py-6 text-center gap-3">
                  <div className="bg-green-100 rounded-full p-4">
                    <CheckCircle className="size-8 text-success" />
                  </div>
                  <p className="font-bold text-text">تم إرسال وصفتك!</p>
                  <p className="text-sm text-text-secondary">
                    ستتلقى تأكيداً من الصيدلية خلال دقائق
                  </p>
                  <button
                    onClick={() => { setUploadSent(false); setUploadedFile(null); }}
                    className="text-sm text-primary hover:underline">
                    إرسال وصفة أخرى
                  </button>
                </div>
              ) : (
                <>
                  <label
                    htmlFor="rx-upload"
                    className={`flex flex-col items-center justify-center gap-3 border-2 border-dashed rounded-xl p-6 cursor-pointer transition-colors ${
                      uploadedFile
                        ? "border-primary bg-background-primary"
                        : "border-border-primary hover:border-primary/50 hover:bg-background-primary/50"
                    }`}>
                    <div className={`rounded-full p-3 ${uploadedFile ? "bg-primary" : "bg-background"}`}>
                      <Upload className={`size-6 ${uploadedFile ? "text-white" : "text-text-secondary"}`} />
                    </div>
                    <div className="text-center">
                      {uploadedFile ? (
                        <>
                          <p className="font-medium text-primary text-sm">{uploadedFile}</p>
                          <p className="text-xs text-text-secondary mt-0.5">تم رفع الملف بنجاح</p>
                        </>
                      ) : (
                        <>
                          <p className="font-medium text-text text-sm">اضغط لرفع صورة الوصفة</p>
                          <p className="text-xs text-text-secondary mt-0.5">PNG, JPG — بحد أقصى 5 ميجابايت</p>
                        </>
                      )}
                    </div>
                    <input
                      id="rx-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files?.[0]) setUploadedFile(e.target.files[0].name);
                      }}
                    />
                  </label>
                  <button
                    onClick={handleUploadSend}
                    disabled={!uploadedFile || !selectedPharmacy}
                    className={`w-full mt-3 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      uploadedFile && selectedPharmacy
                        ? "bg-primary text-white hover:bg-primary-dark"
                        : "bg-border-primary text-text-secondary cursor-not-allowed"
                    }`}>
                    <Send className="size-4" />
                    أرسل الوصفة للصيدلية
                  </button>
                </>
              )}
            </div>
          </div>

        </div>
      )}
    </div>
  );
}

export default PharmaciesPage;
