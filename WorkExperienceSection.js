import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";

export default function WorkExperienceSection({ data, onChange }) {
  const addWorkExperience = () => {
    const newExperience = {
      company_name: "",
      position: "",
      location: "",
      date_from: "",
      date_to: "",
      reason_for_leaving: ""
    };
    onChange([...data, newExperience]);
  };

  const removeWorkExperience = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateWorkExperience = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold text-blue-600">5. WORK EXPERIENCE</CardTitle>
          <Button
            type="button"
            onClick={addWorkExperience}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Work Experience
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {data.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            <p>No work experience added yet.</p>
            <p className="text-sm">Click "Add Work Experience" to start.</p>
          </div>
        ) : (
          data.map((experience, index) => (
            <div key={index} className="p-4 border border-slate-200 rounded-lg bg-slate-50">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium text-slate-700">Work Experience {index + 1}</h4>
                <Button
                  type="button"
                  onClick={() => removeWorkExperience(index)}
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <Label>Company Name</Label>
                  <Input
                    value={experience.company_name || ""}
                    onChange={(e) => updateWorkExperience(index, "company_name", e.target.value)}
                    placeholder="Company name"
                  />
                </div>
                <div>
                  <Label>Position</Label>
                  <Input
                    value={experience.position || ""}
                    onChange={(e) => updateWorkExperience(index, "position", e.target.value)}
                    placeholder="Job position/title"
                  />
                </div>
                <div>
                  <Label>Location</Label>
                  <Input
                    value={experience.location || ""}
                    onChange={(e) => updateWorkExperience(index, "location", e.target.value)}
                    placeholder="City, Province/Country"
                  />
                </div>
                <div>
                  <Label>Date From</Label>
                  <Input
                    type="date"
                    value={experience.date_from || ""}
                    onChange={(e) => updateWorkExperience(index, "date_from", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Date To</Label>
                  <Input
                    type="date"
                    value={experience.date_to || ""}
                    onChange={(e) => updateWorkExperience(index, "date_to", e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label>Reason for Leaving</Label>
                <Textarea
                  value={experience.reason_for_leaving || ""}
                  onChange={(e) => updateWorkExperience(index, "reason_for_leaving", e.target.value)}
                  placeholder="Brief reason for leaving this position"
                  className="h-16"
                />
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}