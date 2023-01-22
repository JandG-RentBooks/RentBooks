import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
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
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
