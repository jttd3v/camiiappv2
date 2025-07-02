import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ContactInfoSection({ data, onChange }) {
  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold text-blue-600">2. CONTACT INFORMATION</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Address */}
        <div>
          <Label htmlFor="address">Present Address</Label>
          <Textarea
            id="address"
            value={data.address || ""}
            onChange={(e) => onChange("address", e.target.value)}
            placeholder="Complete address including street, barangay, city/municipality, province"
            className="h-20"
          />
        </div>

        {/* Contact Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <Label htmlFor="zip_code">Zip Code</Label>
            <Input
              id="zip_code"
              value={data.zip_code || ""}
              onChange={(e) => onChange("zip_code", e.target.value)}
              placeholder="Zip Code"
            />
          </div>
          <div>
            <Label htmlFor="tel_number">Telephone Number</Label>
            <Input
              id="tel_number"
              value={data.tel_number || ""}
              onChange={(e) => onChange("tel_number", e.target.value)}
              placeholder="(032) 123-4567"
            />
          </div>
          <div>
            <Label htmlFor="mobile_number">Mobile Number</Label>
            <Input
              id="mobile_number"
              value={data.mobile_number || ""}
              onChange={(e) => onChange("mobile_number", e.target.value)}
              placeholder="+63 912 345 6789"
            />
          </div>
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={data.email || ""}
              onChange={(e) => onChange("email", e.target.value)}
              placeholder="your.email@example.com"
            />
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="border-t border-slate-200 pt-6">
          <h3 className="font-semibold text-slate-700 mb-4">Emergency Contact Information</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="emergency_contact_name">Contact Person Name</Label>
                <Input
                  id="emergency_contact_name"
                  value={data.emergency_contact_name || ""}
                  onChange={(e) => onChange("emergency_contact_name", e.target.value)}
                  placeholder="Full name of emergency contact"
                />
              </div>
              <div>
                <Label htmlFor="emergency_contact_relationship">Relationship</Label>
                <Input
                  id="emergency_contact_relationship"
                  value={data.emergency_contact_relationship || ""}
                  onChange={(e) => onChange("emergency_contact_relationship", e.target.value)}
                  placeholder="e.g., Mother, Father, Spouse, Sibling"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="emergency_contact_address">Emergency Contact Address</Label>
              <Textarea
                id="emergency_contact_address"
                value={data.emergency_contact_address || ""}
                onChange={(e) => onChange("emergency_contact_address", e.target.value)}
                placeholder="Complete address of emergency contact"
                className="h-16"
              />
            </div>
            <div>
              <Label htmlFor="emergency_contact_number">Emergency Contact Number</Label>
              <Input
                id="emergency_contact_number"
                value={data.emergency_contact_number || ""}
                onChange={(e) => onChange("emergency_contact_number", e.target.value)}
                placeholder="+63 912 345 6789"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}