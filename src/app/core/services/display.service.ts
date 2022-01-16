import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DisplayService {

  constructor(
    private http: HttpClient,
  ) { }

  getQuestions(): Observable<any> {
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json'
    // });
    return this.http.get(`${environment.baseUrl}/messages/view`);
  }

  updateAnsweredQuestion(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(`${environment.baseUrl}/messages/answered`,JSON.stringify(data),{ headers: headers })
  }
}
