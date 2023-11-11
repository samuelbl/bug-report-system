import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bug } from '../domain/bug';

@Injectable({
  providedIn: 'root'
})
export class BugService {

  baseUrl = "http://localhost:3000/bugs";

  constructor(private http: HttpClient) { }

  getBugs(sortField: string, sortOrder: string){
    const params = new HttpParams()
    .set('_sort', sortField)
    .set('_order', sortOrder);
    
    return this.http.get<Bug[]>(this.baseUrl, {params});
  }

  createBug(bugData: Bug) {
    return this.http.post<Bug>(this.baseUrl, bugData);
  }

}
