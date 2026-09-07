export type UserRole = "commander" | "welfare-officer" | "personnel";

export interface PersonnelRecord {
  id: string;
  name: string;
  role: UserRole;
  division: string;
  rank: string;
  aadharId: string;
  yearsOfService: number;
  status: "active" | "on-leave" | "deployed" | "sick-leave";
}

export const RANKS = [
  "Constable",
  "Head Constable",
  "Assistant Sub-Inspector",
  "Sub-Inspector",
  "Inspector",
  "Deputy Superintendent",
  "Superintendent",
  "Senior Superintendent",
  "Deputy Inspector General",
  "Inspector General",
  "Additional Director General",
  "Director General"
];

export const DIVISIONS = [
  "Mumbai",
  "Delhi",
  "Chennai",
  "Kolkata",
  "Bengaluru",
  "Hyderabad",
  "Pune",
  "Ahmedabad",
  "Jaipur",
  "Lucknow",
  "Chandigarh",
  "Shillong",
  "Guwahati",
  "Bhopal",
  "Raipur",
  "Bhubaneswar",
  "Cuttack",
  "Rourkela",
  "Sambalpur"
];

export const mockPersonnel: PersonnelRecord[] = [
  {
    id: "P-001",
    name: "Michael Torres",
    role: "personnel",
    division: "Mumbai",
    rank: "Inspector",
    aadharId: "123456789012",
    yearsOfService: 8,
    status: "active"
  },
  {
    id: "P-002",
    name: "James Wright",
    role: "personnel",
    division: "Delhi",
    rank: "Sub-Inspector",
    aadharId: "234567890123",
    yearsOfService: 5,
    status: "active"
  },
  {
    id: "P-003",
    name: "Emma Davis",
    role: "personnel",
    division: "Chennai",
    rank: "Constable",
    aadharId: "345678901234",
    yearsOfService: 2,
    status: "active"
  },
  {
    id: "P-004",
    name: "Robert Chen",
    role: "personnel",
    division: "Kolkata",
    rank: "Inspector",
    aadharId: "456789012345",
    yearsOfService: 12,
    status: "deployed"
  },
  {
    id: "P-005",
    name: "Olivia Martinez",
    role: "personnel",
    division: "Bengaluru",
    rank: "Head Constable",
    aadharId: "567890123456",
    yearsOfService: 7,
    status: "active"
  },
  {
    id: "P-006",
    name: "David Kumar",
    role: "personnel",
    division: "Hyderabad",
    rank: "Sub-Inspector",
    aadharId: "678901234567",
    yearsOfService: 4,
    status: "on-leave"
  },
  {
    id: "P-007",
    name: "Sophia Lee",
    role: "personnel",
    division: "Pune",
    rank: "Constable",
    aadharId: "789012345678",
    yearsOfService: 1,
    status: "active"
  },
  {
    id: "P-008",
    name: "William Park",
    role: "personnel",
    division: "Ahmedabad",
    rank: "Inspector",
    aadharId: "890123456789",
    yearsOfService: 10,
    status: "active"
  },
  {
    id: "P-009",
    name: "Ava Nguyen",
    role: "personnel",
    division: "Jaipur",
    rank: "Head Constable",
    aadharId: "901234567890",
    yearsOfService: 6,
    status: "active"
  },
  {
    id: "P-010",
    name: "Lucas Brown",
    role: "personnel",
    division: "Lucknow",
    rank: "Constable",
    aadharId: "012345678901",
    yearsOfService: 3,
    status: "sick-leave"
  },
  {
    id: "WO-001",
    name: "Sarah Johnson",
    role: "welfare-officer",
    division: "Chandigarh",
    rank: "Superintendent",
    aadharId: "W00123456789",
    yearsOfService: 15,
    status: "active"
  },
  {
    id: "WO-002",
    name: "Rajesh Patel",
    role: "welfare-officer",
    division: "Shillong",
    rank: "Senior Superintendent",
    aadharId: "W00234567890",
    yearsOfService: 18,
    status: "active"
  },
  {
    id: "CMD-001",
    name: "James Wilson",
    role: "commander",
    division: "Command",
    rank: "Director General",
    aadharId: "C0011112222",
    yearsOfService: 25,
    status: "active"
  },
  {
      id: "CMD-002",
      name: "Priya Sharma",
      role: "commander",
      division: "Operations",
      rank: "Inspector General",
      aadharId: "C0023334444",
      yearsOfService: 22,
      status: "active"
    },
    {
      id: "CMD-003",
      name: "Aditya Dahiya",
      role: "commander",
      division: "Delhi",
      rank: "Director General",
      aadharId: "097174542070",
      yearsOfService: 25,
      status: "active"
    }
  ];
