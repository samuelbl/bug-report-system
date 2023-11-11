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
    if(this.sortingField === field){
      this.isAscending = !this.isAscending
    }else{
      this.sortingField = field;
      this.isAscending = true;
    }
    this.loadBugs();
  }

}
