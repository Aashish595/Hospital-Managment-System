import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import ReactQueryProvider from "@/components/ReactQueryProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import { Inter } from "next/font/google";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "MediCare HMS - Hospital Management System",
  description: "Comprehensive web-based Hospital Management System",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} antialiased`}>
          <ReactQueryProvider>
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
            <Toaster /> {/* For showing notifications/toasts */}
          </ReactQueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}