import React, { useState, useEffect } from "react";
import { Application } from "@/entities/Application";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Plus, FileText, Clock, CheckCircle, XCircle, Eye } from "lucide-react";
import { format } from "date-fns";

const statusConfig = {
  draft: { label: "Draft", icon: Clock, color: "bg-yellow-100 text-yellow-800" },
  submitted: { label: "Submitted", icon: FileText, color: "bg-blue-100 text-blue-800" },
  under_review: { label: "Under Review", icon: Clock, color: "bg-orange-100 text-orange-800" },
  approved: { label: "Approved", icon: CheckCircle, color: "bg-green-100 text-green-800" },
  rejected: { label: "Rejected", icon: XCircle, color: "bg-red-100 text-red-800" }
};

export default function DashboardPage() {
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      const data = await Application.list("-created_date");
      setApplications(data);
    } catch (error) {
      console.error("Error loading applications:", error);
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-slate-200 rounded w-64"></div>
            <div className="grid gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-32 bg-slate-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">My Applications</h1>
            <p className="text-slate-600 mt-1">Manage your maritime job applications</p>
          </div>
          <Link to={createPageUrl("Application")}>
            <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
              <Plus className="w-4 h-4" />
              New Application
            </Button>
          </Link>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {Object.entries(statusConfig).map(([status, config]) => {
            const count = applications.filter(app => app.status === status).length;
            const Icon = config.icon;
            return (
              <Card key={status} className="border-none shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">{config.label}</p>
                      <p className="text-2xl font-bold text-slate-900">{count}</p>
                    </div>
                    <div className={`p-3 rounded-xl ${config.color.replace('text-', 'text-').replace('bg-', 'bg-opacity-20 bg-')}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Applications List */}
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-slate-900">Recent Applications</CardTitle>
          </CardHeader>
          <CardContent>
            {applications.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-900 mb-2">No applications yet</h3>
                <p className="text-slate-500 mb-6">Start by creating your first maritime job application</p>
                <Link to={createPageUrl("Application")}>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Application
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {applications.map((application) => {
                  const config = statusConfig[application.status];
                  const Icon = config.icon;
                  
                  return (
                    <div key={application.id} className="border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-slate-900">
                              {application.personal_info?.first_name} {application.personal_info?.last_name}
                            </h3>
                            <Badge className={config.color}>
                              <Icon className="w-3 h-3 mr-1" />
                              {config.label}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-600">
                            <div>
                              <span className="font-medium">SRN:</span> {application.srn || "Not provided"}
                            </div>
                            <div>
                              <span className="font-medium">Applied:</span> {format(new Date(application.date_applied), "MMM d, yyyy")}
                            </div>
                            <div>
                              <span className="font-medium">Crew Type:</span> {application.crew_type || "Not specified"}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}