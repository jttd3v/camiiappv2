import React from "react";
import { Card } from "@/components/ui/card";

export default function FormHeader({ dateApplied, crewType, onCrewTypeChange, photoUrl, onPhotoUpload }) {
  return (
    <Card className="border-none shadow-sm bg-white">
      {/* Company Header */}
      <div className="flex flex-col md:flex-row items-center p-6 border-b border-slate-200">
        <div className="w-16 h-16 md:w-20 md:h-20 border-2 border-blue-200 rounded-xl flex items-center justify-center shrink-0 bg-blue-50 mb-4 md:mb-0 md:mr-6">
          <div className="text-center text-xs font-bold text-blue-600">CAMI<br/>Logo</div>
        </div>
        <div className="flex-1 text-center mb-4 md:mb-0">
          <div className="font-bold text-xl md:text-2xl text-blue-600 mb-2">
            Cebu Ace-Maritime International Inc.
          </div>
          <div className="text-sm text-slate-600 leading-relaxed">
            2nd Floor ACE Bldg., N. Escario St. Lahug, Cebu City 6000<br/>
            Tel: (032) 233-8568 / (032) 505-1879<br/>
            email: cam@gmail.com
          </div>
        </div>
        <div className="text-xs text-slate-500 md:text-right min-w-[140px] space-y-1">
          <div>CAMI OPS - 02-012</div>
          <div>Revision: 00</div>
          <div>Date: 04 July 2022</div>
          <div className="pt-2">
            <strong className="text-slate-700">ClassNK</strong><br/>
            ISO 9001:2015
          </div>
        </div>
      </div>

      {/* Form Title */}
      <div className="text-center font-bold text-2xl md:text-3xl text-blue-600 py-6 border-b border-slate-200">
        CAMII APPLICATION FORM
      </div>

      {/* Date and Photo Section */}
      <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-200 gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center">
            <strong className="font-semibold text-slate-700 mr-3">Date Applied:</strong> 
            <span className="font-medium text-slate-600">
              {dateApplied || new Date().toLocaleDateString()}
            </span>
          </div>
          <div className="flex gap-6 items-center">
            <label className="flex items-center cursor-pointer text-slate-700 hover:text-blue-600 transition-colors">
              <input 
                type="checkbox" 
                checked={crewType === "new" || crewType === "both"}
                onChange={(e) => {
                  if (e.target.checked) {
                    onCrewTypeChange(crewType === "ex" ? "both" : "new");
                  } else {
                    onCrewTypeChange(crewType === "both" ? "ex" : "");
                  }
                }}
                className="mr-2 h-4 w-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500 focus:ring-2" 
              />
              <span className="font-medium">New Crew</span>
            </label>
            <label className="flex items-center cursor-pointer text-slate-700 hover:text-blue-600 transition-colors">
              <input 
                type="checkbox" 
                checked={crewType === "ex" || crewType === "both"}
                onChange={(e) => {
                  if (e.target.checked) {
                    onCrewTypeChange(crewType === "new" ? "both" : "ex");
                  } else {
                    onCrewTypeChange(crewType === "both" ? "new" : "");
                  }
                }}
                className="mr-2 h-4 w-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500 focus:ring-2" 
              />
              <span className="font-medium">Ex-Crew</span>
            </label>
          </div>
          <div>
            <em className="text-sm text-slate-500">(Please fill out all items)</em>
          </div>
        </div>
        
        {/* Photo Upload Section */}
        <div className="relative">
          <input 
            type="file" 
            accept="image/*" 
            onChange={onPhotoUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
          <div className="w-32 h-40 border-2 border-dashed border-slate-300 rounded-lg flex items-center justify-center text-center p-3 text-slate-500 bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer overflow-hidden">
            {photoUrl ? (
              <img src={photoUrl} alt="Photo Preview" className="w-full h-full object-cover rounded" />
            ) : (
              <div className="flex flex-col items-center justify-center">
                <span className="text-sm font-medium">COLORED PHOTO</span>
                <span className="text-xs">(Passport Size)</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}