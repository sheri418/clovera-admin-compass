
import React, { useState } from "react";
import { Search, Filter, ChevronDown, X, MoreHorizontal, Clipboard } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { mockPatients } from "@/services/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/sonner";

const Patients = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Apply filters and search
  const filteredPatients = mockPatients.filter(patient => {
    // Search by name, diagnosis or doctor
    const matchesSearch = searchQuery === "" || 
      `${patient.firstName} ${patient.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.diagnosis.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.primaryDoctor.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by status
    const matchesStatus = statusFilter === "" || patient.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleViewPatientChart = (patientId: string) => {
    // In a real app, this would navigate to the patient chart
    toast.success("Viewing patient chart");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Patients</h1>
            <p className="text-muted-foreground">
              View and manage all patients in the system.
            </p>
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="outline"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="w-full sm:w-auto"
            >
              <Filter className="mr-2 h-4 w-4" />
              Filter
              <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${isFilterOpen ? "rotate-180" : ""}`} />
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input
              placeholder="Search patients by name, diagnosis, or doctor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {isFilterOpen && (
            <Card className="p-4">
              <div className="space-y-2 max-w-md">
                <label className="text-sm font-medium">Filter by Status</label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Statuses</SelectItem>
                    <SelectItem value="inpatient">Inpatient</SelectItem>
                    <SelectItem value="outpatient">Outpatient</SelectItem>
                    <SelectItem value="discharged">Discharged</SelectItem>
                  </SelectContent>
                </Select>
                
                {statusFilter && (
                  <div className="flex justify-end mt-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setStatusFilter("")}
                    >
                      <X className="mr-2 h-4 w-4" />
                      Clear Filter
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          )}
        </div>

        {/* Patients Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead className="hidden md:table-cell">Age</TableHead>
                <TableHead>Room</TableHead>
                <TableHead className="hidden md:table-cell">Diagnosis</TableHead>
                <TableHead className="hidden md:table-cell">Primary Doctor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.length > 0 ? (
                filteredPatients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell className="font-medium">
                      {patient.firstName} {patient.lastName}
                      <div className="md:hidden text-xs text-muted-foreground">
                        {patient.diagnosis}
                      </div>
                      <div className="md:hidden text-xs text-muted-foreground">
                        {patient.primaryDoctor}
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {patient.age}
                    </TableCell>
                    <TableCell>
                      {patient.roomNumber || <span className="text-muted-foreground">—</span>}
                    </TableCell>
                    <TableCell className="hidden md:table-cell max-w-xs truncate">
                      {patient.diagnosis}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {patient.primaryDoctor}
                    </TableCell>
                    <TableCell>
                      <div className={`status-badge ${
                        patient.status === "inpatient" 
                          ? "bg-blue-100 text-blue-800" 
                          : patient.status === "outpatient" 
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                      }`}>
                        {patient.status}
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewPatientChart(patient.id)}>
                            <Clipboard className="mr-2 h-4 w-4" />
                            View Chart
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    No patients found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Patients;
