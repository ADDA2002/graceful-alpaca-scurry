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

export const mockPersonnel: PersonnelRecord[] = [
  // Personnel
  {
    id: "P-001",
    name: "Michael Torres",
    role: "personnel",
    division: "Special Operations",
    rank: "Sergeant",
    aadharId: "123456789012",
    yearsOfService: 8,
    status: "active"
  },
  {
    id: "P-002",
    name: "James Wright",
    role: "personnel",
    division: "Infantry",
    rank: "Corporal",
    aadharId: "234567890123",
    yearsOfService: 5,
    status: "active"
  },
  {
    id: "P-003",
    name: "Emma Davis",
    role: "personnel",
    division: "Logistics",
    rank: "Private",
    aadharId: "345678901234",
    yearsOfService: 2,
    status: "active"
  },
  {
    id: "P-004",
    name: "Robert Chen",
    role: "personnel",
    division: "Intelligence",
    rank: "Lieutenant",
    aadharId: "456789012345",
    yearsOfService: 12,
    status: "deployed"
  },
  {
    id: "P-005",
    name: "Olivia Martinez",
    role: "personnel",
    division: "Medical",
    rank: "Sergeant",
    aadharId: "567890123456",
    yearsOfService: 7,
    status: "active"
  },
  {
    id: "P-006",
    name: "David Kumar",
    role: "personnel",
    division: "Engineering",
    rank: "Corporal",
    aadharId: "678901234567",
    yearsOfService: 4,
    status: "on-leave"
  },
  {
    id: "P-007",
    name: "Sophia Lee",
    role: "personnel",
    division: "Communications",
    rank: "Private",
    aadharId: "789012345678",
    yearsOfService: 1,
    status: "active"
  },
  {
    id: "P-008",
    name: "William Park",
    role: "personnel",
    division: "Artillery",
    rank: "Sergeant",
    aadharId: "890123456789",
    yearsOfService: 10,
    status: "active"
  },
  {
    id: "P-009",
    name: "Ava Nguyen",
    role: "personnel",
    division: "Aviation",
    rank: "Corporal",
    aadharId: "901234567890",
    yearsOfService: 6,
    status: "active"
  },
  {
    id: "P-010",
    name: "Lucas Brown",
    role: "personnel",
    division: "Military Police",
    rank: "Private",
    aadharId: "012345678901",
    yearsOfService: 3,
    status: "sick-leave"
  },
  // Welfare Officers
  {
    id: "WO-001",
    name: "Sarah Johnson",
    role: "welfare-officer",
    division: "Welfare Division",
    rank: "Captain",
    aadharId: "W00123456789",
    yearsOfService: 15,
    status: "active"
  },
  {
    id: "WO-002",
    name: "Rajesh Patel",
    role: "welfare-officer",
    division: "Welfare Division",
    rank: "Major",
    aadharId: "W00234567890",
    yearsOfService: 18,
    status: "active"
  },
  // Commanders
  {
    id: "CMD-001",
    name: "General James Wilson",
    role: "commander",
    division: "Command",
    rank: "General",
    aadharId: "C0011112222",
    yearsOfService: 25,
    status: "active"
  },
  {
    id: "CMD-002",
    name: "Colonel Priya Sharma",
    role: "commander",
    division: "Operations",
    rank: "Colonel",
    aadharId: "C0023334444",
    yearsOfService: 22,
    status: "active"
  }
];