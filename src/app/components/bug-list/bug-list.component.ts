import { Component, OnInit } from '@angular/core';
import { Bug } from 'src/app/domain/bug';
import { BugService } from 'src/app/service/bug.service';

@Component({
  selector: 'app-bug-list',
  templateUrl: './bug-list.component.html',
  styleUrls: ['./bug-list.component.css']
})
export class BugListComponent implements OnInit{
  bugs: Bug[] = [];
  sortingField: string = 'title';
  isAscending: boolean = true;

  constructor(private bugService: BugService){}

  ngOnInit(): void {
    this.loadBugs();
  }

  loadBugs(){
    this.bugService.getBugs(this.sortingField, this.isAscending ? 'asc' : 'desc').subscribe(data => {
      this.bugs = data;
    });
  }

  sort(field: string){
    console.log("field = " + field);
    console.log("sorting field = " + this.sortingField);
    if(this.sortingField === field){
      console.log("isAscending = " + this.isAscending);
      this.isAscending = !this.isAscending
      console.log("isAscending after changed = " + this.isAscending);
    }else{
      this.sortingField = field;
      this.isAscending = true;
    }
    this.loadBugs();
  }

}
