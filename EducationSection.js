import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";

const educationLevels = [
  "Elementary",
  "High School",
  "Vocational/Technical",
  "College/University",
  "Graduate Studies"
];

export default function EducationSection({ data, onChange }) {
  const addEducation = () => {
    const newEducation = {
      level: "",
      school_name: "",
      course: "",
      location: "",
      year_from: "",
      year_to: "",
      graduated: false
    };
    onChange([...data, newEducation]);
  };

  const removeEducation = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateEducation = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold text-blue-600">4. EDUCATIONAL BACKGROUND</CardTitle>
          <Button
            type="button"
            onClick={addEducation}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Education
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {data.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            <p>No educational background added yet.</p>
            <p className="text-sm">Click "Add Education" to start.</p>
          </div>
        ) : (
          data.map((education, index) => (
            <div key={index} className="p-4 border border-slate-200 rounded-lg bg-slate-50">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium text-slate-700">Education {index + 1}</h4>
                <Button
                  type="button"
                  onClick={() => removeEducation(index)}
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label>Education Level</Label>
                  <Select 
                    value={education.level || ""} 
                    onValueChange={(value) => updateEducation(index, "level", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      {educationLevels.map((level) => (
                        <SelectItem key={level} value={level}>{level}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>School/Institution Name</Label>
                  <Input
                    value={education.school_name || ""}
                    onChange={(e) => updateEducation(index, "school_name", e.target.value)}
                    placeholder="School name"
                  />
                </div>
                <div>
                  <Label>Course/Degree</Label>
                  <Input
                    value={education.course || ""}
                    onChange={(e) => updateEducation(index, "course", e.target.value)}
                    placeholder="Course or degree"
                  />
                </div>
                <div>
                  <Label>Location</Label>
                  <Input
                    value={education.location || ""}
                    onChange={(e) => updateEducation(index, "location", e.target.value)}
                    placeholder="City, Province"
                  />
                </div>
                <div>
                  <Label>Year From</Label>
                  <Input
                    value={education.year_from || ""}
                    onChange={(e) => updateEducation(index, "year_from", e.target.value)}
                    placeholder="e.g., 2015"
                  />
                </div>
                <div>
                  <Label>Year To</Label>
                  <Input
                    value={education.year_to || ""}
                    onChange={(e) => updateEducation(index, "year_to", e.target.value)}
                    placeholder="e.g., 2019"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="flex items-center cursor-pointer text-slate-700">
                  <input
                    type="checkbox"
                    checked={education.graduated || false}
                    onChange={(e) => updateEducation(index, "graduated", e.target.checked)}
                    className="mr-2 h-4 w-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                  />
                  <span>Graduated</span>
                </label>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}