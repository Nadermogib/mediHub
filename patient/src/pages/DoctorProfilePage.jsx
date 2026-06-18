import React, { useState } from "react";
import {
  ArrowRight, Star, MapPin, Phone, MessageCircle, CheckCircle,
  ChevronLeft, ChevronRight, Calendar, Clock, Award, Users,
} from "lucide-react";
import { Link } from "react-router";
import docImg from "../assets/doc1.png";

const DAYS = [
  { label: "السبت",    date: "18 يناير",  day: "Sat" },
  { label: "الأحد",    date: "19 يناير",  day: "Sun" },
  { label: "الاثنين",  date: "20 يناير",  day: "Mon" },
  { label: "الثلاثاء", date: "21 يناير",  day: "Tue" },
  { label: "الأربعاء", date: "22 يناير",  day: "Wed" },
];

const TIME_SLOTS = {
  Sat: ["9:00", "9:30", "10:00", "10:30", "4:00", "4:30"],
  Sun: ["9:00", "10:00", "11:00", "4:30", "5:00"],
  Mon: ["9:30", "10:30", "2:00", "3:00", "4:00"],
  Tue: [],
  Wed: ["9:00", "10:00", "11:30", "3:30"],
};

const BOOKED = { Sat: ["9:00", "10:00"], Mon: ["3:00"] };

const REVIEWS = [
  { name: "سلمى العتيبي", rating: 5, date: "10 يناير 2025", comment: "دكتورة ممتازة ومتعاونة، شرحت لي الحالة بالتفصيل وأنا ارتحت كثيراً" },
  { name: "فهد الدوسري",  rating: 5, date: "5 يناير 2025",  comment: "تجربة رائعة، الانتظار لم يكن طويلاً والعلاج فعّال" },
  { name: "هنوف الشمري",  rating: 4, date: "28 ديسمبر 2024", comment: "دكتورة محترفة، العيادة نظيفة والموظفون محترمون" },
];

function DoctorProfilePage() {
  const [activeTab, setActiveTab] = useState("booking");
  const [selectedDay, setSelectedDay] = useState("Sun");
  const [selectedTime, setSelectedTime] = useState(null);
  const [visitReason, setVisitReason] = useState("");
  const [booked, setBooked] = useState(false);

  const slots = TIME_SLOTS[selectedDay] || [];
  const bookedSlots = BOOKED[selectedDay] || [];

  function handleBook() {
    if (selectedTime) setBooked(true);
  }

  if (booked) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-5 text-center px-4">
        <div className="bg-green-100 rounded-full p-6">
          <CheckCircle className="size-14 text-success" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-text">تم حجز موعدك بنجاح!</h2>
          <p className="text-text-secondary mt-2 text-sm">
            د. سارة الأحمد — {DAYS.find((d) => d.day === selectedDay)?.label}{" "}
            {DAYS.find((d) => d.day === selectedDay)?.date} — {selectedTime}
          </p>
        </div>
        <p className="text-xs text-text-secondary bg-background-primary rounded-xl px-4 py-2.5 max-w-sm">
          ستصلك رسالة تأكيد على جوالك. يمكنك مراجعة موعدك من صفحة المواعيد
        </p>
        <div className="flex gap-3">
          <Link to="/appointments" className="bg-primary text-white text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-primary-dark transition-colors">
            مواعيدي
          </Link>
          <Link to="/doctors" className="bg-white border border-border-primary text-text text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-background transition-colors">
            رجوع للأطباء
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 pb-8 max-w-3xl mx-auto">

      {/* Back */}
      <Link to="/doctors" className="flex items-center gap-2 text-text-secondary text-sm hover:text-primary transition-colors w-fit">
        <ArrowRight className="size-4" />
        <span>العودة للأطباء</span>
      </Link>

      {/* Doctor Card */}
      <div className="bg-white rounded-2xl border border-border-primary p-5 shadow-sm">
        <div className="flex gap-4 items-start">
          <img src={docImg} alt="الطبيب" className="size-24 rounded-2xl object-cover shrink-0" />
          <div className="flex-1">
            <h1 className="text-lg font-bold text-text">د. سارة الأحمد</h1>
            <p className="text-primary text-sm font-medium">استشارية جلدية وتجميل</p>
            <p className="text-text-secondary text-xs mt-0.5">مستشفى النخيل، الرياض</p>

            <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-3">
              <span className="flex items-center gap-1 text-xs text-warning-primary font-medium">
                <Star className="size-3.5 fill-warning-primary" />
                4.9 (127 تقييم)
              </span>
              <span className="flex items-center gap-1 text-xs text-text-secondary">
                <Award className="size-3.5 text-primary" />
                12 سنة خبرة
              </span>
              <span className="flex items-center gap-1 text-xs text-text-secondary">
                <Users className="size-3.5 text-primary" />
                +500 مريض
              </span>
              <span className="flex items-center gap-1 text-xs text-text-secondary">
                <MapPin className="size-3.5" />
                2.3 كم
              </span>
            </div>
          </div>
          <span className="text-lg font-bold text-primary shrink-0">150 ريال</span>
        </div>

        <div className="flex gap-2 mt-4">
          <button className="flex items-center gap-2 flex-1 justify-center bg-background border border-border-primary text-text-secondary text-sm rounded-xl py-2 hover:bg-background-primary hover:text-primary hover:border-primary/30 transition-colors">
            <Phone className="size-4" />
            اتصل
          </button>
          <button className="flex items-center gap-2 flex-1 justify-center bg-background border border-border-primary text-text-secondary text-sm rounded-xl py-2 hover:bg-background-primary hover:text-primary hover:border-primary/30 transition-colors">
            <MessageCircle className="size-4" />
            راسل
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-white border border-border-primary rounded-xl p-1">
        {[
          { key: "booking", label: "احجز موعد" },
          { key: "about",   label: "نبذة" },
          { key: "reviews", label: "التقييمات" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? "bg-primary text-white shadow-sm"
                : "text-text-secondary hover:text-text"
            }`}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab: Booking */}
      {activeTab === "booking" && (
        <div className="flex flex-col gap-4">
          {/* Day selector */}
          <div>
            <p className="text-sm font-bold text-text mb-2 flex items-center gap-2">
              <Calendar className="size-4 text-primary" />
              اختر التاريخ
            </p>
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
              {DAYS.map((d) => (
                <button
                  key={d.day}
                  onClick={() => { setSelectedDay(d.day); setSelectedTime(null); }}
                  className={`shrink-0 flex flex-col items-center px-4 py-2.5 rounded-xl border text-sm transition-colors ${
                    selectedDay === d.day
                      ? "bg-primary text-white border-primary"
                      : "bg-white border-border-primary text-text hover:border-primary/30"
                  }`}>
                  <span className="font-bold">{d.label}</span>
                  <span className="text-xs opacity-70 mt-0.5">{d.date}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Time slots */}
          <div>
            <p className="text-sm font-bold text-text mb-2 flex items-center gap-2">
              <Clock className="size-4 text-primary" />
              الأوقات المتاحة
            </p>
            {slots.length === 0 ? (
              <div className="bg-background rounded-xl p-4 text-center">
                <p className="text-text-secondary text-sm">لا توجد مواعيد في هذا اليوم</p>
              </div>
            ) : (
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {slots.map((time) => {
                  const isBooked = bookedSlots.includes(time);
                  const isSelected = selectedTime === time;
                  return (
                    <button
                      key={time}
                      disabled={isBooked}
                      onClick={() => setSelectedTime(time)}
                      className={`py-2.5 rounded-xl text-sm font-medium border transition-colors ${
                        isBooked
                          ? "bg-background border-border-primary text-text-secondary opacity-50 cursor-not-allowed line-through"
                          : isSelected
                          ? "bg-primary text-white border-primary"
                          : "bg-white border-border-primary text-text hover:border-primary hover:text-primary"
                      }`}>
                      {time}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Visit reason */}
          <div>
            <label className="text-sm font-bold text-text mb-2 block">سبب الزيارة</label>
            <textarea
              rows={3}
              value={visitReason}
              onChange={(e) => setVisitReason(e.target.value)}
              placeholder="اكتب وصفاً مختصراً لحالتك أو سبب زيارتك..."
              className="w-full bg-white border border-border-primary rounded-xl px-4 py-3 text-sm text-text placeholder:text-text-secondary focus:outline-none focus:border-primary resize-none transition-colors"
            />
          </div>

          {/* Confirm button */}
          <button
            onClick={handleBook}
            disabled={!selectedTime}
            className={`w-full py-3.5 rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2 ${
              selectedTime
                ? "bg-primary text-white hover:bg-primary-dark"
                : "bg-border-primary text-text-secondary cursor-not-allowed"
            }`}>
            {selectedTime ? (
              <>
                <CheckCircle className="size-4" />
                تأكيد الحجز — 150 ريال
              </>
            ) : "اختر وقتاً لإتمام الحجز"}
          </button>
        </div>
      )}

      {/* Tab: About */}
      {activeTab === "about" && (
        <div className="bg-white rounded-2xl border border-border-primary p-5 flex flex-col gap-4">
          <div>
            <h3 className="font-bold text-text mb-2">نبذة عن الطبيبة</h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              دكتورة سارة الأحمد متخصصة في أمراض وجراحة الجلد والتجميل، حاصلة على البورد السعودي في الأمراض الجلدية
              وزمالة في جلدية الأطفال. لديها خبرة 12 عاماً في تشخيص وعلاج أمراض الجلد المختلفة.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-text mb-2">التخصصات الدقيقة</h3>
            <div className="flex flex-wrap gap-2">
              {["أكزيما وصدفية", "حب الشباب", "تساقط الشعر", "الليزر الجلدي", "جلدية الأطفال", "الحساسية الجلدية"].map((s) => (
                <span key={s} className="bg-background-primary text-primary text-xs px-3 py-1 rounded-full">{s}</span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "العيادة",    value: "مستشفى النخيل، الرياض" },
              { label: "أيام العمل", value: "السبت — الأربعاء" },
              { label: "ساعات العمل", value: "9:00 ص — 6:00 م" },
              { label: "اللغات",     value: "العربية، الإنجليزية" },
            ].map(({ label, value }) => (
              <div key={label} className="bg-background rounded-xl p-3">
                <p className="text-xs text-text-secondary">{label}</p>
                <p className="text-sm font-medium text-text mt-0.5">{value}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Reviews */}
      {activeTab === "reviews" && (
        <div className="flex flex-col gap-3">
          {/* Summary */}
          <div className="bg-white rounded-2xl border border-border-primary p-5 flex items-center gap-5">
            <div className="text-center">
              <p className="text-4xl font-bold text-primary">4.9</p>
              <div className="flex gap-0.5 mt-1 justify-center">
                {[1,2,3,4,5].map((s) => <Star key={s} className="size-3.5 fill-warning-primary text-warning-primary" />)}
              </div>
              <p className="text-xs text-text-secondary mt-1">127 تقييم</p>
            </div>
            <div className="flex-1 flex flex-col gap-1">
              {[["5 نجوم", 87], ["4 نجوم", 10], ["3 نجوم", 3]].map(([label, pct]) => (
                <div key={label} className="flex items-center gap-2">
                  <span className="text-xs text-text-secondary w-14 shrink-0">{label}</span>
                  <div className="flex-1 bg-background rounded-full h-1.5">
                    <div className="bg-warning-primary h-1.5 rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="text-xs text-text-secondary w-8 text-left">{pct}%</span>
                </div>
              ))}
            </div>
          </div>
          {REVIEWS.map((r, i) => (
            <div key={i} className="bg-white rounded-2xl border border-border-primary p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="size-8 rounded-full bg-background-primary flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">{r.name[0]}</span>
                  </div>
                  <p className="text-sm font-bold text-text">{r.name}</p>
                </div>
                <div className="flex flex-col items-end gap-0.5">
                  <div className="flex gap-0.5">
                    {Array.from({ length: r.rating }).map((_, j) => (
                      <Star key={j} className="size-3 fill-warning-primary text-warning-primary" />
                    ))}
                  </div>
                  <span className="text-xs text-text-secondary">{r.date}</span>
                </div>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">{r.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DoctorProfilePage;
