import {NgModule} from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {UserComponent} from './Admin/user/user.component';
import {AuthorComponent} from './Admin/author/author.component';
import {BookComponent} from './Admin/book/book.component';
import {CategoryComponent} from './Admin/category/category.component';
import {CoverTypeComponent} from './Admin/cover-type/cover-type.component';
import {LabelComponent} from './Admin/label/label.component';
import {DashboardComponent} from './Admin/dashboard/dashboard.component';
import {IndexComponent} from './index/index.component';
import {FooterComponent} from './footer/footer.component';
import {HeaderComponent} from './header/header.component';
import {FilterComponent} from './Front/filter/filter.component';
import {LoginComponent} from './Front/login/login.component';
import {RegisterComponent} from './Front/register/register.component';
import {TopSectionComponent} from './index/top-section/top-section.component';
import {LastRentedComponent} from './index/last-rented/last-rented.component';
import {TestimonialComponent} from './index/testimonial/testimonial.component';
import {ErrorNotFoundComponent} from './Errors/error-not-found/error-not-found.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {ErrorForbiddenComponent} from './Errors/error-forbidden/error-forbidden.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UserFormComponent } from './Admin/user/user-form/user-form.component';
import { UserDetailsComponent } from './Admin/user/user-details/user-details.component';
import { PaginationComponent } from './Admin/includes/pagination/pagination.component';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatSelectModule} from "@angular/material/select";
import {MatOptionModule} from "@angular/material/core";
import {MatInputModule} from "@angular/material/input";
import {MatTooltipModule} from "@angular/material/tooltip";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";


@NgModule({
    declarations: [
        AppComponent,
        UserComponent,
        AuthorComponent,
        BookComponent,
        CategoryComponent,
        CoverTypeComponent,
        LabelComponent,
        DashboardComponent,
        IndexComponent,
        FooterComponent,
        HeaderComponent,
        FilterComponent,
        LoginComponent,
        RegisterComponent,
        TopSectionComponent,
        LastRentedComponent,
        TestimonialComponent,
        ErrorNotFoundComponent,
        ErrorForbiddenComponent,
        SidebarComponent,
        UserFormComponent,
        UserDetailsComponent,
        PaginationComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        MatIconModule,
        MatButtonModule,
        MatFormFieldModule,
        MatSlideToggleModule,
        MatSelectModule,
        MatOptionModule,
        MatInputModule,
        MatTooltipModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
