import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {StorageService} from "../storage.service";

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

    httpOptions = {
        params: {},
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.storageService.getUser().token}`
        })
    };

    constructor(private http: HttpClient, private storageService: StorageService) {
    }

    getWishlist(): Observable<any> {
        this.httpOptions.params = {}
        return this.http.get(
            API_URL + `profile/wishlist`,
            this.httpOptions
        );
    }

    sortWishlist(list: any): Observable<any> {
        this.httpOptions.params = {}
        return this.http.patch(
            API_URL + `profile/wishlist`,
            {
                wishlist: list
            },
            this.httpOptions
        );
    }

    removeWishlist(id: number): Observable<any> {
        this.httpOptions.params = {}
        return this.http.post(
            API_URL + `profile/wishlist/delete`,
            {
                id: id
            },
            this.httpOptions
        );
    }


}
