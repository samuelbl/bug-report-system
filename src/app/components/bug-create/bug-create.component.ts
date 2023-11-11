import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Bug } from 'src/app/domain/bug';
import { BugService } from 'src/app/service/bug.service';

@Component({
  selector: 'app-bug-create',
  templateUrl: './bug-create.component.html',
  styleUrls: ['./bug-create.component.css']
})
export class BugCreateComponent implements OnInit{
  bugForm!: FormGroup;
  submitted: boolean = false;

  constructor(private formBuilder: FormBuilder, private bugService: BugService, private router: Router) {}
  ngOnInit(): void {
    this.setInitialValues();
  }

  setInitialValues(){
    this.bugForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      priority: ['', Validators.required],
      reporter: ['', Validators.required],
      status: ['']
    });
    this.handleWithStatusValidator();
  }

  handleWithStatusValidator(){
    // If the reporter is QA, make the status field mandatory
    this.bugForm.get('reporter')!.valueChanges.subscribe(reporter => {
      const statusControl = this.bugForm.get('status')!;
      if (reporter === 'QA') {
        statusControl.setValidators([Validators.required]);
      } else {
        statusControl.clearValidators();
      }
      statusControl.updateValueAndValidity();
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.bugForm.valid) {
      let bug: Bug = this.bugForm.value;
      bug.created = new Date();
      this.bugService.createBug(bug).subscribe(() => {
        alert('Bug successfully recorded!');
        this.router.navigate(['/'])
      });
    }
  }

  get title() {
    return this.bugForm.get('title') as FormControl;
  }

  get description() {
    return this.bugForm.get('description') as FormControl;
  }

  get priority() {
    return this.bugForm.get('priority') as FormControl;
  }

  get reporter() {
    return this.bugForm.get('reporter') as FormControl;
  }

  get status() {
    return this.bugForm.get('status') as FormControl;
  }
  
}
