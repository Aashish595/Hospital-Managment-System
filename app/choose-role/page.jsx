"use client";

import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { UserCog, Stethoscope, User, ArrowRight } from "lucide-react";

export default function ChooseRole() {
  const router = useRouter();
  const { user } = useUser();

  const handleSelect = async (role) => {
    if (user) {
      await user.update({
        publicMetadata: { role },
      });
      router.push(`/dashboard/${role}`);
    } else {
      router.push("/sign-in");
    }
  };

  const roles = [
    {
      id: "admin",
      title: "Administrator",
      description: "Manage hospital operations, staff, and system settings",
      icon: <UserCog className="w-8 h-8" />,
      color: "bg-blue-100",
      textColor: "text-blue-600",
      buttonColor: "bg-blue-600 hover:bg-blue-700",
    },
    {
      id: "doctor",
      title: "Doctor",
      description: "View appointments, manage patients, and update records",
      icon: <Stethoscope className="w-8 h-8" />,
      color: "bg-green-100",
      textColor: "text-green-600",
      buttonColor: "bg-green-600 hover:bg-green-700",
    },
    {
      id: "patient",
      title: "Patient",
      description: "Book appointments, view records, and communicate with doctors",
      icon: <User className="w-8 h-8" />,
      color: "bg-purple-100",
      textColor: "text-purple-600",
      buttonColor: "bg-purple-600 hover:bg-purple-700",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Welcome to <span className="text-blue-600">MediCare HMS</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Please select your role to continue to your personalized dashboard
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {roles.map((role) => (
            <div
              key={role.id}
              className={`p-1 rounded-xl ${role.color} transition-all duration-300 hover:shadow-lg`}
            >
              <div className="bg-white p-6 rounded-lg h-full flex flex-col">
                <div className={`w-16 h-16 ${role.color} rounded-full flex items-center justify-center mb-4`}>
                  {role.icon}
                </div>
                <h2 className={`text-xl font-bold mb-2 ${role.textColor}`}>{role.title}</h2>
                <p className="text-gray-600 mb-6 flex-grow">{role.description}</p>
                <button
                  onClick={() => handleSelect(role.id)}
                  className={`${role.buttonColor} text-white px-4 py-2 rounded-md flex items-center justify-center gap-2 transition-colors`}
                >
                  Continue as {role.title}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {!user && (
          <div className="mt-8 text-center text-gray-500">
            Already have an account?{" "}
            <button 
              onClick={() => router.push("/sign-in")} 
              className="text-blue-600 hover:underline"
            >
              Sign in here
            </button>
          </div>
        )}
      </div>
    </div>
  );
}