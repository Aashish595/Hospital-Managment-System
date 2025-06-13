"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { ChevronDown, ChevronRight, Home, Stethoscope, User, Calendar, FileText, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const pathname = usePathname();
  const [user, setUser] = useState(null);
  const [openSubmenus, setOpenSubmenus] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/users/me");
        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        console.error("Failed to fetch user", err);
      }
    };
    fetchUser();
  }, []);

  const toggleSubmenu = (key) => {
    setOpenSubmenus(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const links = {
    admin: [
      { 
        href: "/dashboard/admin", 
        label: "Dashboard", 
        icon: <Home className="h-5 w-5" /> 
      },
      { 
        href: "/dashboard/admin/doctors", 
        label: "Doctors", 
        icon: <Stethoscope className="h-5 w-5" /> 
      },
      { 
        href: "/dashboard/admin/patients", 
        label: "Patients", 
        icon: <User className="h-5 w-5" /> 
      },
      { 
        href: "/dashboard/admin/appointments", 
        label: "Appointments", 
        icon: <Calendar className="h-5 w-5" />,
        submenu: [
          { href: "/dashboard/admin/appointments/upcoming", label: "Upcoming" },
          { href: "/dashboard/admin/appointments/completed", label: "Completed" },
          { href: "/dashboard/admin/appointments/cancelled", label: "Cancelled" }
        ]
      },
      { 
        href: "/dashboard/admin/settings", 
        label: "Settings", 
        icon: <Settings className="h-5 w-5" /> 
      },
    ],
    doctor: [
      { 
        href: "/dashboard/doctor", 
        label: "Dashboard", 
        icon: <Home className="h-5 w-5" /> 
      },
      { 
        href: "/dashboard/doctor/appointments", 
        label: "Appointments", 
        icon: <Calendar className="h-5 w-5" />,
        submenu: [
          { href: "/dashboard/doctor/appointments/today", label: "Today" },
          { href: "/dashboard/doctor/appointments/upcoming", label: "Upcoming" }
        ]
      },
      { 
        href: "/dashboard/doctor/records", 
        label: "Medical Records", 
        icon: <FileText className="h-5 w-5" /> 
      },
      { 
        href: "/dashboard/doctor/profile", 
        label: "Profile", 
        icon: <User className="h-5 w-5" /> 
      },
    ],
    patient: [
      { 
        href: "/dashboard/patient", 
        label: "Dashboard", 
        icon: <Home className="h-5 w-5" /> 
      },
      { 
        href: "/dashboard/patient/book", 
        label: "Book Appointment", 
        icon: <Calendar className="h-5 w-5" /> 
      },
      { 
        href: "/dashboard/patient/records", 
        label: "My Records", 
        icon: <FileText className="h-5 w-5" /> 
      },
      { 
        href: "/dashboard/patient/prescriptions", 
        label: "Prescriptions", 
        icon: <FileText className="h-5 w-5" /> 
      },
    ],
  };

  const roleLinks = user ? links[user.role] || [] : [];

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r bg-white shadow-sm md:block">
      <div className="flex h-full flex-col">
        <div className="flex items-center gap-3 p-6">
          <Image src={assets.Logo} alt="Logo" width={32} height={32} />
          <h2 className="text-xl font-bold text-blue-600">MediCare HMS</h2>
        </div>
        
        <div className="flex-1 overflow-y-auto px-4 py-2">
          <nav className="space-y-1">
            {roleLinks.map((link) => (
              <div key={link.href}>
                <div className="flex flex-col">
                  <Link
                    href={link.href}
                    onClick={(e) => {
                      if (link.submenu) {
                        e.preventDefault();
                        toggleSubmenu(link.href);
                      }
                    }}
                    className={cn(
                      "flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      pathname === link.href 
                        ? "bg-blue-100 text-blue-800" 
                        : "text-gray-700 hover:bg-gray-100",
                      link.submenu && "cursor-pointer"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      {link.icon}
                      {link.label}
                    </div>
                    {link.submenu && (
                      openSubmenus[link.href] ? 
                        <ChevronDown className="h-4 w-4" /> : 
                        <ChevronRight className="h-4 w-4" />
                    )}
                  </Link>
                  
                  {link.submenu && openSubmenus[link.href] && (
                    <div className="ml-8 mt-1 space-y-1">
                      {link.submenu.map((subLink) => (
                        <Link
                          key={subLink.href}
                          href={subLink.href}
                          className={cn(
                            "block rounded-md px-3 py-2 text-sm font-medium transition-colors",
                            pathname === subLink.href 
                              ? "bg-blue-50 text-blue-700" 
                              : "text-gray-600 hover:bg-gray-50"
                          )}
                        >
                          {subLink.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </nav>
        </div>
        
        {user && (
          <div className="border-t p-4">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 rounded-full bg-gray-200">
                <Image 
                  src={user.imageUrl || assets.avatar} 
                  alt="User" 
                  fill 
                  className="rounded-full object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user.role}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;