import { Status, Priority, Category } from './enums';
import { TeamMember } from './team-member.model';
import { Comment } from './comment.model';

export interface Task {
  id: number;
  title: string;
  description?: string;
  status: Status;
  priority: Priority;
  category: Category;
  assignedTo?: TeamMember;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
  comments?: Comment[];
}

export interface CreateTaskDTO {
  title: string;
  description?: string;
  status?: Status;
  priority?: Priority;
  category?: Category;
  assignedToId?: number | null;
  dueDate?: string;
}

export interface UpdateTaskDTO {
  title?: string;
  description?: string;
  status?: Status;
  priority?: Priority;
  category?: Category;
  assignedToId?: number | null;
  dueDate?: string;
}

export interface TaskStatistics {
  total: number;
  todo: number;
  inProgress: number;
  inReview: number;
  done: number;
  highPriority: number;
  urgentPriority: number;
}
