import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CreateTaskDTO } from '../../models/task.model';
import { Category, Priority } from '../../models/enums';
import { FormsModule, NgForm } from '@angular/forms';
import { TeamMember } from '../../models/team-member.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent {

  priorities = Object.values(Priority);
  categories = Object.values(Category);
  @Input() members: TeamMember[] = [];
  @Output() formSended = new EventEmitter<CreateTaskDTO>();
  today = new Date().toISOString().split('T')[0];

  dto: CreateTaskDTO = {
  title: '',
  description: '',
  priority: Priority.MEDIUM,
  category: Category.FEATURE,
  assignedToId: undefined,
  dueDate: ''
};

  onSelect(event: Event){
    const select = event.target as HTMLSelectElement
    console.log(select.value)
  }

  onSubmit(form: NgForm){
    if(form.valid){
     return this.formSended.emit(this.dto);
    
    }
  }

}
