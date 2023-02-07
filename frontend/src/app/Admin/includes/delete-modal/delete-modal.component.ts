import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-delete-modal',
    templateUrl: './delete-modal.component.html',
    styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent implements OnInit {

    @Input()
    name: string | undefined

    @Output()
    deleteEventEmitter = new EventEmitter()

    constructor() {
    }

    ngOnInit(): void {
    }

    deleteItem(): void {
        this.deleteEventEmitter.emit()
    }

}
