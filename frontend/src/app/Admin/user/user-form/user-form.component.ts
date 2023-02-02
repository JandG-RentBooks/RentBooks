import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../Services/Admin/user.service";

interface Role {
    value: number,
    name: string
}

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.scss']
})

export class UserFormComponent implements OnInit {

    @Input()
    selectedItem: any

    @Output()
    closeEventEmitter = new EventEmitter()


    constructor(private userService: UserService, private fb: FormBuilder) {
    }

    roleList: any = []

    form = this.fb.group({
        name: [''],
        email: [''],
        password: [''],
        address: [''],
        phone_number: [''],
        role: [''],
    })

    ngOnInit(): void {
        console.log('ngOnInit: this.selectedItem.id')
        console.log(this.selectedItem.id)
        if (this.selectedItem.id === undefined) {
            this.create()
        } else {
            this.edit()
        }
    }

    create(): void {
        this.userService.create().subscribe({
            next: data => {
                console.log(data)
                this.roleList = data.roles
            },
            error: err => {
            }
        })
    }

    edit(): void {
        this.userService.edit(this.selectedItem.id).subscribe({
            next: data => {
                console.log(data)
                this.form.patchValue({
                    name: data.user[0].name,
                    email: data.user[0].email,
                    address: data.user[0].address,
                    phone_number: data.user[0].phone_number,
                    role: data.user[0].roles[0].id
                })
                this.roleList = data.roles
            },
            error: err => {
            }
        })
    }

    store(): void {
        this.userService.store(this.form.value).subscribe({
            next: data => {
                console.log('STORE')
                console.log(data)
                if(data.success){
                    this.close(true)
                }
            },
            error: err => {
                console.log(err)
            }
        })
    }

    update(): void {
        this.userService.update(this.form.value, this.selectedItem.id).subscribe({
            next: data => {
                if(data === 'success'){
                    this.close(true)
                }
            },
            error: err => {
            }
        })
    }


    close(state: boolean = false): void {
        this.selectedItem = null
        this.closeEventEmitter.emit(state)
    }
}
