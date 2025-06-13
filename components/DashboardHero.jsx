import Image from "next/image";
import { assets } from "@/assets/assets";
import { Button } from "./ui/button";
import { Calendar, Clock, Stethoscope } from "lucide-react";

const DashboardHero = ({ user }) => {
  const stats = [
    { label: "Upcoming Appointments", value: "5", icon: <Calendar className="h-5 w-5" /> },
    { label: "Patients Today", value: "12", icon: <User className="h-5 w-5" /> },
    { label: "Pending Records", value: "3", icon: <FileText className="h-5 w-5" /> },
  ];

  return (
    <section className="w-full bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col justify-center space-y-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              {user?.role === "doctor" ? `Welcome Dr. ${user.name}` : `Hello ${user?.name || 'User'}`}
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              {user?.role === "doctor" 
                ? "Your patients are waiting for your care." 
                : "We're here to take care of your health."}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <Button className="gap-2">
              <Calendar className="h-4 w-4" />
              {user?.role === "patient" ? "Book Appointment" : "View Schedule"}
            </Button>
            <Button variant="outline" className="gap-2">
              <Stethoscope className="h-4 w-4" />
              Find a Doctor
            </Button>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                    <p className="text-xl font-bold">{stat.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="hidden md:flex items-center justify-center">
          <Image
            src={assets.hospital_team}
            alt="Hospital Team"
            width={500}
            height={300}
            className="rounded-lg object-cover shadow-md"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default DashboardHero;