"use client";

import Link from "next/link";
import Image from "next/image";
import { assets } from "@/assets/assets";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Bell, HelpCircle, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Navbar = ({ user }) => {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo and Main Links */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <Image src={assets.Logo} alt="Logo" width={36} height={36} />
            <span className="text-lg font-bold text-blue-600">MediCare HMS</span>
          </Link>

          {user && (
            <div className="hidden md:flex items-center gap-6">
              <Link 
                href="/dashboard" 
                className={`text-sm font-medium transition-colors hover:text-blue-600 ${pathname === '/dashboard' ? 'text-blue-600' : 'text-gray-600'}`}
              >
                Dashboard
              </Link>
              <Link 
                href="/appointments" 
                className={`text-sm font-medium transition-colors hover:text-blue-600 ${pathname.startsWith('/appointments') ? 'text-blue-600' : 'text-gray-600'}`}
              >
                Appointments
              </Link>
              <Link 
                href="/records" 
                className={`text-sm font-medium transition-colors hover:text-blue-600 ${pathname.startsWith('/records') ? 'text-blue-600' : 'text-gray-600'}`}
              >
                Medical Records
              </Link>
            </div>
          )}
        </div>

        {/* Search and User Area */}
        <div className="flex items-center gap-4">
          {user && (
            <>
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search patients, records..."
                  className="pl-9 w-[200px] lg:w-[300px]"
                />
              </div>
              
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
              </Button>
              
              <Button variant="ghost" size="icon">
                <HelpCircle className="h-5 w-5" />
              </Button>
            </>
          )}

          <div className="flex gap-2">
            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="outline">Sign In</Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button>Sign Up</Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;