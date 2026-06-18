import React, { useState } from "react";
import { CalendarDays, Clock, MapPin, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { Link } from "react-router";
import docImg from "../assets/doc1.png";

const APPOINTMENTS = [
  { id: 1, doctor: "د. سارة الأحمد",    specialty: "جلدية",   date: "غداً",            time: "10:30 ص", location: "مستشفى النخيل، الرياض", status: "confirmed", img: docImg },
  { id: 2, doctor: "د. محمد الغامدي",   specialty: "قلب",     date: "الاثنين 20 يناير",time: "4:00 م",  location: "عيادة الأمل، جدة",       status: "pending",   img: docImg },
  { id: 3, doctor: "د. نورة القحطاني",  specialty: "أطفال",   date: "5 يناير 2025",    time: "9:30 ص",  location: "مستشفى الأطفال، الرياض",  status: "done",      img: docImg },
  { id: 4, doctor: "د. خالد العسيري",   specialty: "عظام",    date: "28 ديسمبر 2024",  time: "11:00 ص", location: "مستشفى الرياض، الدمام",   status: "cancelled", img: docImg },
];

const STATUS_CONFIG = {
  confirmed: { label: "مؤكد",       icon: CheckCircle,  color: "text-success",         bg: "bg-green-100" },
  pending:   { label: "في الانتظار",icon: AlertCircle,  color: "text-warning-primary", bg: "bg-yellow-100" },
  done:      { label: "مكتمل",      icon: CheckCircle,  color: "text-text-secondary",  bg: "bg-gray-100" },
  cancelled: { label: "ملغي",       icon: XCircle,      color: "text-danger",          bg: "bg-red-100" },
};

function AppointmentsPage() {
  const [filter, setFilter] = useState("all");

  const filtered = APPOINTMENTS.filter((a) => filter === "all" || a.status === filter);

  return (
    <div className="flex flex-col gap-5 pb-8">
      <div>
        <h1 className="text-xl font-bold text-text">مواعيدي</h1>
        <p className="text-text-secondary text-sm mt-1">جميع مواعيدك السابقة والقادمة</p>
      </div>

      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
        {[
          { key: "all",       label: "الكل" },
          { key: "confirmed", label: "مؤكدة" },
          { key: "pending",   label: "في الانتظار" },
          { key: "done",      label: "مكتملة" },
          { key: "cancelled", label: "ملغاة" },
        ].map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              filter === f.key
                ? "bg-primary text-white"
                : "bg-white border border-border-primary text-text-secondary hover:border-primary hover:text-primary"
            }`}>
            {f.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        {filtered.map((appt) => {
          const cfg = STATUS_CONFIG[appt.status];
          const StatusIcon = cfg.icon;
          return (
            <div key={appt.id} className="bg-white rounded-2xl border border-border-primary shadow-sm p-4 flex gap-4">
              <img src={appt.img} alt={appt.doctor} className="size-14 rounded-xl object-cover shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-bold text-text text-sm">{appt.doctor}</p>
                    <p className="text-xs text-text-secondary">{appt.specialty}</p>
                  </div>
                  <span className={`shrink-0 flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium ${cfg.bg} ${cfg.color}`}>
                    <StatusIcon className="size-3" />
                    {cfg.label}
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
                {appt.status === "confirmed" && (
                  <div className="flex gap-2 mt-3">
                    <button className="text-xs bg-background-primary text-primary px-3 py-1.5 rounded-xl font-medium hover:bg-primary hover:text-white transition-colors">
                      تأكيد الحضور
                    </button>
                    <button className="text-xs border border-border-primary text-text-secondary px-3 py-1.5 rounded-xl hover:bg-red-50 hover:text-danger hover:border-red-200 transition-colors">
                      إلغاء الموعد
                    </button>
                  </div>
                )}
                {appt.status === "done" && (
                  <div className="flex gap-2 mt-3">
                    <Link to={`/doctors/1`} className="text-xs bg-background-primary text-primary px-3 py-1.5 rounded-xl font-medium hover:bg-primary hover:text-white transition-colors">
                      احجز مرة أخرى
                    </Link>
                  </div>
                )}
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center py-16 text-center">
            <div className="bg-background-primary rounded-full p-5 mb-3">
              <CalendarDays className="size-8 text-primary" />
            </div>
            <p className="font-bold text-text">لا توجد مواعيد</p>
            <Link to="/doctors" className="mt-3 text-sm text-primary hover:underline">احجز موعدك الآن</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default AppointmentsPage;
