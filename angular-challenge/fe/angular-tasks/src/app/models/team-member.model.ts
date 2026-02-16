export interface TeamMember {
  id: number;
  name: string;
  email: string;
  role?: string;
  avatar?: string;
}

export interface CreateTeamMemberDTO {
  name: string;
  email: string;
  role?: string;
  avatar?: string;
}
