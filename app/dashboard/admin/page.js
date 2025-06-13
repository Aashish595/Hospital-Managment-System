"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import DashboardHero from "@/components/DashboardHero";
import DoctorCard from "@/components/DoctorCard";
import AppointmentCard from "@/components/AppointmentCard";

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const userRes = await fetch("/api/users/me");
      const docRes = await fetch("/api/doctors");
      const apptRes = await fetch("/api/appointments");
      const userData = await userRes.json();
      const docData = await docRes.json();
      const apptData = await apptRes.json();
      setUser(userData.user);
      setDoctors(docData.data);
      setAppointments(apptData.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="p-6 flex-1 space-y-6">
          {user && <DashboardHero user={user} />}
          <h2 className="text-xl font-bold">Doctors</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {doctors.map(doc => (
              <DoctorCard key={doc._id} doctor={doc} />
            ))}
          </div>
          <h2 className="text-xl font-bold">Recent Appointments</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {appointments.slice(0, 4).map(appt => (
              <AppointmentCard key={appt._id} appointment={appt} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
