"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import DashboardHero from "@/components/DashboardHero";
import AppointmentCard from "@/components/AppointmentCard";
import MedicalRecordCard from "@/components/MedicalRecordCard";

const PatientDashboard = () => {
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const userRes = await fetch("/api/users/me");
      const apptRes = await fetch("/api/appointments");
      const recordRes = await fetch("/api/medical-records");
      const userData = await userRes.json();
      const apptData = await apptRes.json();
      const recordData = await recordRes.json();
      setUser(userData.user);
      setAppointments(apptData.data.filter((a) => a.patientId === userData.user._id));
      setRecords(recordData.data.filter((r) => r.patientId === userData.user._id));
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
          <h2 className="text-xl font-bold">My Appointments</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {appointments.map((appt) => (
              <AppointmentCard key={appt._id} appointment={appt} />
            ))}
          </div>
          <h2 className="text-xl font-bold">My Medical Records</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {records.map((rec) => (
              <MedicalRecordCard key={rec._id} record={rec} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default PatientDashboard;
