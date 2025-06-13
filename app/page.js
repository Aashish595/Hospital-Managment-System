"use client";
import Image from "next/image";
import { assets } from "@/assets/assets";
import {  Stethoscope, Brain, HeartPulse } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <main className="mt-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="container mx-auto px-6 py-16 md:py-24 flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 z-10">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Modern Healthcare <span className="text-blue-600">Redefined</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-lg">
                Your trusted healthcare management system. Book appointments,
                access medical records, and receive quality care from top
                specialists—all in one place.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/choose-role"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium text-center transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/20"
                >
                  Get Started
                </a>
                <a
                  href="#services"
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-medium text-center transition-all duration-300"
                >
                  Our Services
                </a>
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <Image
                src={assets.hospital_team}
                alt="Hospital Team"
                width={600}
                height={400}
                className="rounded-xl shadow-2xl z-10 relative"
                priority
              />
              <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-blue-100 rounded-full opacity-30 z-0"></div>
              <div className="absolute -top-8 -left-8 w-48 h-48 bg-blue-200 rounded-full opacity-20 z-0"></div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-blue-600 font-semibold">WHAT WE OFFER</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
                Comprehensive Healthcare Services
              </h2>
              <div className="w-24 h-1 bg-blue-600 mx-auto mt-4"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Cardiology Service */}
              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100 hover:border-blue-100">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <HeartPulse className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Cardiology</h3>
                <p className="text-gray-600 mb-4">
                  Advanced heart care with state-of-the-art diagnostic equipment
                  and experienced cardiologists.
                </p>
                <a
                  href="/services/cardiology"
                  className="text-blue-600 font-medium flex items-center gap-2 hover:text-blue-800"
                >
                  Learn more
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </div>

              {/* Neurology Service */}
              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100 hover:border-blue-100">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <Brain className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Neurology</h3>
                <p className="text-gray-600 mb-4">
                  Specialized care for neurological disorders with cutting-edge
                  treatment approaches.
                </p>
                <a
                  href="/services/neurology"
                  className="text-blue-600 font-medium flex items-center gap-2 hover:text-blue-800"
                >
                  Learn more
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </div>

              {/* General Practice */}
              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100 hover:border-blue-100">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <Stethoscope className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  General Practice
                </h3>
                <p className="text-gray-600 mb-4">
                  Comprehensive primary care for all ages with personalized
                  treatment plans.
                </p>
                <a
                  href="/services/general"
                  className="text-blue-600 font-medium flex items-center gap-2 hover:text-blue-800"
                >
                  Learn more
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="p-6">
                <div className="text-4xl font-bold mb-2">50+</div>
                <div className="text-blue-100">Specialist Doctors</div>
              </div>
              <div className="p-6">
                <div className="text-4xl font-bold mb-2">10K+</div>
                <div className="text-blue-100">Patients Treated</div>
              </div>
              <div className="p-6">
                <div className="text-4xl font-bold mb-2">24/7</div>
                <div className="text-blue-100">Emergency Service</div>
              </div>
              <div className="p-6">
                <div className="text-4xl font-bold mb-2">98%</div>
                <div className="text-blue-100">Patient Satisfaction</div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-blue-700 to-blue-900">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Take Control of Your Health?
            </h2>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-8">
              Join thousands of patients who trust our healthcare system for
              their medical needs.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="/dashboard/patient"
                className="bg-white text-blue-700 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Book Appointment Now
              </a>
              <a
                href="/contact"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-700 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}