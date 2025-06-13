import Image from "next/image";
import { assets } from "@/assets/assets";
import { Button } from "./ui/button";
import { FileText, User, Calendar, Download } from "lucide-react";
import { Badge } from "./ui/badge";

const MedicalRecordCard = ({ record }) => {
  return (
    <div className="p-5 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border group">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <User className="h-5 w-5 text-blue-600" />
            {record.patientName}
          </h3>
          <p className="text-sm text-gray-500 mt-1">Record ID: {record.id}</p>
        </div>
        <Badge variant="outline" className="bg-green-50 text-green-700">
          {record.type}
        </Badge>
      </div>
      
      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4 text-gray-500" />
          <span>Date: {record.date}</span>
        </div>
        <div className="flex items-start gap-2 text-sm">
          <FileText className="h-4 w-4 text-gray-500 mt-0.5" />
          <div>
            <p className="font-medium">Diagnosis:</p>
            <p className="text-gray-600">{record.diagnosis}</p>
          </div>
        </div>
        
        {record.treatment && (
          <div className="flex items-start gap-2 text-sm">
            <FileText className="h-4 w-4 text-gray-500 mt-0.5" />
            <div>
              <p className="font-medium">Treatment:</p>
              <p className="text-gray-600">{record.treatment}</p>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-4 flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button variant="outline" size="sm" className="gap-1">
          <Download className="h-4 w-4" />
          Download
        </Button>
        <Button size="sm">View Full Record</Button>
      </div>
    </div>
  );
};

export default MedicalRecordCard;