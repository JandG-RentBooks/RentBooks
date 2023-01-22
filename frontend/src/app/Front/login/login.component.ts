import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../Services/login.service";
import {StorageService} from "../../Services/storage.service";
import {AuthService} from "../../helper/auth.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

    form: any = {
        email: null,
        password: null
    };
    isLoggedIn = false;
    isLoginFailed = false;
    errorMessage = '';
    roles: string[] = [];

    constructor(
        private loginService: LoginService,
        private storageService: StorageService,
        private authService: AuthService,
        private route: Router) {
    }

    ngOnInit(): void {
        if (this.storageService.isLoggedIn()) {
            this.isLoggedIn = true;
            this.roles = this.storageService.getUser().roles;
            this.route.navigate(['/']).then(r => null)
        }
    }

    onSubmit(): void {
        const {email, password} = this.form;

        this.loginService.login({email: email, password: password}).subscribe({
            next: data => {
                if (data.success) {
                    this.storageService.setUser(data.data);
                    this.isLoginFailed = false;
                    this.isLoggedIn = true;
                    this.roles = this.storageService.getUser().roles;
                    location.reload()
                }
            },
            error: err => {
                this.errorMessage = err.error.message;
                this.isLoginFailed = true;
            }
        });
    }

}
