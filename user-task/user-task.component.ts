import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-user-task',
  templateUrl: './user-task.component.html',
  styleUrls: ['./user-task.component.css']
})
export class UserTaskComponent implements OnInit {

  userForm!: FormGroup;
  taskForm!: FormGroup;
  idIncrement: any = 2;
  taskIdIncrement:any=2;
  user_id: any
  task_id:any
  isTaskEdit:boolean = false;
  isUserEdit:boolean = false;
  userList: any = [
    {
      id: 1,
      name: "user1",
      taskList: [
        {
          id:1,
          taskname:"task1"
        },
        {
          id:2,
          taskname:"task2"
        }
        
      ]
    },
    {
      id: 2,
      name: "user2",
      taskList: [
        {
          id:1,
          taskname:"task1"
        },{
          id:2,
          taskname:"task2"
        },
      ]
    },
  ];
  taskList: any = [];

  constructor() {

  }
  ngOnInit(): void {
    this.userForm = new FormGroup({
      username: new FormControl("")
    });

    this.taskForm = new FormGroup({
      taskName: new FormControl("")
    });
  }
  // todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  // done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];
  onSubmit() {
    let view = {
      id: 0,
      name: "",
      taskList: []
    }
    this.idIncrement += 1;
    if(this.isUserEdit)
    {
this.userList.forEach((element: any) => {
  if(element.id == this.user_id)
  {
    element.name = this.userForm.value.username;
  }
});
    }
    else
    {
      view.id = this.idIncrement;
      view.name = this.userForm.value.username
      this.userList.push(view)
      this.userForm.reset()

    }

    console.log(this.userList)
  }
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
  onAddTask() {
    this.taskIdIncrement +=1;
    let task ={
      id:0,
      taskname:""
    }
    if(this.isTaskEdit)
    {
      this.userList.forEach((element: any) => {

        if (element.id == this.user_id) {
          element.taskList.forEach((val: any) => {
            if(val.id == this.task_id)
            {
              console.log(val)
               val.taskname = this.taskForm.value.taskName;
            }
          });
        }
  
      });
    }
    else
    {
      this.userList.forEach((element: any) => {

        if (element.id == this.user_id) {
           task.id = this.taskIdIncrement
           task.taskname = this.taskForm.value.taskName;
           element.taskList.push(task);
        
        }
  
      });
    }
    
    console.log(this.taskForm.value)
    this.taskForm.reset()
  }

  OnTaskGetId(id: any) {
    this.user_id = id
    this.isTaskEdit = false
  }

  onDeleteUser(id:any)
  {
    this.userList.splice(id,1);
    // console.log(this.userList)
  }


  OnTaskEdit(userId:any,taskId:any)
  {
    this.task_id = taskId;
    this.user_id = userId;
    this.isTaskEdit = true;
  this.userList.forEach((element: any) => {
    if(element.id == userId)
    {
      element.taskList.forEach((val: any) => {
        if(val.id == taskId)
        {
          this.taskForm.controls['taskName'].setValue(val.taskname)
        }
      });
    }
  });
  }

  OnuserEdit(userId:any)
  {
    this.user_id = userId;
    this.isUserEdit = true;

    this.userList.forEach((element: any) => {

      if(element.id == userId)
      {
        this.userForm.controls['username'].setValue(element.name)
      }
      
    });

  }
  onUserAdd()
  {
    this.isUserEdit = false
  }

}
