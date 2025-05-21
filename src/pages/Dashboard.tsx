
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserCheck, UserX, Activity, Clipboard, AlertCircle } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { 
  getUsersCount, 
  getActiveUsersCount, 
  getPendingUsersCount,
  getPatientsCount,
  getOpenIssuesCount,
  mockUsers, 
  mockIssues
} from "@/services/mockData";

const Dashboard = () => {
  // Stats for the dashboard
  const stats = [
    {
      title: "Total Users",
      value: getUsersCount(),
      icon: <Users className="h-8 w-8 text-clovera-600" />,
      change: "+12% from last month",
      trend: "up",
    },
    {
      title: "Active Users",
      value: getActiveUsersCount(),
      icon: <UserCheck className="h-8 w-8 text-green-600" />,
      change: "+8% from last month",
      trend: "up",
    },
    {
      title: "Pending Users",
      value: getPendingUsersCount(),
      icon: <UserX className="h-8 w-8 text-amber-600" />,
      change: "+3 new requests",
      trend: "neutral",
    },
    {
      title: "Patients",
      value: getPatientsCount(),
      icon: <Clipboard className="h-8 w-8 text-indigo-600" />,
      change: "+5 from last week",
      trend: "up",
    },
    {
      title: "Open Issues",
      value: getOpenIssuesCount(),
      icon: <AlertCircle className="h-8 w-8 text-red-600" />,
      change: "-2 from yesterday",
      trend: "down",
    },
  ];

  // Get the latest pending users
  const latestPendingUsers = mockUsers
    .filter(user => user.status === "pending")
    .slice(0, 3);

  // Get the recent issues
  const recentIssues = mockIssues
    .filter(issue => issue.status !== "resolved")
    .slice(0, 3);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to your Clovera admin dashboard.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                {stat.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className={`text-xs ${
                  stat.trend === "up" 
                    ? "text-green-600" 
                    : stat.trend === "down" 
                      ? "text-red-600" 
                      : "text-gray-600"
                }`}>
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pending Users */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="text-lg font-medium">
                Pending User Approvals
              </CardTitle>
            </CardHeader>
            <CardContent>
              {latestPendingUsers.length > 0 ? (
                <div className="space-y-4">
                  {latestPendingUsers.map((user) => (
                    <div 
                      key={user.id} 
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition cursor-pointer"
                      onClick={() => window.location.href = `/user/${user.id}`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 rounded-full overflow-hidden">
                          <img 
                            src={user.avatar || "/placeholder.svg"} 
                            alt={`${user.firstName} ${user.lastName}`}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium">{user.firstName} {user.lastName}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                      <span className="status-badge pending">Pending</span>
                    </div>
                  ))}
                  <div className="mt-2 text-center">
                    <a 
                      href="/pending-users"
                      className="text-sm text-clovera-600 hover:underline"
                    >
                      View all pending users
                    </a>
                  </div>
                </div>
              ) : (
                <p className="text-center py-4 text-muted-foreground">
                  No pending users at the moment
                </p>
              )}
            </CardContent>
          </Card>

          {/* Recent Issues */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="text-lg font-medium">
                Recent Issues
              </CardTitle>
            </CardHeader>
            <CardContent>
              {recentIssues.length > 0 ? (
                <div className="space-y-4">
                  {recentIssues.map((issue) => (
                    <div 
                      key={issue.id} 
                      className="p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition cursor-pointer"
                      onClick={() => window.location.href = `/issues/${issue.id}`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium">{issue.title}</h4>
                        <span className={`status-badge ${
                          issue.priority === "high" 
                            ? "bg-red-100 text-red-800" 
                            : issue.priority === "medium" 
                              ? "bg-amber-100 text-amber-800" 
                              : "bg-blue-100 text-blue-800"
                        }`}>
                          {issue.priority}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate mb-2">{issue.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">By {issue.userName}</span>
                        <span className={`status-badge ${
                          issue.status === "open" 
                            ? "bg-red-100 text-red-800" 
                            : "bg-amber-100 text-amber-800"
                        }`}>
                          {issue.status}
                        </span>
                      </div>
                    </div>
                  ))}
                  <div className="mt-2 text-center">
                    <a 
                      href="/issues"
                      className="text-sm text-clovera-600 hover:underline"
                    >
                      View all issues
                    </a>
                  </div>
                </div>
              ) : (
                <p className="text-center py-4 text-muted-foreground">
                  No open issues at the moment
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
