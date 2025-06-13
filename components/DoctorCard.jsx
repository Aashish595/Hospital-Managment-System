import Image from "next/image";
import { assets } from "@/assets/assets";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Star, MapPin, Clock, Calendar, Phone, Mail, Stethoscope } from "lucide-react";

const DoctorCard = ({ doctor }) => {
  const specialties = doctor.specialties || [];
  const availability = doctor.availability || [];

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border overflow-hidden group">
      {/* Doctor Image and Basic Info */}
      <div className="p-5 flex flex-col md:flex-row gap-5">
        <div className="relative h-32 w-32 flex-shrink-0 rounded-lg overflow-hidden border">
          <Image
            src={doctor.image || assets.doctor_placeholder}
            alt={`Dr. ${doctor.name}`}
            fill
            className="object-cover"
          />
          {doctor.isAvailable && (
            <Badge className="absolute top-2 left-2 bg-green-100 text-green-800">
              Available
            </Badge>
          )}
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Stethoscope className="h-5 w-5 text-blue-600" />
                Dr. {doctor.name}
              </h3>
              <p className="text-gray-600">{doctor.designation}</p>
            </div>
            
            <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-md">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              <span className="font-medium">{doctor.rating || "4.8"}</span>
            </div>
          </div>

          {/* Specialties */}
          <div className="mt-3 flex flex-wrap gap-2">
            {specialties.slice(0, 3).map((specialty, index) => (
              <Badge key={index} variant="outline" className="text-blue-600 bg-blue-50">
                {specialty}
              </Badge>
            ))}
            {specialties.length > 3 && (
              <Badge variant="outline" className="bg-gray-100">
                +{specialties.length - 3} more
              </Badge>
            )}
          </div>

          {/* Contact Info */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-gray-500" />
              <a href={`tel:${doctor.phone}`} className="hover:text-blue-600">
                {doctor.phone || "Not provided"}
              </a>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-gray-500" />
              <a href={`mailto:${doctor.email}`} className="hover:text-blue-600 truncate">
                {doctor.email || "Not provided"}
              </a>
            </div>
            <div className="flex items-start gap-2 text-sm col-span-full">
              <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
              <span className="text-gray-600">
                {doctor.hospital || "Medical Center"}, {doctor.location || "City"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Availability Section */}
      <div className="border-t px-5 py-4 bg-gray-50">
        <h4 className="font-medium flex items-center gap-2 mb-3">
          <Clock className="h-5 w-5 text-blue-600" />
          Availability
        </h4>
        
        {availability.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {availability.map((slot, index) => (
              <div 
                key={index} 
                className="bg-white border rounded-md p-2 text-center text-sm"
              >
                <p className="font-medium">{slot.day}</p>
                <p className="text-gray-600">{slot.time}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No availability information</p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="border-t px-5 py-3 bg-white flex flex-col sm:flex-row justify-end gap-2">
        <Button variant="outline" className="gap-2">
          <Phone className="h-4 w-4" />
          Call Now
        </Button>
        <Button variant="outline" className="gap-2">
          <Mail className="h-4 w-4" />
          Message
        </Button>
        <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
          <Calendar className="h-4 w-4" />
          Book Appointment
        </Button>
      </div>
    </div>
  );
};

export default DoctorCard;