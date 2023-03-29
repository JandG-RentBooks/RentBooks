import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {StorageService} from "../storage.service";

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

    httpOptions = {
        params: {},
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.storageService.getUser().token}`
        })
    };

    constructor(private http: HttpClient, private storageService: StorageService) {}

    /**
     * Stat Cards
     */
    getStatCardsData(): Observable<any> {
        this.httpOptions.params = {}
        return this.http.get(
            API_URL + 'admin/dashboard/stat-cards-data',
            this.httpOptions
        );
    }

    /**
     * Aktív Kölcsönzések
     */
    getActiveLendings(params: any): Observable<any> {
        this.httpOptions.params = {page_length: params.perPage, search: params.searchValue}
        return this.http.get(
            API_URL + 'admin/dashboard/active-lendings',
            this.httpOptions
        );
    }

    /**
     * Kiválasztott kölcsönzés
     * @param id
     */
    getLending(id: number): Observable<any> {
        this.httpOptions.params = {}
        return this.http.get(
            API_URL + `admin/dashboard/lending/${id}`,
            this.httpOptions
        );
    }

    /**
     * Bank transfer
     * User keresése payment_id alapján
     * @param paymentId
     */
    getUserByPaymentId(paymentId: number): Observable<any> {
        this.httpOptions.params = {payment_id: paymentId}
        return this.http.get(
            API_URL + 'admin/dashboard/user-by-payment-id',
            this.httpOptions
        );
    }

    /**
     * Bank transfer
     * Beérkező utalások kezelése
     * @param data
     */
    updateLastPaymentDate(data: any): Observable<any> {
        this.httpOptions.params = {}
        return this.http.patch(
            API_URL + `admin/dashboard/update-last-payment-date`,
            {
                user_id: data.name,
                last_payment_date: data.birthday
            },
            this.httpOptions
        );
    }


    /**
     * Kölcsönzés létrehozás folyamata
     * Releváns felhasználók listázása
     * Kiválasztott felhasználó - könyvek kivánságlista alapján
     * Üres kölcsönzés létrehozása - State 1
     * Könyv hozzárendelése a kölcsönzéshez
     * Könyv viszavétele a kölcsönzésből
     * Kölcsönzés átadva csomagolásra - State 2
     */

    getRelevantUsers(): Observable<any> {
        this.httpOptions.params = {}
        return this.http.get(
            API_URL + 'admin/dashboard/relevant-users',
            this.httpOptions
        );
    }

    getUser(id: number): Observable<any> {
        this.httpOptions.params = {}
        return this.http.get(
            API_URL + `admin/dashboard/user/${id}`,
            this.httpOptions
        );
    }

    storeLending(data: any): Observable<any> {
        this.httpOptions.params = {}
        return this.http.post(
            API_URL + 'admin/dashboard/lending',
            {
                user_id: data.user_id
            },
            this.httpOptions
        );
    }

    addBookToLending(data: any): Observable<any> {
        this.httpOptions.params = {}
        return this.http.post(
            API_URL + 'admin/dashboard/lending/add-book',
            {
                lending_id: data.lending_id,
                book_id: data.book_id
            },
            this.httpOptions
        );
    }

    removeBook(data: any): Observable<any> {
        this.httpOptions.params = {}
        return this.http.post(
            API_URL + 'admin/dashboard/lending/remove-book',
            {
                lending_id: data.lending_id,
                book_id: data.book_id
            },
            this.httpOptions
        );
    }

    updateLendingState(data: any): Observable<any> {
        this.httpOptions.params = {}
        return this.http.patch(
            API_URL + `admin/dashboard/lending/set-state`,
            {
                lending_id: data.lending_id,
                state: data.state
            },
            this.httpOptions
        );
    }

    /**
     * Csomagolásra átadott kölcsönzések listája.
     * QR kód (shipping_token) nyomtatás
     * Csomagolva állapot beállítása - State 3
     */



    /**
     * Received Packages - Visszaérkezett könyvek kezelése
     *
     * Kölcsönzés keresése shipping_token alapján
     * @param token
     */
    getLandingByShippingToken(token: string): Observable<any> {
        this.httpOptions.params = {shipping_token: token}
        return this.http.get(
            API_URL + 'admin/dashboard/lending-by-shipping-token',
            this.httpOptions
        );
    }

    /**
     * Könyv selejtezése
     * @param lendingId
     * @param bookId
     */
    bookScrapping(lendingId: number, bookId: number): Observable<any> {
        this.httpOptions.params = {}
        return this.http.patch(
            API_URL + `admin/dashboard/book/scrapping`,
            {
                lending_id: lendingId,
                book_id: bookId,
            },
            this.httpOptions
        );
    }

    /**
     * Könyv bevételezése
     * @param lendingId
     * @param bookId
     */
    increaseBookAvailableNumber(lendingId: number, bookId: number): Observable<any> {
        this.httpOptions.params = {}
        return this.http.patch(
            API_URL + `admin/dashboard/book/increase-available-number`,
            {
                lending_id: lendingId,
                book_id: bookId,
            },
            this.httpOptions
        );
    }

    /**
     * Kölcsönzés lezárása - State 4
     * @param lendingId
     */
    closeLending(lendingId: number): Observable<any> {
        this.httpOptions.params = {}
        return this.http.patch(
            API_URL + `admin/dashboard/close-lending`,
            {
                lending_id: lendingId
            },
            this.httpOptions
        );
    }

}
