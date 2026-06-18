import React from "react";
import {
  CalendarDays,
  Stethoscope,
  Pill,
  FileText,
  Star,
  MapPin,
  Clock,
  ChevronLeft,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router";
import docImg from "../assets/doc1.png";

const QUICK_ACTIONS = [
  { icon: Stethoscope, label: "احجز موعد", sub: "ابحث عن طبيب متاح", to: "/doctors", color: "bg-primary text-white" },
  { icon: Pill,        label: "ابحث عن دواء", sub: "أقرب صيدلية لك", to: "/pharmacies", color: "bg-background-primary text-primary" },
  { icon: FileText,    label: "سجلاتي الطبية", sub: "تقارير ووصفات", to: "/medical-records", color: "bg-background-primary text-primary" },
  { icon: CalendarDays,label: "مواعيدي", sub: "القادمة والسابقة", to: "/appointments", color: "bg-background-primary text-primary" },
];

const UPCOMING_APPOINTMENTS = [
  {
    id: 1,
    doctor: "د. سارة الأحمد",
    specialty: "استشارية جلدية",
    date: "غداً",
    time: "10:30 صباحاً",
    location: "مستشفى النخيل، الرياض",
    status: "confirmed",
    img: docImg,
  },
  {
    id: 2,
    doctor: "د. محمد الغامدي",
    specialty: "استشاري قلب",
    date: "الاثنين، 20 يناير",
    time: "4:00 مساءً",
    location: "عيادة الأمل، جدة",
    status: "pending",
    img: docImg,
  },
];

const SUGGESTED_DOCTORS = [
  { id: 1, name: "د. نورة القحطاني", specialty: "أطفال", rating: 4.9, reviews: 134, price: 120, img: docImg },
  { id: 2, name: "د. خالد العسيري",  specialty: "عظام",  rating: 4.8, reviews: 98,  price: 180, img: docImg },
  { id: 3, name: "د. فاطمة الزهراني",specialty: "نساء وتوليد", rating: 4.9, reviews: 210, price: 150, img: docImg },
  { id: 4, name: "د. أحمد السيد",    specialty: "باطنية", rating: 4.7, reviews: 76,  price: 100, img: docImg },
];

const HEALTH_STATS = [
  { label: "ضغط الدم",    value: "120/80", unit: "mmHg", color: "text-primary",        icon: "❤️" },
  { label: "السكر",       value: "95",     unit: "mg/dL", color: "text-success",        icon: "🩸" },
  { label: "الوزن",       value: "75",     unit: "كجم",   color: "text-warning-primary",icon: "⚖️" },
  { label: "فصيلة الدم",  value: "B+",     unit: "",      color: "text-danger",         icon: "💉" },
];

function DashboardPage() {
  return (
    <div className="flex flex-col gap-6 pb-8">

      {/* Greeting */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">مرحباً، محمد 👋</h1>
          <p className="text-text-secondary text-sm mt-1">الأحد، 19 يناير 2025</p>
        </div>
        <div className="hidden md:flex items-center gap-2 bg-background-primary border border-primary/20 rounded-xl px-4 py-2">
          <CheckCircle className="size-4 text-primary" />
          <span className="text-sm text-primary font-medium">ملفك الطبي مكتمل</span>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {QUICK_ACTIONS.map(({ icon: Icon, label, sub, to, color }) => (
          <Link
            key={label}
            to={to}
            className={`flex flex-col gap-2 rounded-2xl p-4 hover:opacity-90 transition-opacity ${color} shadow-sm`}>
            <Icon className="size-6" />
            <div>
              <p className="font-bold text-sm">{label}</p>
              <p className="text-xs opacity-70 mt-0.5">{sub}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Health Stats */}
      <div>
        <h2 className="text-base font-bold text-text mb-3">مؤشراتي الصحية</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {HEALTH_STATS.map(({ label, value, unit, color, icon }) => (
            <div key={label} className="bg-white rounded-2xl p-4 shadow-sm border border-border-primary">
              <span className="text-xl">{icon}</span>
              <p className={`text-xl font-bold mt-2 ${color}`}>
                {value}
                {unit && <span className="text-xs font-normal text-text-secondary mr-1">{unit}</span>}
              </p>
              <p className="text-xs text-text-secondary mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Appointments */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-text">المواعيد القادمة</h2>
          <Link to="/appointments" className="flex items-center gap-1 text-primary text-sm hover:underline">
            <span>كل المواعيد</span>
            <ArrowLeft className="size-3.5" />
          </Link>
        </div>
        <div className="flex flex-col gap-3">
          {UPCOMING_APPOINTMENTS.map((appt) => (
            <div key={appt.id} className="bg-white rounded-2xl p-4 shadow-sm border border-border-primary flex items-center gap-4">
              <img src={appt.img} alt={appt.doctor} className="size-14 rounded-xl object-cover shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-bold text-text text-sm">{appt.doctor}</p>
                    <p className="text-xs text-text-secondary">{appt.specialty}</p>
                  </div>
                  <span className={`shrink-0 text-xs px-2 py-0.5 rounded-full font-medium ${
                    appt.status === "confirmed"
                      ? "bg-green-100 text-success"
                      : "bg-yellow-100 text-warning-primary"
                  }`}>
                    {appt.status === "confirmed" ? "مؤكد" : "في الانتظار"}
                  </span>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
                  <span className="flex items-center gap-1 text-xs text-text-secondary">
                    <CalendarDays className="size-3.5" />
                    {appt.date}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-text-secondary">
                    <Clock className="size-3.5" />
                    {appt.time}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-text-secondary">
                    <MapPin className="size-3.5" />
                    {appt.location}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Suggested Doctors */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-text">أطباء مقترحون لك</h2>
          <Link to="/doctors" className="flex items-center gap-1 text-primary text-sm hover:underline">
            <span>عرض الكل</span>
            <ArrowLeft className="size-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {SUGGESTED_DOCTORS.map((doc) => (
            <Link
              key={doc.id}
              to={`/doctors/${doc.id}`}
              className="bg-white rounded-2xl p-4 shadow-sm border border-border-primary hover:border-primary/40 hover:shadow-md transition-all flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <img src={doc.img} alt={doc.name} className="size-12 rounded-xl object-cover" />
                <div>
                  <p className="font-bold text-text text-sm leading-tight">{doc.name}</p>
                  <p className="text-xs text-text-secondary mt-0.5">{doc.specialty}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1 text-xs text-warning-primary font-medium">
                  <Star className="size-3.5 fill-warning-primary" />
                  {doc.rating}
                  <span className="text-text-secondary font-normal">({doc.reviews})</span>
                </span>
                <span className="text-xs font-bold text-primary">{doc.price} ريال</span>
              </div>
              <div className="flex items-center gap-1.5 bg-background-primary rounded-xl px-3 py-1.5">
                <ChevronLeft className="size-3.5 text-primary" />
                <span className="text-xs text-primary font-medium">احجز موعداً</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Pharmacy CTA */}
      <Link
        to="/pharmacies"
        className="flex items-center justify-between bg-primary rounded-2xl p-5 shadow-sm hover:bg-primary-dark transition-colors">
        <div>
          <p className="font-bold text-white text-base">وصفتك الطبية جاهزة؟</p>
          <p className="text-white/80 text-sm mt-1">أرسلها للصيدلية مباشرة واستلمها أو نوصّلها لك</p>
        </div>
        <div className="bg-white/20 rounded-xl p-3">
          <Pill className="size-7 text-white" />
        </div>
      </Link>

    </div>
  );
}

export default DashboardPage;
