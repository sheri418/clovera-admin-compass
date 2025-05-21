
import React, { useState } from "react";
import { Search, Filter, ChevronDown, MessageSquare, X, MoreHorizontal, Reply } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { mockIssues, Issue } from "@/services/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/sonner";

const Issues = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [priorityFilter, setPriorityFilter] = useState<string>("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [issueDialogOpen, setIssueDialogOpen] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  
  // Apply filters and search
  const filteredIssues = mockIssues.filter(issue => {
    // Search by title, description, or user
    const matchesSearch = searchQuery === "" || 
      issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.userName.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by status
    const matchesStatus = statusFilter === "" || issue.status === statusFilter;
    
    // Filter by priority
    const matchesPriority = priorityFilter === "" || issue.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleViewIssue = (issue: Issue) => {
    setSelectedIssue(issue);
    setIssueDialogOpen(true);
  };

  const handleReplyToIssue = () => {
    if (!replyContent.trim()) {
      toast.error("Please enter a reply");
      return;
    }
    
    // In a real app, this would make an API call
    toast.success("Reply sent successfully");
    setReplyContent("");
    setIssueDialogOpen(false);
  };

  const handleUpdateIssueStatus = (issueId: string, newStatus: "open" | "in-progress" | "resolved") => {
    // In a real app, this would make an API call
    toast.success(`Issue status updated to ${newStatus}`);
    
    if (selectedIssue && selectedIssue.id === issueId) {
      setSelectedIssue({
        ...selectedIssue,
        status: newStatus
      });
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Issues</h1>
            <p className="text-muted-foreground">
              Manage and respond to issues reported by users.
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
              placeholder="Search issues by title, description, or user..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {isFilterOpen && (
            <Card className="p-4 grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Filter by Status</label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Statuses</SelectItem>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Filter by Priority</label>
                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Priorities</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {(statusFilter || priorityFilter) && (
                <div className="md:col-span-2 flex justify-end">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      setStatusFilter("");
                      setPriorityFilter("");
                    }}
                  >
                    <X className="mr-2 h-4 w-4" />
                    Clear Filters
                  </Button>
                </div>
              )}
            </Card>
          )}
        </div>

        {/* Issues List */}
        <div className="space-y-4">
          {filteredIssues.length > 0 ? (
            filteredIssues.map((issue) => (
              <Card key={issue.id} className={`hover:shadow-md transition ${
                issue.status === "resolved" ? "opacity-70" : ""
              }`}>
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="mt-1">
                        <MessageSquare className={`h-5 w-5 ${
                          issue.status === "open" 
                            ? "text-red-500" 
                            : issue.status === "in-progress" 
                                ? "text-amber-500" 
                                : "text-green-500"
                        }`} />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 
                            className="font-medium text-lg cursor-pointer hover:text-clovera-600"
                            onClick={() => handleViewIssue(issue)}
                          >
                            {issue.title}
                          </h3>
                          <div className={`status-badge ${
                            issue.status === "open" 
                              ? "bg-red-100 text-red-800" 
                              : issue.status === "in-progress" 
                                ? "bg-amber-100 text-amber-800"
                                : "bg-green-100 text-green-800"
                          }`}>
                            {issue.status}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {issue.description}
                        </p>
                        <div className="flex flex-wrap items-center mt-2 text-xs text-muted-foreground">
                          <span>{issue.userName}</span>
                          <span className="px-1">•</span>
                          <span>{issue.userRole}</span>
                          <span className="px-1">•</span>
                          <span>
                            {new Date(issue.createdAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                          <div className="ml-2">
                            <div className={`status-badge ${
                              issue.priority === "high" 
                                ? "bg-red-100 text-red-800" 
                                : issue.priority === "medium" 
                                  ? "bg-amber-100 text-amber-800" 
                                  : "bg-blue-100 text-blue-800"
                            }`}>
                              {issue.priority}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 mt-3 md:mt-0">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewIssue(issue)}
                      >
                        <Reply className="mr-2 h-4 w-4" />
                        Respond
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {issue.status !== "open" && (
                            <DropdownMenuItem onClick={() => handleUpdateIssueStatus(issue.id, "open")}>
                              Mark as Open
                            </DropdownMenuItem>
                          )}
                          {issue.status !== "in-progress" && (
                            <DropdownMenuItem onClick={() => handleUpdateIssueStatus(issue.id, "in-progress")}>
                              Mark as In Progress
                            </DropdownMenuItem>
                          )}
                          {issue.status !== "resolved" && (
                            <DropdownMenuItem onClick={() => handleUpdateIssueStatus(issue.id, "resolved")}>
                              Mark as Resolved
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-1">No issues found</h3>
                <p className="text-muted-foreground text-center">
                  There are no issues matching your filters.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Issue Detail Dialog */}
      {selectedIssue && (
        <Dialog open={issueDialogOpen} onOpenChange={setIssueDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <span>{selectedIssue.title}</span>
                <div className={`status-badge ${
                  selectedIssue.status === "open" 
                    ? "bg-red-100 text-red-800" 
                    : selectedIssue.status === "in-progress" 
                      ? "bg-amber-100 text-amber-800"
                      : "bg-green-100 text-green-800"
                }`}>
                  {selectedIssue.status}
                </div>
              </DialogTitle>
              <DialogDescription>
                Reported by {selectedIssue.userName} • {selectedIssue.userRole}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              {/* Issue description */}
              <Card className="bg-gray-50">
                <CardContent className="p-4">
                  <p>{selectedIssue.description}</p>
                  <div className="mt-3 text-xs text-muted-foreground flex items-center justify-between">
                    <span>
                      {new Date(selectedIssue.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                    <div className={`status-badge ${
                      selectedIssue.priority === "high" 
                        ? "bg-red-100 text-red-800" 
                        : selectedIssue.priority === "medium" 
                          ? "bg-amber-100 text-amber-800" 
                          : "bg-blue-100 text-blue-800"
                    }`}>
                      {selectedIssue.priority} priority
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Previous responses */}
              {selectedIssue.responses && selectedIssue.responses.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-sm font-medium">Previous Responses</h4>
                  {selectedIssue.responses.map((response) => (
                    <Card key={response.id} className="bg-blue-50">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-sm font-medium">{response.adminName}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(response.createdAt).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>
                        </div>
                        <p className="mt-2">{response.text}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {/* Reply form */}
              {selectedIssue.status !== "resolved" && (
                <div className="space-y-3">
                  <h4 className="text-sm font-medium">Reply to this issue</h4>
                  <Textarea 
                    placeholder="Type your response here..." 
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
              )}

              {/* Status update */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium">Update Status</h4>
                <div className="flex space-x-2">
                  <Button 
                    variant={selectedIssue.status === "open" ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleUpdateIssueStatus(selectedIssue.id, "open")}
                    disabled={selectedIssue.status === "open"}
                  >
                    Open
                  </Button>
                  <Button 
                    variant={selectedIssue.status === "in-progress" ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleUpdateIssueStatus(selectedIssue.id, "in-progress")}
                    disabled={selectedIssue.status === "in-progress"}
                  >
                    In Progress
                  </Button>
                  <Button 
                    variant={selectedIssue.status === "resolved" ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleUpdateIssueStatus(selectedIssue.id, "resolved")}
                    disabled={selectedIssue.status === "resolved"}
                  >
                    Resolved
                  </Button>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIssueDialogOpen(false)}>
                Cancel
              </Button>
              {selectedIssue.status !== "resolved" && (
                <Button 
                  onClick={handleReplyToIssue}
                  disabled={!replyContent.trim()}
                >
                  Send Response
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </DashboardLayout>
  );
};

export default Issues;
