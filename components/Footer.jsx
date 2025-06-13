"use client";

import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Home, Stethoscope, User, ClipboardList, Calendar, Settings, FileText, Users, Lock } from "lucide-react";

const Footer = () => {
  const { user } = useUser();
  const role = user?.publicMetadata?.role || "guest";

  const commonLinks = [
    { href: "/about", label: "About Us", icon: <Home className="w-4 h-4" /> },
    { href: "/contact", label: "Contact", icon: <User className="w-4 h-4" /> },
    { href: "/privacy", label: "Privacy Policy", icon: <Lock className="w-4 h-4" /> },
  ];

  const roleSpecificLinks = {
    patient: [
      { href: "/dashboard/patient", label: "Dashboard", icon: <Home className="w-4 h-4" /> },
      { href: "/dashboard/patient/book", label: "Book Appointment", icon: <Calendar className="w-4 h-4" /> },
      { href: "/dashboard/patient/records", label: "My Records", icon: <FileText className="w-4 h-4" /> },
    ],
    doctor: [
      { href: "/dashboard/doctor", label: "Dashboard", icon: <Home className="w-4 h-4" /> },
      { href: "/dashboard/doctor/appointments", label: "Appointments", icon: <Calendar className="w-4 h-4" /> },
      { href: "/dashboard/doctor/patients", label: "Patients", icon: <Users className="w-4 h-4" /> },
    ],
    admin: [
      { href: "/dashboard/admin", label: "Dashboard", icon: <Home className="w-4 h-4" /> },
      { href: "/dashboard/admin/doctors", label: "Manage Doctors", icon: <Stethoscope className="w-4 h-4" /> },
      { href: "/dashboard/admin/patients", label: "Manage Patients", icon: <User className="w-4 h-4" /> },
    ],
    guest: [],
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Stethoscope className="w-8 h-8 text-blue-400" />
              <span className="text-xl font-bold">MediCare HMS</span>
            </div>
            <p className="text-gray-400">
              Your trusted healthcare management system providing quality care since 2015.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Quick Links</h3>
            <ul className="space-y-2">
              {commonLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                  >
                    {link.icon}
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Role-Specific Links */}
          {role !== "guest" && (
            <div>
              <h3 className="text-lg font-semibold mb-4 text-blue-400 capitalize">
                {role} Links
              </h3>
              <ul className="space-y-2">
                {roleSpecificLinks[role].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                    >
                      {link.icon}
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Contact Us</h3>
            <address className="not-italic text-gray-300 space-y-2">
              <p>123 Medical Center Drive</p>
              <p>Health City, HC 12345</p>
              <p>Email: info@medicare-hms.com</p>
              <p>Phone: (123) 456-7890</p>
            </address>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>© {currentYear} MediCare Hospital Management System. All rights reserved.</p>
          <p className="mt-2 text-sm">
            Designed with ❤️ for better healthcare experiences
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;