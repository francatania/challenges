import { Component, OnInit } from '@angular/core';
import { TaskFormComponent } from "../../components/task-form/task-form.component";
import { TeamService } from '../../services/team.service';
import { TeamMember } from '../../models/team-member.model';
import { CreateTaskDTO } from '../../models/task.model';
import { StateService } from '../../services/state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-task',
  imports: [TaskFormComponent],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css'
})
export class CreateTaskComponent implements OnInit {

  teamMembers: TeamMember[] = [];
  constructor(private service: TeamService, private stateService: StateService, private router: Router){}

  ngOnInit(): void {
   this.service.getTeamMembers().subscribe((data)=>{
    this.teamMembers = data;
   })
  }

  handleForm(task: CreateTaskDTO){
    return this.stateService.createTask(task).subscribe(()=>{
        this.router.navigate(['/'])
    });
  }
}
