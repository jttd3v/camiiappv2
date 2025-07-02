import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

export default function FamilyBackgroundSection({ data, onChange }) {
  const addFamilyMember = () => {
    const newMember = {
      name: "",
      relationship: "",
      age: "",
      occupation: "",
      address: ""
    };
    onChange([...data, newMember]);
  };

  const removeFamilyMember = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateFamilyMember = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold text-blue-600">3. FAMILY BACKGROUND</CardTitle>
          <Button
            type="button"
            onClick={addFamilyMember}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Family Member
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {data.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            <p>No family members added yet.</p>
            <p className="text-sm">Click "Add Family Member" to start.</p>
          </div>
        ) : (
          data.map((member, index) => (
            <div key={index} className="p-4 border border-slate-200 rounded-lg bg-slate-50">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium text-slate-700">Family Member {index + 1}</h4>
                <Button
                  type="button"
                  onClick={() => removeFamilyMember(index)}
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label>Name</Label>
                  <Input
                    value={member.name || ""}
                    onChange={(e) => updateFamilyMember(index, "name", e.target.value)}
                    placeholder="Full name"
                  />
                </div>
                <div>
                  <Label>Relationship</Label>
                  <Input
                    value={member.relationship || ""}
                    onChange={(e) => updateFamilyMember(index, "relationship", e.target.value)}
                    placeholder="e.g., Father, Mother, Spouse"
                  />
                </div>
                <div>
                  <Label>Age</Label>
                  <Input
                    type="number"
                    value={member.age || ""}
                    onChange={(e) => updateFamilyMember(index, "age", parseInt(e.target.value))}
                    placeholder="Age"
                  />
                </div>
                <div>
                  <Label>Occupation</Label>
                  <Input
                    value={member.occupation || ""}
                    onChange={(e) => updateFamilyMember(index, "occupation", e.target.value)}
                    placeholder="Occupation"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label>Address</Label>
                  <Input
                    value={member.address || ""}
                    onChange={(e) => updateFamilyMember(index, "address", e.target.value)}
                    placeholder="Address"
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