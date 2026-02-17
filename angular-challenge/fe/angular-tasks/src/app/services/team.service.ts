import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TeamMember, CreateTeamMemberDTO } from '../models/team-member.model';
import { Task } from '../models/task.model';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient){}

  getTeamMembers(): Observable<TeamMember[]>{
    return this.http.get<TeamMember[]>(`${this.baseUrl}/team-members`);
  }
}
