import React, { useState } from "react";
import { FileText, Pill, FlaskConical, Aperture, ChevronDown, ChevronUp } from "lucide-react";

const RECORDS = [
  {
    id: 1,
    doctor: "د. محمد الغامدي",
    specialty: "قلب",
    date: "10 يناير 2025",
    diagnosis: "ارتفاع ضغط الدم الطفيف",
    medicines: ["أملوديبين 5mg — مرة يومياً صباحاً"],
    notes: "يُنصح بتقليل الملح وممارسة الرياضة 30 دقيقة يومياً. متابعة بعد شهر.",
  },
  {
    id: 2,
    doctor: "د. سارة الأحمد",
    specialty: "جلدية",
    date: "2 ديسمبر 2024",
    diagnosis: "أكزيما خفيفة",
    medicines: ["كريم هيدروكورتيزون 1% — مرتين يومياً"],
    notes: "تجنب الماء الساخن والصابون القوي. المتابعة بعد أسبوعين إذا لم تتحسن الحالة.",
  },
];

const TABS = [
  { key: "reports",   label: "التقارير",    icon: FileText },
  { key: "medicines", label: "الوصفات",     icon: Pill },
  { key: "labs",      label: "التحاليل",    icon: FlaskConical },
  { key: "imaging",   label: "الأشعة",      icon: Aperture },
];

const HEALTH_INFO = [
  { label: "فصيلة الدم", value: "B+",        color: "text-danger" },
  { label: "الوزن",       value: "75 كجم",   color: "text-warning-primary" },
  { label: "الطول",       value: "178 سم",   color: "text-primary" },
  { label: "ضغط الدم",    value: "120/80",   color: "text-primary" },
  { label: "السكر",       value: "95 mg/dL", color: "text-success" },
  { label: "الحساسية",    value: "بنسلين",   color: "text-danger" },
];

function MedicalRecordsPage() {
  const [activeTab, setActiveTab] = useState("reports");
  const [expandedRecord, setExpandedRecord] = useState(null);

  return (
    <div className="flex flex-col gap-5 pb-8">
      <div>
        <h1 className="text-xl font-bold text-text">سجلاتي الطبية</h1>
        <p className="text-text-secondary text-sm mt-1">تاريخك الطبي الكامل في مكان واحد</p>
      </div>

      {/* Health summary */}
      <div className="bg-white rounded-2xl border border-border-primary shadow-sm p-4">
        <h2 className="text-sm font-bold text-text mb-3">معلوماتي الصحية الأساسية</h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {HEALTH_INFO.map(({ label, value, color }) => (
            <div key={label} className="bg-background rounded-xl p-3 text-center">
              <p className={`text-base font-bold ${color}`}>{value}</p>
              <p className="text-xs text-text-secondary mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-white border border-border-primary rounded-xl p-1 overflow-x-auto no-scrollbar">
        {TABS.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === key
                ? "bg-primary text-white shadow-sm"
                : "text-text-secondary hover:text-text"
            }`}>
            <Icon className="size-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Reports tab */}
      {activeTab === "reports" && (
        <div className="flex flex-col gap-3">
          {RECORDS.map((r) => (
            <div key={r.id} className="bg-white rounded-2xl border border-border-primary shadow-sm overflow-hidden">
              <button
                onClick={() => setExpandedRecord(expandedRecord === r.id ? null : r.id)}
                className="w-full flex items-center justify-between p-4 hover:bg-background transition-colors">
                <div className="flex items-center gap-3 text-right">
                  <div className="bg-background-primary rounded-xl p-2.5">
                    <FileText className="size-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-text text-sm">{r.doctor}</p>
                    <p className="text-xs text-text-secondary">{r.specialty} — {r.date}</p>
                  </div>
                </div>
                {expandedRecord === r.id
                  ? <ChevronUp className="size-4 text-text-secondary shrink-0" />
                  : <ChevronDown className="size-4 text-text-secondary shrink-0" />
                }
              </button>
              {expandedRecord === r.id && (
                <div className="border-t border-border-primary px-4 pb-4 flex flex-col gap-3">
                  <div className="bg-background rounded-xl p-3 mt-3">
                    <p className="text-xs text-text-secondary mb-1">التشخيص</p>
                    <p className="text-sm font-bold text-text">{r.diagnosis}</p>
                  </div>
                  <div className="bg-background rounded-xl p-3">
                    <p className="text-xs text-text-secondary mb-2">الأدوية الموصوفة</p>
                    {r.medicines.map((m, i) => (
                      <p key={i} className="text-xs text-text flex items-center gap-2 py-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        {m}
                      </p>
                    ))}
                  </div>
                  <div className="bg-background rounded-xl p-3">
                    <p className="text-xs text-text-secondary mb-1">ملاحظات الطبيب</p>
                    <p className="text-xs text-text leading-relaxed">{r.notes}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Placeholder tabs */}
      {(activeTab === "medicines" || activeTab === "labs" || activeTab === "imaging") && (
        <div className="flex flex-col items-center py-16 text-center">
          <div className="bg-background-primary rounded-full p-5 mb-3">
            {activeTab === "medicines" && <Pill className="size-8 text-primary" />}
            {activeTab === "labs" && <FlaskConical className="size-8 text-primary" />}
            {activeTab === "imaging" && <Aperture className="size-8 text-primary" />}
          </div>
          <p className="font-bold text-text">لا توجد سجلات بعد</p>
          <p className="text-sm text-text-secondary mt-1">ستظهر هنا بعد أول زيارة لطبيبك</p>
        </div>
      )}
    </div>
  );
}

export default MedicalRecordsPage;
