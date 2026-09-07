export interface PersonnelRecord {
  id: string;
  name: string;
  role: string;
  department: string;
  rank: string;
  yearsOfService: number;
  status: "active" | "on-leave" | "deployed" | "sick-leave";
}

export const mockPersonnel: PersonnelRecord[] = [
  {
    id: "P-001",
    name: "Sgt. Michael Torres",
    role: "personnel",
    department: "Special Operations",
    rank: "Sergeant",
    yearsOfService: 8,
    status: "active"
  },
  {
    id: "P-002",
    name: "Cpl. James Wright",
    role: "personnel",
    department: "Infantry",
    rank: "Corporal",
    yearsOfService: 5,
    status: "active"
  },
  {
    id: "P-003",
    name: "Pvt. Emma Davis",
    role: "personnel",
    department: "Logistics",
    rank: "Private",
    yearsOfService: 2,
    status: "active"
  },
  {
    id: "P-004",
    name: "Lt. Robert Chen",
    role: "personnel",
    department: "Intelligence",
    rank: "Lieutenant",
    yearsOfService: 12,
    status: "deployed"
  },
  {
    id: "P-005",
    name: "Sgt. Olivia Martinez",
    role: "personnel",
    department: "Medical",
    rank: "Sergeant",
    yearsOfService: 7,
    status: "active"
  },
  {
    id: "P-006",
    name: "Cpl. David Kumar",
    role: "personnel",
    department: "Engineering",
    rank: "Corporal",
    yearsOfService: 4,
    status: "on-leave"
  },
  {
    id: "P-007",
    name: "Pvt. Sophia Lee",
    role: "personnel",
    department: "Communications",
    rank: "Private",
    yearsOfService: 1,
    status: "active"
  },
  {
    id: "P-008",
    name: "Sgt. William Park",
    role: "personnel",
    department: "Artillery",
    rank: "Sergeant",
    yearsOfService: 10,
    status: "active"
  },
  {
    id: "P-009",
    name: "Cpl. Ava Nguyen",
    role: "personnel",
    department: "Aviation",
    rank: "Corporal",
    yearsOfService: 6,
    status: "active"
  },
  {
    id: "P-010",
    name: "Pvt. Lucas Brown",
    role: "personnel",
    department: "Military Police",
    rank: "Private",
    yearsOfService: 3,
    status: "sick-leave"
  }
];