import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
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

    constructor(private http: HttpClient, private storageService: StorageService) {
    }

    index(): Observable<any> {
        return this.http.get(
            API_URL + 'admin/user',
            this.httpOptions
        );
    }

    create(): Observable<any> {
        return this.http.get(
            API_URL + 'admin/user/create',
            this.httpOptions
        );
    }



    edit(id: Number): Observable<any> {
        return this.http.get(
            API_URL + `admin/user/${id}/edit`,
            this.httpOptions
        );
    }

    show(id: Number): Observable<any> {
        return this.http.get(
            API_URL + `admin/user/${id}`,
            this.httpOptions
        );
    }

    store(data: any): Observable<any> {
        console.log(data)
        return this.http.post(
            API_URL + 'admin/user',
            {
                name: data.name,
                email: data.email,
                password: data.password,
                address: data.address,
                phone_number: data.phone_number,
                role_id: data.role,
            },
            this.httpOptions
        );
    }

    update(data: any, id: number): Observable<any> {
        console.log(data)
        return this.http.patch(
            API_URL + `admin/user/${id}`,
            {
                name: data.name,
                email: data.email,
                password: data.password,
                address: data.address,
                phone_number: data.phone_number,
                role_id: data.role,
            },
            this.httpOptions
        );
    }
}
