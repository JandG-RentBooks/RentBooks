import {Component, OnInit} from '@angular/core';
import {UserService} from "../../Services/Admin/user.service";
import {SharedService} from "../../Services/Admin/shared.service";
import {environment} from '../../../environments/environment';

declare var window: any;

const API_URL = environment.apiUrl;

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit {

    mainCollection: any = []
    showFormComponent: boolean = false
    showDetailsComponent: boolean = false
    selectedItem: any = {id: null, name: ''}

    links: any = []
    total: number = 0
    isSearch: boolean = false
    params: { url: string, pages: number[], perPage: number, searchValue: string } = {
        url: `${API_URL}admin/user?page=1`,
        pages: [5, 10, 20, 50],
        perPage: 10,
        searchValue: '',
    }

    modalDelete: any
    modalError: any
    errors: any

    constructor(private userService: UserService, private sharedService: SharedService) {
        this.index()
    }

    ngOnInit(): void {
        this.modalDelete = new window.bootstrap.Modal(document.getElementById('itemDeleteModal'))
    }

    paginate(url: string): void {
        this.params.url = url
        this.index()
    }

    perPageOnChange(e: any): void {
        let url = `${API_URL}admin/user?page=1`
        this.paginate(url)
    }

    search(): void {
        this.isSearch = true
        this.perPageOnChange(null)
    }

    searchReset(): void {
        this.params.searchValue = ''
        if (!this.isSearch) {
            return
        }
        this.perPageOnChange(null)
        this.isSearch = false
    }

    index(): void {
        this.userService.index(this.params).subscribe({
            next: data => {
                console.log(data)
                this.mainCollection = data.data
                this.links = data.links
                this.total = data.total
            },
            error: err => {
            }
        })
    }

    destroy(e: any): void {
        this.modalDelete.toggle()
        this.sharedService.showPostCover()
        this.userService.destroy(this.selectedItem.id).subscribe({
            next: data => {
                this.sharedService.hidePostCover()
                console.log(data)
                this.perPageOnChange(null)
            },
            error: err => {
                this.sharedService.hidePostCover()
                this.openErrorModal(err)
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
        this.selectedItem = {id: null, name: ''}
        if (e) {
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
        this.selectedItem = {id: null, name: ''}
    }

    openErrorModal(err: any) {
        this.modalError = new window.bootstrap.Modal(document.getElementById('errorModal'))
        let errorText = document.querySelector('.error-text')
        if (errorText) {
            errorText.innerHTML = ''
            errorText.innerHTML = this.sharedService.errorHandler(err)
            this.modalError.toggle()
        }
    }

    openDeleteModal(id: number, name: string): void {
        this.selectedItem = {id: id, name: name}
        this.modalDelete.toggle()
    }
}
