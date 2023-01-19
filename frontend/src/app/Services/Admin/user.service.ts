import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {StorageService} from "../storage.service";

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.storageService.getUser().token}`
    })
  };

  constructor(private http: HttpClient, private storageService: StorageService) { }

  getUsers(): Observable<any> {
    return this.http.get(
      API_URL + 'admin/user',
      this.httpOptions
    );
  }
}
