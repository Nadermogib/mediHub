import React from "react";
import {
  LayoutDashboard,
  LogOut,
  PanelRightIcon,
  Stethoscope,
  Pill,
  CalendarDays,
  FileText,
  MessageCircle,
  Heart,
} from "lucide-react";
import { Link, useLocation } from "react-router";

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "الرئيسية", path: "/dashboard" },
  { icon: Stethoscope,     label: "الأطباء",  path: "/doctors" },
  { icon: Pill,            label: "الصيدليات", path: "/pharmacies" },
  { icon: CalendarDays,    label: "مواعيدي",  path: "/appointments" },
  { icon: FileText,        label: "سجلاتي الطبية", path: "/medical-records" },
  { icon: MessageCircle,   label: "رسائلي",   path: "/chats" },
  { icon: Heart,           label: "المفضلة",  path: "/favorites" },
];

export const SIDEBAR_OPEN_WIDTH = 230;
export const SIDEBAR_CLOSED_WIDTH = 80;

function Sidebar({ isOpen, onToggle, navbarHeight = "81px" }) {
  const location = useLocation();

  return (
    <aside
      style={{
        top: navbarHeight,
        height: `calc(100vh - ${navbarHeight})`,
        width: isOpen ? `${SIDEBAR_OPEN_WIDTH}px` : `${SIDEBAR_CLOSED_WIDTH}px`,
        transition: "width 300ms ease-in-out",
      }}
      className="fixed right-0 z-40 flex flex-col bg-white border-l border-border-primary overflow-hidden">

      {/* Toggle button */}
      <div
        className="flex items-center border-b border-border-primary px-3"
        style={{ height: "56px", justifyContent: isOpen ? "flex-end" : "center" }}>
        <button
          onClick={onToggle}
          aria-label={isOpen ? "إغلاق القائمة" : "فتح القائمة"}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-background hover:bg-background-primary transition-colors">
          <PanelRightIcon
            className="size-5 text-primary"
            style={{
              transform: isOpen ? "rotate(0deg)" : "rotate(180deg)",
              transition: "transform 300ms ease-in-out",
            }}
          />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 flex flex-col gap-1 px-1.5 overflow-y-auto no-scrollbar">
        {NAV_ITEMS.map(({ icon: Icon, label, path }) => {
          const isActive = location.pathname === path || (path !== "/dashboard" && location.pathname.startsWith(path));
          return (
            <Link
              key={label}
              to={path}
              style={{ justifyContent: isOpen ? "flex-start" : "center" }}
              title={!isOpen ? label : undefined}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors duration-150
                ${isActive
                  ? "bg-background-primary text-primary font-bold"
                  : "text-text-secondary hover:bg-background-primary hover:text-primary"}`}>
              <Icon className="size-5 shrink-0" />
              {isOpen && <span className="whitespace-nowrap text-sm">{label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-1.5 pb-6">
        <button
          style={{ justifyContent: isOpen ? "flex-start" : "center" }}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-danger hover:bg-red-50 transition-colors duration-150">
          <LogOut className="size-5 shrink-0" />
          {isOpen && <span className="text-sm font-medium whitespace-nowrap">تسجيل الخروج</span>}
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
