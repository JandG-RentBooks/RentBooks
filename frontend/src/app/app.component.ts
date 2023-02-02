import {Component, OnInit} from '@angular/core';
import {environment} from '../environments/environment';
import {AuthService} from "./helper/auth.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'Rent Books';
    isAdmin = false
    constructor(private authService: AuthService) {
    }

    ngOnInit(): void {
        if (this.authService.isAuthenticated()) {
            this.isAdmin = location.href.split('/').includes('admin')
        }
    }
}
