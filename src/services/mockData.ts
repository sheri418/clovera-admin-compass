
// Mock data for Clovera admin dashboard

// User roles
export type UserRole = 
  | "Nurse" 
  | "CNA" 
  | "Charge Nurse" 
  | "Doctor" 
  | "Manager" 
  | "Physical Therapist" 
  | "Speech Therapist" 
  | "Occupational Therapist" 
  | "Respiratory Therapist";

export const USER_ROLES: UserRole[] = [
  "Nurse",
  "CNA",
  "Charge Nurse", 
  "Doctor",
  "Manager",
  "Physical Therapist",
  "Speech Therapist",
  "Occupational Therapist",
  "Respiratory Therapist"
];

// User status
export type UserStatus = "active" | "pending" | "rejected" | "banned";

// Document types
export type DocumentType = "ID" | "License" | "Certificate" | "Degree" | "Reference";

// Document interface
export interface Document {
  id: string;
  type: DocumentType;
  name: string;
  url: string;
  uploadDate: string;
  verified: boolean;
}

// User interface
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role?: UserRole;
  status: UserStatus;
  joinDate: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  avatar?: string;
  documents?: Document[];
}

// Patient interface
export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  gender: "male" | "female" | "other";
  roomNumber?: string;
  admissionDate: string;
  diagnosis: string;
  primaryDoctor: string;
  status: "inpatient" | "outpatient" | "discharged";
}

// Issue interface
export interface Issue {
  id: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  title: string;
  description: string;
  status: "open" | "in-progress" | "resolved";
  priority: "low" | "medium" | "high";
  createdAt: string;
  updatedAt: string;
  responses?: {
    id: string;
    adminId: string;
    adminName: string;
    text: string;
    createdAt: string;
  }[];
}

// Mock users data
export const mockUsers: User[] = [
  {
    id: "u1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@clovera.com",
    phone: "123-456-7890",
    role: "Doctor",
    status: "active",
    joinDate: "2023-01-15",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: "u2",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@clovera.com",
    phone: "123-456-7891",
    role: "Nurse",
    status: "active",
    joinDate: "2023-02-10",
    avatar: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: "u3",
    firstName: "Robert",
    lastName: "Johnson",
    email: "r.johnson@clovera.com",
    phone: "123-456-7892",
    status: "pending",
    joinDate: "2023-05-05",
    avatar: "https://i.pravatar.cc/150?img=3",
    documents: [
      {
        id: "d1",
        type: "ID",
        name: "Driver's License",
        url: "/documents/license.pdf",
        uploadDate: "2023-05-05",
        verified: false,
      },
      {
        id: "d2",
        type: "Certificate",
        name: "Nursing Certificate",
        url: "/documents/certificate.pdf",
        uploadDate: "2023-05-05",
        verified: false,
      },
    ],
  },
  {
    id: "u4",
    firstName: "Emily",
    lastName: "Williams",
    email: "e.williams@clovera.com",
    phone: "123-456-7893",
    role: "Physical Therapist",
    status: "active",
    joinDate: "2023-03-22",
    avatar: "https://i.pravatar.cc/150?img=4",
  },
  {
    id: "u5",
    firstName: "Michael",
    lastName: "Brown",
    email: "m.brown@clovera.com",
    phone: "123-456-7894",
    role: "CNA",
    status: "banned",
    joinDate: "2023-01-30",
    avatar: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: "u6",
    firstName: "Sarah",
    lastName: "Davis",
    email: "s.davis@clovera.com",
    phone: "123-456-7895",
    status: "pending",
    joinDate: "2023-05-10",
    avatar: "https://i.pravatar.cc/150?img=6",
    documents: [
      {
        id: "d3",
        type: "License",
        name: "Medical License",
        url: "/documents/med-license.pdf",
        uploadDate: "2023-05-10",
        verified: false,
      },
      {
        id: "d4",
        type: "Degree",
        name: "Medical Degree",
        url: "/documents/degree.pdf",
        uploadDate: "2023-05-10",
        verified: false,
      },
    ],
  },
  {
    id: "u7",
    firstName: "David",
    lastName: "Miller",
    email: "d.miller@clovera.com",
    phone: "123-456-7896",
    role: "Manager",
    status: "active",
    joinDate: "2022-11-15",
    avatar: "https://i.pravatar.cc/150?img=7",
  },
  {
    id: "u8",
    firstName: "Jessica",
    lastName: "Wilson",
    email: "j.wilson@clovera.com",
    phone: "123-456-7897",
    role: "Charge Nurse",
    status: "active",
    joinDate: "2022-12-03",
    avatar: "https://i.pravatar.cc/150?img=8",
  },
  {
    id: "u9",
    firstName: "Thomas",
    lastName: "Anderson",
    email: "t.anderson@clovera.com",
    phone: "123-456-7898",
    status: "pending",
    joinDate: "2023-05-15",
    avatar: "https://i.pravatar.cc/150?img=9",
    documents: [
      {
        id: "d5",
        type: "Reference",
        name: "Reference Letter",
        url: "/documents/reference.pdf",
        uploadDate: "2023-05-15",
        verified: false,
      }
    ],
  },
  {
    id: "u10",
    firstName: "Amanda",
    lastName: "Taylor",
    email: "a.taylor@clovera.com",
    phone: "123-456-7899",
    role: "Speech Therapist",
    status: "active",
    joinDate: "2023-04-01",
    avatar: "https://i.pravatar.cc/150?img=10",
  },
];

// Mock patients data
export const mockPatients: Patient[] = [
  {
    id: "p1",
    firstName: "Alice",
    lastName: "Johnson",
    age: 65,
    gender: "female",
    roomNumber: "101",
    admissionDate: "2023-04-15",
    diagnosis: "Pneumonia",
    primaryDoctor: "Dr. John Doe",
    status: "inpatient",
  },
  {
    id: "p2",
    firstName: "Bob",
    lastName: "Smith",
    age: 45,
    gender: "male",
    roomNumber: "102",
    admissionDate: "2023-04-10",
    diagnosis: "Fractured Femur",
    primaryDoctor: "Dr. John Doe",
    status: "inpatient",
  },
  {
    id: "p3",
    firstName: "Carol",
    lastName: "Brown",
    age: 35,
    gender: "female",
    admissionDate: "2023-04-20",
    diagnosis: "Physical Therapy",
    primaryDoctor: "Dr. Jane Smith",
    status: "outpatient",
  },
  {
    id: "p4",
    firstName: "David",
    lastName: "Wilson",
    age: 72,
    gender: "male",
    roomNumber: "105",
    admissionDate: "2023-03-30",
    diagnosis: "Heart Failure",
    primaryDoctor: "Dr. John Doe",
    status: "inpatient",
  },
  {
    id: "p5",
    firstName: "Eva",
    lastName: "Martinez",
    age: 28,
    gender: "female",
    admissionDate: "2023-04-22",
    diagnosis: "Speech Therapy Follow-up",
    primaryDoctor: "Dr. Jane Smith",
    status: "outpatient",
  },
  {
    id: "p6",
    firstName: "Frank",
    lastName: "Garcia",
    age: 55,
    gender: "male",
    roomNumber: "110",
    admissionDate: "2023-04-05",
    diagnosis: "COPD Exacerbation",
    primaryDoctor: "Dr. John Doe",
    status: "discharged",
  },
];

// Mock issues data
export const mockIssues: Issue[] = [
  {
    id: "i1",
    userId: "u2",
    userName: "Jane Smith",
    userRole: "Nurse",
    title: "Medication System Error",
    description: "The medication tracking system is showing errors when attempting to log administered medications.",
    status: "open",
    priority: "high",
    createdAt: "2023-05-01T10:30:00Z",
    updatedAt: "2023-05-01T10:30:00Z",
  },
  {
    id: "i2",
    userId: "u4",
    userName: "Emily Williams",
    userRole: "Physical Therapist",
    title: "Equipment Maintenance Required",
    description: "The rehabilitation room equipment needs maintenance. The treadmill is making unusual noises.",
    status: "in-progress",
    priority: "medium",
    createdAt: "2023-04-28T14:15:00Z",
    updatedAt: "2023-04-29T09:20:00Z",
    responses: [
      {
        id: "r1",
        adminId: "admin-001",
        adminName: "Admin User",
        text: "We've scheduled a maintenance check for tomorrow. Thank you for reporting this issue.",
        createdAt: "2023-04-29T09:20:00Z",
      },
    ],
  },
  {
    id: "i3",
    userId: "u8",
    userName: "Jessica Wilson",
    userRole: "Charge Nurse",
    title: "Staff Scheduling Conflict",
    description: "There's a scheduling conflict for the night shift on May 10th. We're short-staffed for that night.",
    status: "resolved",
    priority: "high",
    createdAt: "2023-04-25T16:45:00Z",
    updatedAt: "2023-04-27T11:10:00Z",
    responses: [
      {
        id: "r2",
        adminId: "admin-001",
        adminName: "Admin User",
        text: "I've reviewed the schedule and reassigned staff to cover the night shift on May 10th.",
        createdAt: "2023-04-26T10:00:00Z",
      },
      {
        id: "r3",
        adminId: "admin-001",
        adminName: "Admin User",
        text: "The schedule has been updated and all shifts are now properly staffed. Please let me know if there are any other issues.",
        createdAt: "2023-04-27T11:10:00Z",
      },
    ],
  },
];

// Utility functions for managing mock data
export const getUsersCount = () => mockUsers.length;
export const getActiveUsersCount = () => mockUsers.filter(user => user.status === "active").length;
export const getPendingUsersCount = () => mockUsers.filter(user => user.status === "pending").length;
export const getPatientsCount = () => mockPatients.length;
export const getOpenIssuesCount = () => mockIssues.filter(issue => issue.status === "open").length;
