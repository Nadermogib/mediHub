import React, { useState } from "react";
import { Bell, ChevronDown, User, LogOut, Settings } from "lucide-react";
import logo from "../assets/logo.png";
import profile from "../assets/doc1.png";

function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const notifications = [
    { id: 1, text: "تم تأكيد موعدك مع د. أحمد السيد غداً", time: "منذ 10 دقائق", unread: true },
    { id: 2, text: "تذكير: موعدك بعد ساعتين", time: "منذ ساعة", unread: true },
    { id: 3, text: "وصفتك الطبية جاهزة للاستلام", time: "أمس", unread: false },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-[81px] items-center justify-between bg-white border-b border-border-primary px-6 lg:px-12">
      {/* Logo */}
      <img src={logo} alt="MediHub" className="w-36 h-[66px] object-contain" />

      {/* Actions */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => { setNotifOpen(!notifOpen); setDropdownOpen(false); }}
            aria-label="الإشعارات"
            className="relative flex h-10 w-10 items-center justify-center rounded-full bg-background hover:bg-background-primary transition-colors">
            <Bell className="size-5 text-primary" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full" />
          </button>

          {notifOpen && (
            <div className="absolute left-0 top-12 w-80 bg-white rounded-2xl shadow-xl border border-border-primary overflow-hidden z-50">
              <div className="px-4 py-3 border-b border-border-primary flex items-center justify-between">
                <h3 className="font-bold text-text">الإشعارات</h3>
                <span className="text-xs text-primary cursor-pointer">تعليم الكل كمقروء</span>
              </div>
              <div className="divide-y divide-border-primary max-h-72 overflow-y-auto">
                {notifications.map((n) => (
                  <div key={n.id} className={`px-4 py-3 flex gap-3 hover:bg-background transition-colors ${n.unread ? "bg-background-primary/40" : ""}`}>
                    <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${n.unread ? "bg-primary" : "bg-transparent"}`} />
                    <div>
                      <p className="text-sm text-text leading-relaxed">{n.text}</p>
                      <p className="text-xs text-text-secondary mt-0.5">{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile dropdown */}
        <div className="relative">
          <button
            onClick={() => { setDropdownOpen(!dropdownOpen); setNotifOpen(false); }}
            className="flex items-center gap-2 rounded-full px-2 py-1 hover:bg-background transition-colors">
            <img src={profile} alt="المريض" className="size-9 object-cover rounded-full border-2 border-primary" />
            <div className="hidden md:block text-right">
              <p className="text-sm font-bold text-text leading-tight">محمد علي</p>
              <p className="text-xs text-text-secondary">مريض</p>
            </div>
            <ChevronDown className={`size-4 text-text-secondary transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
          </button>

          {dropdownOpen && (
            <div className="absolute left-0 top-14 w-52 bg-white rounded-2xl shadow-xl border border-border-primary overflow-hidden z-50">
              <div className="px-4 py-3 border-b border-border-primary">
                <p className="font-bold text-text text-sm">محمد علي</p>
                <p className="text-xs text-text-secondary">mohammed@email.com</p>
              </div>
              <div className="py-1">
                <button className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-text hover:bg-background transition-colors">
                  <User className="size-4 text-primary" />
                  <span>ملفي الشخصي</span>
                </button>
                <button className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-text hover:bg-background transition-colors">
                  <Settings className="size-4 text-primary" />
                  <span>الإعدادات</span>
                </button>
                <div className="border-t border-border-primary my-1" />
                <button className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-danger hover:bg-red-50 transition-colors">
                  <LogOut className="size-4" />
                  <span>تسجيل الخروج</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
