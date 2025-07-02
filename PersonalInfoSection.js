import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function PersonalInfoSection({ data, onChange, srn, onSrnChange }) {
  const handleAgeChange = (e) => {
    const value = e.target.value;
    if (value === "") {
      onChange("age", "");
    } else {
      const numValue = parseInt(value);
      if (!isNaN(numValue)) {
        onChange("age", numValue);
      }
    }
  };

  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold text-blue-600">1. PERSONAL INFORMATION</CardTitle>
          <div className="flex items-center gap-3">
            <Label htmlFor="srn" className="font-semibold text-slate-700">SRN:</Label>
            <Input
              id="srn"
              value={srn}
              onChange={(e) => onSrnChange(e.target.value)}
              placeholder="Enter SRN"
              className="w-48"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label className="font-semibold text-slate-700 mb-3 block">1. FULL NAME:</Label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="last_name">Last Name</Label>
              <Input
                id="last_name"
                value={data.last_name || ""}
                onChange={(e) => onChange("last_name", e.target.value)}
                placeholder="Last Name"
              />
            </div>
            <div>
              <Label htmlFor="first_name">First Name</Label>
              <Input
                id="first_name"
                value={data.first_name || ""}
                onChange={(e) => onChange("first_name", e.target.value)}
                placeholder="First Name"
              />
            </div>
            <div>
              <Label htmlFor="middle_name">Middle Name</Label>
              <Input
                id="middle_name"
                value={data.middle_name || ""}
                onChange={(e) => onChange("middle_name", e.target.value)}
                placeholder="Middle Name"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="birth_date">2. Date of Birth</Label>
            <Input
              id="birth_date"
              type="date"
              value={data.birth_date || ""}
              onChange={(e) => onChange("birth_date", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="birth_place">3. Place of Birth</Label>
            <Input
              id="birth_place"
              value={data.birth_place || ""}
              onChange={(e) => onChange("birth_place", e.target.value)}
              placeholder="Place of Birth"
            />
          </div>
          <div>
            <Label htmlFor="age">4. Age</Label>
            <Input
              id="age"
              type="number"
              value={data.age || ""}
              onChange={handleAgeChange}
              placeholder="Age"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <Label htmlFor="gender">5. Gender</Label>
            <Select value={data.gender || ""} onValueChange={(value) => onChange("gender", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="civil_status">6. Civil Status</Label>
            <Input
              id="civil_status"
              value={data.civil_status || ""}
              onChange={(e) => onChange("civil_status", e.target.value)}
              placeholder="Civil Status"
            />
          </div>
          <div>
            <Label htmlFor="nationality">7. Nationality</Label>
            <Input
              id="nationality"
              value={data.nationality || ""}
              onChange={(e) => onChange("nationality", e.target.value)}
              placeholder="Nationality"
            />
          </div>
          <div>
            <Label htmlFor="religion">8. Religion</Label>
            <Input
              id="religion"
              value={data.religion || ""}
              onChange={(e) => onChange("religion", e.target.value)}
              placeholder="Religion"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="height">9. Height</Label>
            <Input
              id="height"
              value={data.height || ""}
              onChange={(e) => onChange("height", e.target.value)}
              placeholder="Height (e.g., 5'8)"
            />
          </div>
          <div>
            <Label htmlFor="weight">10. Weight</Label>
            <Input
              id="weight"
              value={data.weight || ""}
              onChange={(e) => onChange("weight", e.target.value)}
              placeholder="Weight (e.g., 70kg)"
            />
          </div>
          <div>
            <Label htmlFor="nickname">Nickname</Label>
            <Input
              id="nickname"
              value={data.nickname || ""}
              onChange={(e) => onChange("nickname", e.target.value)}
              placeholder="Nickname"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="distinguishing_marks">11. Distinguishing Marks</Label>
          <Textarea
            id="distinguishing_marks"
            value={data.distinguishing_marks || ""}
            onChange={(e) => onChange("distinguishing_marks", e.target.value)}
            placeholder="Any distinguishing marks, scars, tattoos, etc."
            className="h-20"
          />
        </div>
      </CardContent>
    </Card>
  );
}