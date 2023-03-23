import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {StorageService} from "../../../Services/storage.service";
import {AuthService} from "../../../helper/auth.service";
import {Router} from "@angular/router";
import {SharedService} from "../../../Services/Admin/shared.service";
import {ProfileService} from "../../../Services/Front/profile.service";

@Component({
  selector: 'app-my-data',
  templateUrl: './my-data.component.html',
  styleUrls: ['./my-data.component.scss']
})
export class MyDataComponent {
    hide = true;

    form = new FormGroup({
        name: new FormControl('', [Validators.required]),
        address: new FormControl('', [Validators.required]),
        phone_number: new FormControl(''),
        password: new FormControl('', [Validators.minLength(8)]),
        c_password: new FormControl('', [Validators.minLength(8)]),
    })

    //Szállítási címek
    formAddresses = new FormGroup({
        zip_code: new FormControl('', [Validators.required]),
        city: new FormControl('', [Validators.required]),
        address: new FormControl('', [Validators.required]),
    })

    onSubmit(): void {
        if (!this.form.valid) {
            return
        }
    }
}
