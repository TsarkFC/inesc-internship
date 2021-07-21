import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  apiUrl = "http://localhost:8000/api/process/";
  constructor(private httpClient: HttpClient) { }

  sendPostRequest(data: Object): Observable<Object> {
    return this.httpClient.post(this.apiUrl, data);
  }
}
