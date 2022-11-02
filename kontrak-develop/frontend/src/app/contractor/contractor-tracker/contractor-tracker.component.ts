// import { Component, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
// import {
//   CdkDragDrop,
//   moveItemInArray,
//   transferArrayItem,
// } from '@angular/cdk/drag-drop';
// import {
//   FormBuilder,
//   FormGroup,
//   FormControl,
//   AbstractControl,
//   Validators,
// } from '@angular/forms';
// import { LoginService } from 'src/app/services/login.service';
// import { TrackerService } from 'src/app/services/tracker.service';
// import { ActivatedRoute, Router } from '@angular/router';

// import { StorageService } from 'src/app/services/storage.service';
// import { Todo } from 'src/app/interfaces/todo';

// import {
//   ConfirmationService,
//   MessageService,
//   PrimeNGConfig,
// } from 'primeng/api';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup'
import { Todo } from 'src/app/interfaces/todo';
import { LoginService } from 'src/app/services/login.service';
import { StorageService } from 'src/app/services/storage.service';
import { TrackerService } from 'src/app/services/tracker.service';

@Component({
  selector: 'app-contractor-tracker',
  templateUrl: './contractor-tracker.component.html',
  styleUrls: ['./contractor-tracker.component.scss']
})
export class ContractorTrackerComponent implements OnInit {

  submitted = false;

  tasks: any[] = [];

  done: Todo[] = [];

  job_id!: any;

  constructor(
    private auth: LoginService,
    private formBuilder: FormBuilder,
    private trackerservice: TrackerService,
    public router: Router,
    private storage: StorageService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,

    private route: ActivatedRoute
  ) {
    route.params.subscribe((param) => (this.job_id = param['id']));
    trackerservice.getJob(this.job_id).subscribe((todoes: Todo[]) => {
      console.log(todoes);
      this.todo = todoes;
      console.log(this.job_id);
    });

    trackerservice.getDoneTask(this.job_id).subscribe((doneTask: Todo[]) => {
      console.log(doneTask);
      this.done = doneTask;
    });
  }

  //============= form for the modal ===========
  Form = new FormGroup({
    task: new FormControl(''),
  });

  newtodo: Todo[] = [];

  ngDoCheck() {
    if (!(this.todo.length < 0)) {
      console.log(this.todo);

      console.log(this.done);

      if (this.todo.length === 0) {
        //==================  do a request to update=======================

        console.log('done');
      }
    }
  }

  todo!: Todo[];

  //============ create task to use on NgModel---HTML ==============
  task_name: string = '';

  ngOnInit(): void {
    this.todo.forEach((element) => {
      this.newtodo.push(element);
    });
  }

  // =========== submit function for  the modal ===============

  onSubmit(): void {
    // ========== decoding the form to get the user id ============

    let decodedToken = this.auth.decodeToken(
      localStorage.getItem('access_token')
    );
    this.submitted = true;

    // ===========initialising the task variable to store the task_name user_id task_status and job id ==========

    let postTask = {
      task_name: this.task_name,
      user_id: decodedToken.user.user_id,
      task_status: 'pending',
      job_id: this.job_id,
    };

    //============ post a task and reload the page one its done  =============

    this.trackerservice.postTask(postTask).subscribe({
      next: (res: any) => {
        console.log(res);
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        window.location.reload();
      },
      error: (err: any) => {
        console.log(err);
      },
    });

    if (this.Form.invalid) {
      return;
    }
    console.log(postTask);
  }

  //=============== validate the form controls ==============

  get f(): { [key: string]: AbstractControl } {
    return this.Form.controls;
  }
  //============= reset the form after sending data ===========

  onReset(): void {
    this.submitted = false;
    this.Form.reset();
  }

  //============= get tasks ===========

  getTasks() {
    let id = {
      Job_id: this.storage.job_id,
      task_Status: 'pending',
      task_id: this.storage.task_id,
      task_name: this.Form.value.task,
    };

    // ========== subscribing to the job table  ========

    this.trackerservice.getJob(id).subscribe((data) => {
      (this.todo = data), (this.done = data);
    });
  }

  //==================== angular material drag drop =============================================

  drop(event: CdkDragDrop<Todo[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      // console.table(this.done);
      // console.table(this.todo);

      //========= the for loop to calculate the legth of the done array ===============

      for (let index = 0; index < this.done.length; index++) {
        //========= the task variable to pass the status of the task ===========

        let track = {
          task_status: 'complete',
        };

        console.log(this.done[index].task_id);

        // ========== subscribing to the task table and updating the status from pending to complete ============

        this.trackerservice
          .updateStatus(this.done[index].task_id, track)
          .subscribe({
            next: (res: any) => {
              console.log(res);
            },
            error: (err: any) => {
              console.log(err);
            },
          });
      }

      for (let index = 0; index < this.todo.length; index++) {
        let track = {
          task_status: 'pending',
        };

        console.log(this.todo[index].task_id);

        // ========== subscribing to the task table and updating the status from pending to complete ============

        this.trackerservice
          .updateStatus(this.todo[index].task_id, track)
          .subscribe({
            next: (res: any) => {
              console.log(res);
            },
            error: (err: any) => {
              console.log(err);
            },
          });
      }
    }
  }
  //====================dialog for modal==========================
  confirm() {
    this.confirmationService.confirm({
      //  target: event.target,
      message: 'Are you sure you want to add a new task?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Confirmed',
          detail: 'Task added',
        });
        this.onSubmit();
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'You have cancelled',
        });
      },
    });
  }
  reviews() {
    let data = {
      contractor_id:18,
    };
    localStorage.setItem('review','18')

    this.storage.contractor_id = data.contractor_id;
    this.router.navigateByUrl('/write');
  }


}
