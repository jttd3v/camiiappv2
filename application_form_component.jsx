import React, { useState } from "react";
import { Application } from "@/entities/Application";
import { UploadFile } from "@/integrations/Core";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Save, FileText, CheckCircle } from "lucide-react";

import FormHeader from "../components/application/FormHeader";
import PersonalInfoSection from "../components/application/PersonalInfoSection";
import ContactInfoSection from "../components/application/ContactInfoSection";
import FamilyBackgroundSection from "../components/application/FamilyBackgroundSection";
import EducationSection from "../components/application/EducationSection";
import WorkExperienceSection from "../components/application/WorkExperienceSection";
import SeaExperienceSection from "../components/application/SeaExperienceSection";

export default function Application() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [srn, setSrn] = useState("");
  const [crewType, setCrewType] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [formData, setFormData] = useState({
    personal_info: {},
    contact_info: {},
    family_background: [],
    education: [],
    work_experience: [],
    sea_experience: []
  });

  const handlePhotoUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const { file_url } = await UploadFile({ file });
        setPhotoUrl(file_url);
      } catch (error) {
        console.error("Error uploading photo:", error);
      }
    }
  };

  const updatePersonalInfo = (field, value) => {
    setFormData(prev => ({
      ...prev,
      personal_info: {
        ...prev.personal_info,
        [field]: value
      }
    }));
  };

  const updateContactInfo = (field, value) => {
    setFormData(prev => ({
      ...prev,
      contact_info: {
        ...prev.contact_info,
        [field]: value
      }
    }));
  };

  const calculateProgress = () => {
    let totalFields = 0;
    let filledFields = 0;

    const personalRequiredFields = ['last_name', 'first_name', 'birth_date', 'gender'];
    totalFields += personalRequiredFields.length;
    filledFields += personalRequiredFields.filter(field => formData.personal_info[field]).length;

    const contactRequiredFields = ['address', 'mobile_number', 'email'];
    totalFields += contactRequiredFields.length;
    filledFields += contactRequiredFields.filter(field => formData.contact_info[field]).length;

    totalFields += 4;
    if (formData.family_background.length > 0) filledFields += 1;
    if (formData.education.length > 0) filledFields += 1;
    if (formData.work_experience.length > 0) filledFields += 1;
    if (formData.sea_experience.length > 0) filledFields += 1;

    return Math.round((filledFields / totalFields) * 100);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const applicationData = {
        srn,
        date_applied: new Date().toISOString().split('T')[0],
        crew_type: crewType,
        photo_url: photoUrl,
        ...formData,
        status: "submitted"
      };

      await Application.create(applicationData);
      navigate(createPageUrl("Dashboard"));
    } catch (error) {
      console.error("Error submitting application:", error);
    }
    setIsSubmitting(false);
  };

  const saveAsDraft = async () => {
    setIsSubmitting(true);
    try {
      const applicationData = {
        srn,
        date_applied: new Date().toISOString().split('T')[0],
        crew_type: crewType,
        photo_url: photoUrl,
        ...formData,
        status: "draft"
      };

      await Application.create(applicationData);
      navigate(createPageUrl("Dashboard"));
    } catch (error) {
      console.error("Error saving draft:", error);
    }
    setIsSubmitting(false);
  };

  const progress = calculateProgress();

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-slate-700">Application Progress</span>
            <span className="text-sm font-medium text-blue-600">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <FormHeader
          dateApplied={new Date().toLocaleDateString()}
          crewType={crewType}
          onCrewTypeChange={setCrewType}
          photoUrl={photoUrl}
          onPhotoUpload={handlePhotoUpload}
        />

        <PersonalInfoSection 
          data={formData.personal_info}
          onChange={updatePersonalInfo}
          srn={srn}
          onSrnChange={setSrn}
        />

        <ContactInfoSection 
          data={formData.contact_info}
          onChange={updateContactInfo}
        />

        <FamilyBackgroundSection 
          data={formData.family_background}
          onChange={(data) => setFormData(prev => ({ ...prev, family_background: data }))}
        />

        <EducationSection 
          data={formData.education}
          onChange={(data) => setFormData(prev => ({ ...prev, education: data }))}
        />

        <WorkExperienceSection 
          data={formData.work_experience}
          onChange={(data) => setFormData(prev => ({ ...prev, work_experience: data }))}
        />

        <SeaExperienceSection 
          data={formData.sea_experience}
          onChange={(data) => setFormData(prev => ({ ...prev, sea_experience: data }))}
        />

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <Button
              onClick={saveAsDraft}
              variant="outline"
              disabled={isSubmitting}
              className="flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save as Draft
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || progress < 50}
              className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
          </div>
          {progress < 50 && (
            <p className="text-sm text-slate-500 mt-2 text-right">
              Complete at least 50% to submit application
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
