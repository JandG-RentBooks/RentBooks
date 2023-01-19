import {Component, OnInit} from '@angular/core';
import {AuthService} from "../helper/auth.service";
import {StorageService} from "../Services/storage.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  showAdminFooter = false

  constructor(
    private authService: AuthService,
    private storageService: StorageService,) {
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()){
      this.showAdminFooter = location.href.split('/').includes('admin')



    }
  }

}
