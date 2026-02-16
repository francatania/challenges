import { TeamMember } from './team-member.model';

export interface Comment {
  id: number;
  content: string;
  author: TeamMember;
  createdAt: string;
}

export interface CreateCommentDTO {
  content: string;
  authorId: number;
}
