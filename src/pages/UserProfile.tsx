
import React, { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { mockUsers, USER_ROLES, UserRole } from "@/services/mockData";
import { ArrowLeft, Ban, Check, FileText, User, X, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const UserProfile = () => {
  const { userId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const showApproveDialog = searchParams.get("action") === "approve";
  
  const [selectedRole, setSelectedRole] = useState<UserRole | "">("");
  const [approveDialogOpen, setApproveDialogOpen] = useState(showApproveDialog);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [banDialogOpen, setBanDialogOpen] = useState(false);

  // Find the user in our mock data
  const user = mockUsers.find(user => user.id === userId);
  
  // Handle user not found
  if (!user) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" onClick={() => navigate(-1)}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </div>
          <div className="flex flex-col items-center justify-center py-12">
            <User className="h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">User Not Found</h2>
            <p className="text-muted-foreground">
              The requested user profile could not be found.
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const handleApproveUser = () => {
    if (!selectedRole) {
      toast.error("Please select a role for the user");
      return;
    }
    
    // In a real app, this would make an API call
    toast.success(`User has been approved as ${selectedRole}`);
    setApproveDialogOpen(false);
    navigate("/users");
  };

  const handleRejectUser = () => {
    // In a real app, this would make an API call
    toast.success("User has been rejected");
    setRejectDialogOpen(false);
    navigate("/pending-users");
  };

  const handleBanUser = () => {
    // In a real app, this would make an API call
    toast.success(
      user.status === "banned" 
        ? "User has been unbanned" 
        : "User has been banned"
    );
    setBanDialogOpen(false);
  };
  
  const handleViewDocument = (docId: string) => {
    // In a real app, this would open the document
    toast.info("Document viewer would open here");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Back button */}
        <div className="flex items-center space-x-2">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>
        
        {/* User header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="h-20 w-20 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
              {user.avatar ? (
                <img 
                  src={user.avatar} 
                  alt={`${user.firstName} ${user.lastName}`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <User className="h-10 w-10 text-gray-500" />
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold">
                {user.firstName} {user.lastName}
              </h1>
              <div className="flex items-center space-x-2">
                <p className="text-muted-foreground">{user.email}</p>
                <div className={`status-badge ${
                  user.status === "active" 
                    ? "approved" 
                    : user.status === "pending" 
                      ? "pending"
                      : "banned"
                }`}>
                  {user.status}
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
            {user.status === "pending" && (
              <>
                <Button 
                  variant="outline" 
                  className="bg-green-50 hover:bg-green-100 text-green-700 border-green-200"
                  onClick={() => setApproveDialogOpen(true)}
                >
                  <Check className="mr-2 h-4 w-4" />
                  Approve User
                </Button>
                <Button 
                  variant="outline"
                  className="bg-red-50 hover:bg-red-100 text-red-700 border-red-200"
                  onClick={() => setRejectDialogOpen(true)}
                >
                  <X className="mr-2 h-4 w-4" />
                  Reject User
                </Button>
              </>
            )}
            
            {user.status !== "pending" && (
              <Button 
                variant={user.status === "banned" ? "outline" : "destructive"}
                className={user.status === "banned" 
                  ? "bg-green-50 hover:bg-green-100 text-green-700 border-green-200"
                  : ""}
                onClick={() => setBanDialogOpen(true)}
              >
                {user.status === "banned" ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Unban User
                  </>
                ) : (
                  <>
                    <Ban className="mr-2 h-4 w-4" />
                    Ban User
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
        
        {/* User information */}
        <Tabs defaultValue="profile">
          <TabsList className="grid grid-cols-2 md:grid-cols-3 w-full max-w-md">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="documents">
              Documents
              {user.documents && user.documents.length > 0 && (
                <span className="ml-1 px-1.5 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                  {user.documents.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>
          
          {/* Profile tab */}
          <TabsContent value="profile">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">First Name</p>
                      <p className="font-medium">{user.firstName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Last Name</p>
                      <p className="font-medium">{user.lastName}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Email</p>
                    <p className="font-medium">{user.email}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Phone</p>
                    <p className="font-medium">{user.phone}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Role</p>
                    <p className="font-medium">
                      {user.role || (
                        <span className="text-muted-foreground">Not assigned</span>
                      )}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Join Date</p>
                    <p className="font-medium">{user.joinDate}</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Status Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Status</p>
                    <div className={`status-badge inline-flex ${
                      user.status === "active" 
                        ? "approved" 
                        : user.status === "pending" 
                          ? "pending"
                          : "banned"
                    }`}>
                      {user.status}
                    </div>
                  </div>
                  
                  {user.role && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Current Role</p>
                      <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium inline-flex">
                        {user.role}
                      </div>
                    </div>
                  )}
                  
                  <div className="pt-4">
                    <p className="text-sm font-medium mb-3">Actions</p>
                    <div className="flex space-x-2">
                      {user.status === "pending" && (
                        <>
                          <Button 
                            variant="outline" 
                            className="bg-green-50 hover:bg-green-100 text-green-700 border-green-200"
                            onClick={() => setApproveDialogOpen(true)}
                          >
                            <Check className="mr-2 h-4 w-4" />
                            Approve
                          </Button>
                          <Button 
                            variant="outline"
                            className="bg-red-50 hover:bg-red-100 text-red-700 border-red-200"
                            onClick={() => setRejectDialogOpen(true)}
                          >
                            <X className="mr-2 h-4 w-4" />
                            Reject
                          </Button>
                        </>
                      )}
                      
                      {user.status !== "pending" && (
                        <Button 
                          variant={user.status === "banned" ? "outline" : "destructive"}
                          className={user.status === "banned" 
                            ? "bg-green-50 hover:bg-green-100 text-green-700 border-green-200"
                            : ""}
                          onClick={() => setBanDialogOpen(true)}
                        >
                          {user.status === "banned" ? (
                            <>
                              <Check className="mr-2 h-4 w-4" />
                              Unban User
                            </>
                          ) : (
                            <>
                              <Ban className="mr-2 h-4 w-4" />
                              Ban User
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Documents tab */}
          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Submitted Documents</CardTitle>
              </CardHeader>
              <CardContent>
                {user.documents && user.documents.length > 0 ? (
                  <div className="space-y-4">
                    {user.documents.map((doc) => (
                      <div 
                        key={doc.id}
                        className="p-4 border rounded-md flex items-start justify-between hover:bg-gray-50 transition"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-blue-50 rounded-md">
                            <FileText className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">{doc.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {doc.type} • Uploaded on {doc.uploadDate}
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleViewDocument(doc.id)}
                          >
                            View
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="text-blue-600"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8">
                    <FileText className="h-12 w-12 text-muted-foreground mb-3" />
                    <p className="text-lg font-medium mb-1">No documents</p>
                    <p className="text-muted-foreground text-center">
                      This user has not submitted any documents yet.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Activity tab */}
          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Activity History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-8">
                  <p className="text-muted-foreground">
                    Activity tracking is not yet available.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Approve User Dialog */}
      <Dialog open={approveDialogOpen} onOpenChange={setApproveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approve User</DialogTitle>
            <DialogDescription>
              Assign a role to this user to complete approval.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <p className="mb-2 font-medium">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Assign a role:</label>
              <Select value={selectedRole} onValueChange={(value) => setSelectedRole(value as UserRole)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  {USER_ROLES.map((role) => (
                    <SelectItem key={role} value={role}>{role}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setApproveDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleApproveUser}
              disabled={!selectedRole}
            >
              Approve User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject User Dialog */}
      <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject User</DialogTitle>
            <DialogDescription>
              Are you sure you want to reject this user's registration?
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2 py-2">
            <p className="font-medium">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleRejectUser}>
              Reject User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Ban User Dialog */}
      <Dialog open={banDialogOpen} onOpenChange={setBanDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {user.status === "banned" ? "Unban User" : "Ban User"}
            </DialogTitle>
            <DialogDescription>
              {user.status === "banned" 
                ? "Are you sure you want to unban this user?"
                : "Are you sure you want to ban this user?"
              }
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2 py-2">
            <p className="font-medium">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setBanDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant={user.status === "banned" ? "default" : "destructive"} 
              onClick={handleBanUser}
            >
              {user.status === "banned" ? "Unban User" : "Ban User"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default UserProfile;
