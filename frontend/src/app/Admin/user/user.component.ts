import {Component, OnInit} from '@angular/core';
import {UserService} from "../../Services/Admin/user.service";
import {SharedService} from "../../Services/Admin/shared.service";

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

    users: any = []
    showFormComponent: boolean = false
    showDetailsComponent: boolean = false
    selectedItem: object = {}

    links: string[] = []

    options: object = {
        total: null,
        links: [],
        params: {
            url: `/api/admin/user?page=1`,
            perPage: [5, 10, 20, 50],
            searchValue: '',
        }
    }


    constructor(private userService: UserService, private sharedService: SharedService) {
    }

    ngOnInit(): void {
        this.index()
    }

    paginate(url: string): void {

    }


    index(): void {
        this.userService.index().subscribe({
            next: data => {
                console.log(data)
                this.users = data.data
            },
            error: err => {
            }
        })
    }

    openNew(): void {
        this.sharedService.scrollTop()
        this.sharedService.hideScrollbar()
        this.showFormComponent = true
    }

    closeNew(e: any): void {
        this.sharedService.showScrollbar()
        this.showFormComponent = false
        this.selectedItem = {}
        if(e){
           this.index()
        }

    }

    openEdit(id: number, name: string): void {
        this.selectedItem = {id: id, name: name}
        this.sharedService.scrollTop()
        this.sharedService.hideScrollbar()
        this.showFormComponent = true
    }

    openDetails(id: number, name: string): void {
        this.selectedItem = {id: id, name: name}
        this.sharedService.scrollTop()
        this.sharedService.hideScrollbar()
        this.showDetailsComponent = true
    }

    closeDetails(e: any): void {
        this.sharedService.showScrollbar()
        this.showDetailsComponent = false
        this.selectedItem = {}
    }

}
