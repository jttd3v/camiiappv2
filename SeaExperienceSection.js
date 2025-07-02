import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";

const maritimeRanks = [
  "Master",
  "Chief Officer",
  "Second Officer", 
  "Third Officer",
  "Chief Engineer",
  "Second Engineer",
  "Third Engineer",
  "Fourth Engineer",
  "Bosun",
  "Able Seaman",
  "Ordinary Seaman",
  "Oiler",
  "Wiper",
  "Cook",
  "Messman",
  "Cadet"
];

const shipTypes = [
  "Bulk Carrier",
  "Container Ship",
  "Tanker",
  "General Cargo",
  "RoRo",
  "Passenger Ship",
  "Cruise Ship",
  "LNG Carrier",
  "LPG Carrier",
  "Chemical Tanker",
  "Product Tanker",
  "Crude Oil Tanker",
  "Car Carrier",
  "Heavy Lift",
  "Offshore Supply Vessel",
  "Tug Boat",
  "Other"
];

const bwtsTypes = [
  "Alfa Laval PureBallast",
  "Wartsila Aquarius",
  "Ecochlor",
  "Optimarin",
  "Techcross",
  "JFE BallastAce",
  "Panasia",
  "Sunrui",
  "N/A"
];

const ecdisModels = [
  "Furuno ECDIS",
  "JRC ECDIS", 
  "Transas ECDIS",
  "Raytheon ECDIS",
  "Sperry Marine ECDIS",
  "Wartsila ECDIS",
  "Consilium ECDIS",
  "SAM ECDIS",
  "N/A"
];

export default function SeaExperienceSection({ data, onChange }) {
  const addSeaExperience = () => {
    const newExperience = {
      rank: "",
      vessel_name: "",
      vessel_registry: "",
      year_built: "",
      ship_type: "",
      gross_tonnage: "",
      main_engine_type: "",
      horsepower_kw: "",
      manning_crewing_agency: "",
      ballast_water_treatment_system: "",
      nox_tier_equipment: "",
      ecdis_type_model: "",
      reason_for_leaving: "",
      trading_route: "",
      date_from: "",
      date_to: "",
      total_service_duration: ""
    };
    onChange([...data, newExperience]);
  };

  const removeSeaExperience = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateSeaExperience = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const calculateServiceDuration = (dateFrom, dateTo) => {
    if (!dateFrom || !dateTo) return "";
    
    const start = new Date(dateFrom);
    const end = new Date(dateTo);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const months = Math.floor(diffDays / 30);
    const days = diffDays % 30;
    
    return `${months} months, ${days} days`;
  };

  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold text-blue-600">6. SEA EXPERIENCE</CardTitle>
          <Button
            type="button"
            onClick={addSeaExperience}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Sea Experience
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {data.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            <p>No sea experience added yet.</p>
            <p className="text-sm">Click "Add Sea Experience" to start.</p>
          </div>
        ) : (
          data.map((experience, index) => (
            <div key={index} className="p-6 border border-slate-200 rounded-lg bg-slate-50">
              <div className="flex justify-between items-center mb-6">
                <h4 className="font-semibold text-lg text-blue-600">Experience #{index + 1}</h4>
                <Button
                  type="button"
                  onClick={() => removeSeaExperience(index)}
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <Label>Rank</Label>
                  <Select 
                    value={experience.rank || ""} 
                    onValueChange={(value) => updateSeaExperience(index, "rank", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Rank" />
                    </SelectTrigger>
                    <SelectContent>
                      {maritimeRanks.map((rank) => (
                        <SelectItem key={rank} value={rank}>{rank}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Vessel Name</Label>
                  <Input
                    value={experience.vessel_name || ""}
                    onChange={(e) => updateSeaExperience(index, "vessel_name", e.target.value)}
                    placeholder="Enter Vessel Name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <Label>Vessel Registry</Label>
                  <Input
                    value={experience.vessel_registry || ""}
                    onChange={(e) => updateSeaExperience(index, "vessel_registry", e.target.value)}
                    placeholder="Enter Vessel Registry"
                  />
                </div>
                <div>
                  <Label>Year Built</Label>
                  <Input
                    value={experience.year_built || ""}
                    onChange={(e) => updateSeaExperience(index, "year_built", e.target.value)}
                    placeholder="Enter Year Built"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <Label>Ship Type</Label>
                  <Select 
                    value={experience.ship_type || ""} 
                    onValueChange={(value) => updateSeaExperience(index, "ship_type", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Enter Ship Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {shipTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Gross Tonnage</Label>
                  <Input
                    value={experience.gross_tonnage || ""}
                    onChange={(e) => updateSeaExperience(index, "gross_tonnage", e.target.value)}
                    placeholder="Enter Gross Tonnage"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <Label>Main Engine Type</Label>
                  <Input
                    value={experience.main_engine_type || ""}
                    onChange={(e) => updateSeaExperience(index, "main_engine_type", e.target.value)}
                    placeholder="Enter Main Engine Type"
                  />
                </div>
                <div>
                  <Label>Horsepower or kW</Label>
                  <Input
                    value={experience.horsepower_kw || ""}
                    onChange={(e) => updateSeaExperience(index, "horsepower_kw", e.target.value)}
                    placeholder="Enter Horsepower or kW"
                  />
                </div>
              </div>

              <div className="mb-4">
                <Label>Manning or Crewing Agency</Label>
                <Input
                  value={experience.manning_crewing_agency || ""}
                  onChange={(e) => updateSeaExperience(index, "manning_crewing_agency", e.target.value)}
                  placeholder="Enter Manning or Crewing Agency"
                />
              </div>

              <div className="mb-4">
                <Label>Ballast Water Treatment System</Label>
                <Select 
                  value={experience.ballast_water_treatment_system || ""} 
                  onValueChange={(value) => updateSeaExperience(index, "ballast_water_treatment_system", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select BWTS Type (or N/A)" />
                  </SelectTrigger>
                  <SelectContent>
                    {bwtsTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="mb-4">
                <Label>NOx Tier III Equipment</Label>
                <Input
                  value={experience.nox_tier_equipment || ""}
                  onChange={(e) => updateSeaExperience(index, "nox_tier_equipment", e.target.value)}
                  placeholder="Enter NOx Tier III Equipment (or N/A)"
                />
              </div>

              <div className="mb-4">
                <Label>ECDIS Type/Model</Label>
                <Select 
                  value={experience.ecdis_type_model || ""} 
                  onValueChange={(value) => updateSeaExperience(index, "ecdis_type_model", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select ECDIS Model (or N/A)" />
                  </SelectTrigger>
                  <SelectContent>
                    {ecdisModels.map((model) => (
                      <SelectItem key={model} value={model}>{model}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <Label>Reason for Leaving</Label>
                  <Textarea
                    value={experience.reason_for_leaving || ""}
                    onChange={(e) => updateSeaExperience(index, "reason_for_leaving", e.target.value)}
                    placeholder="Enter Reason for Leaving"
                    className="h-16"
                  />
                </div>
                <div>
                  <Label>Trading Route</Label>
                  <Textarea
                    value={experience.trading_route || ""}
                    onChange={(e) => updateSeaExperience(index, "trading_route", e.target.value)}
                    placeholder="Enter Trading Route (e.g., Asia-Europe)"
                    className="h-16"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <Label>From</Label>
                  <Input
                    type="date"
                    value={experience.date_from || ""}
                    onChange={(e) => {
                      updateSeaExperience(index, "date_from", e.target.value);
                      if (experience.date_to) {
                        const duration = calculateServiceDuration(e.target.value, experience.date_to);
                        updateSeaExperience(index, "total_service_duration", duration);
                      }
                    }}
                  />
                </div>
                <div>
                  <Label>To</Label>
                  <Input
                    type="date"
                    value={experience.date_to || ""}
                    onChange={(e) => {
                      updateSeaExperience(index, "date_to", e.target.value);
                      if (experience.date_from) {
                        const duration = calculateServiceDuration(experience.date_from, e.target.value);
                        updateSeaExperience(index, "total_service_duration", duration);
                      }
                    }}
                  />
                </div>
                <div>
                  <Label>Total Service Duration</Label>
                  <Input
                    value={experience.total_service_duration || ""}
                    onChange={(e) => updateSeaExperience(index, "total_service_duration", e.target.value)}
                    placeholder="Auto-calculated or enter manually"
                    className="bg-slate-100"
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}