import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthService} from "./helper/auth.service";
import {AuthGuard} from "./helper/auth.guard";
import {AdminGuard} from "./helper/role/admin.guard";
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

  {path: "admin", title: 'Dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: "admin/users", title: 'Felhasználók', component: UserComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: "admin/authors", title: 'Szerzők', component: AuthorComponent, canActivate: [AuthGuard]},
  {path: "admin/books", title: 'Könyvek', component: BookComponent, canActivate: [AuthGuard]},
  {path: "admin/categories", title: 'Kategóriák', component: CategoryComponent, canActivate: [AuthGuard]},
  {path: "admin/cover-types", title: 'Borító típusok', component: CoverTypeComponent, canActivate: [AuthGuard]},
  {path: "admin/labels", title: 'Cimkék', component: LabelComponent, canActivate: [AuthGuard]},

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
