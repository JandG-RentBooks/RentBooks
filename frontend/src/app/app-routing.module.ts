import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthService} from "./helper/auth.service";
import {AuthGuard} from "./helper/auth.guard";
import {AdminGuard} from "./helper/role/admin.guard";
import {EmployeeGuard} from "./helper/role/employee.guard";
import {UserGuard} from "./helper/role/user.guard";
import {IndexComponent} from "./index/index.component";
import {ErrorNotFoundComponent} from "./Errors/error-not-found/error-not-found.component";
import {DashboardComponent} from "./Admin/dashboard/dashboard.component";
import {UserComponent} from "./Admin/user/user.component";
import {LoginComponent} from "./Front/login/login.component";
import {RegisterComponent} from "./Front/register/register.component";
import {AuthorComponent} from "./Admin/author/author.component";
import {BookComponent} from "./Admin/book/book.component";
import {CategoryComponent} from "./Admin/category/category.component";
import {CoverTypeComponent} from "./Admin/cover-type/cover-type.component";
import {LabelComponent} from "./Admin/label/label.component";
import {ErrorForbiddenComponent} from "./Errors/error-forbidden/error-forbidden.component";
import {ImageStorageComponent} from "./Admin/image-storage/image-storage.component";
import {PublisherComponent} from "./Admin/publisher/publisher.component";
import {SubscriptionTypeComponent} from "./Admin/subscription-type/subscription-type.component";
import {ProfileComponent} from "./Front/profile/profile.component";
import {BooksComponent} from "./Front/books/books.component";

const routes: Routes = [
    {
        path: "",
        component: IndexComponent
    },
    {
        path: "login",
        title: 'Bejelentkezés',
        component: LoginComponent
    },
    {
        path: "register",
        title: 'Regisztráció',
        component: RegisterComponent
    },
    {
        path: "index",
        component: IndexComponent
    },
    {
        path: "books",
        component: BooksComponent
    },

    {
        path: "profile",
        title: 'Adataim',
        component: ProfileComponent,
        canActivate: [AuthGuard, UserGuard]
    },

    {
        path: "admin/dashboard",
        data: {breadcrumb: {alias: 'Dashboard'}},
        title: 'Dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard, EmployeeGuard]
    },
    {
        path: "admin/users",
        title: 'Felhasználók',
        data: {breadcrumb: {alias: 'Felhasználók'}},
        component: UserComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path: "admin/authors",
        title: 'Szerzők',
        data: {breadcrumb: {alias: 'Szerzők'}},
        component: AuthorComponent,
        canActivate: [AuthGuard, EmployeeGuard]
    },
    {
        path: "admin/books",
        title: 'Könyvek',
        data: {breadcrumb: {alias: 'Könyvek'}},
        component: BookComponent,
        canActivate: [AuthGuard, EmployeeGuard]
    },
    {
        path: "admin/categories",
        title: 'Kategóriák',
        data: {breadcrumb: {alias: 'Kategóriák'}},
        component: CategoryComponent,
        canActivate: [AuthGuard, EmployeeGuard]
    },
    {
        path: "admin/cover-types",
        title: 'Borító típusok',
        data: {breadcrumb: {alias: 'Borító típusok'}},
        component: CoverTypeComponent,
        canActivate: [AuthGuard, EmployeeGuard]
    },
    {
        path: "admin/labels",
        title: 'Cimkék',
        data: {breadcrumb: {alias: 'Cimkék'}},
        component: LabelComponent,
        canActivate: [AuthGuard, EmployeeGuard]
    },
    {
        path: "admin/publishers",
        title: 'Kiadók',
        data: {breadcrumb: {alias: 'Kiadók'}},
        component: PublisherComponent,
        canActivate: [AuthGuard, EmployeeGuard]
    },
    {
        path: "admin/image-storage",
        title: 'Médiatár',
        data: {breadcrumb: {alias: 'Médiatár'}},
        component: ImageStorageComponent,
        canActivate: [AuthGuard, EmployeeGuard]
    },
    {
        path: "admin/subscription-type",
        title: 'Előfizetés típusok',
        data: {breadcrumb: {alias: 'Előfizetés típusok\''}},
        component: SubscriptionTypeComponent,
        canActivate: [AuthGuard, EmployeeGuard]
    },

    {
        path: "forbidden",
        title: 'Hozzáférés megtagadva',
        component: ErrorForbiddenComponent
    },

    {
        path: "**",
        component: ErrorNotFoundComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthService, AuthGuard]
})
export class AppRoutingModule {
}
