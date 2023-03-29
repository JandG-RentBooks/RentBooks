import {Component} from '@angular/core';
import {DashboardService} from "../../../Services/Admin/dashboard.service";

@Component({
    selector: 'app-stat-cards',
    templateUrl: './stat-cards.component.html',
    styleUrls: ['./stat-cards.component.scss']
})
export class StatCardsComponent {

    constructor(private dashboardService: DashboardService) {
    }

    ngOnInit(): void {
        this.getStatCardsData()
    }

    getStatCardsData(): void {
        this.dashboardService.getStatCardsData().subscribe({
            next: data => {
                console.log(data)
            },
            error: error => {
                console.log(error)
            }
        })
    }
}
