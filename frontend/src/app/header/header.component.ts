import {Component, OnInit} from '@angular/core';
import {AuthService} from "../helper/auth.service";
import {StorageService} from "../Services/storage.service";
import {Router} from "@angular/router";
import {LogoutService} from "../Services/logout.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  showAdminMenu = false
  showLogoutLink = false
  showLoginLink = false
  showProfileLink = false
  showAdminLink = false

  userName: string = ''

  roles: any = {
    isAdmin: false,
    isEmployee: false,
    isUser: false,
  }

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private logOutService: LogoutService,
    private route: Router) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()){
      this.roles.isAdmin = this.authService.isAdmin()
      this.roles.isEmployee = this.authService.isEmployee()
      this.roles.isUser = this.authService.isUser()

      this.showAdminLink = this.authService.isAdmin() || this.authService.isEmployee()

      this.showAdminMenu = location.href.split('/').includes('admin')
      this.showLogoutLink = true
      this.showProfileLink = true

      this.userName = this.authService.getUserName()
    } else{
      this.showLoginLink = true
    }
  }

  logOut(): void {
    console.log('logOut')
    this.logOutService.logout().subscribe({
      next: data => {
        console.log(data)
      },
      error: error => {
        console.log(error)
      }
    });
    this.storageService.clean()
    location.reload()
  }

}
