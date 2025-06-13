import Image from "next/image";
import { assets } from "@/assets/assets";
import { Button } from "./ui/button";
import { Clock, MapPin, Stethoscope, MoreVertical } from "lucide-react";
import { Badge } from "./ui/badge";

const AppointmentCard = ({ appointment }) => {
  const statusColors = {
    scheduled: "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
    in_progress: "bg-yellow-100 text-yellow-800",
  };

  return (
    <div className="p-5 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border">
      <div className="flex flex-col md:flex-row gap-5">
        <div className="relative h-24 w-24 flex-shrink-0 rounded-lg overflow-hidden">
          <Image
            src={appointment.patientImage || assets.avatar}
            alt={appointment.patientName}
            fill
            className="object-cover"
          />
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-bold text-lg">{appointment.patientName}</h4>
              <p className="text-sm text-gray-600 flex items-center gap-1">
                <Stethoscope className="h-4 w-4" />
                {appointment.doctorName}
              </p>
            </div>
            <Badge className={statusColors[appointment.status]}>
              {appointment.status.replace('_', ' ')}
            </Badge>
          </div>
          
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-gray-500" />
              <span>{appointment.date} at {appointment.time}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span>Room {appointment.room || '--'}</span>
            </div>
          </div>
          
          {appointment.notes && (
            <p className="mt-3 text-sm text-gray-600">
              <span className="font-medium">Notes:</span> {appointment.notes}
            </p>
          )}
        </div>
      </div>
      
      <div className="mt-4 flex justify-end gap-2">
        <Button variant="outline" size="sm">
          Reschedule
        </Button>
        <Button size="sm">
          View Details
        </Button>
        <Button variant="ghost" size="sm" className="p-2">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default AppointmentCard;