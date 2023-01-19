import { Component, OnInit } from '@angular/core';
import {UserService} from "../../Services/Admin/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  users: any = []
  constructor( private userService: UserService) { }

  ngOnInit(): void {
    this.index()
  }

  index(): void {
    this.userService.getUsers().subscribe({
      next: data => {
        console.log(data)
        this.users = data.data
      },
      error: err => {

      }
    });
  }

}
