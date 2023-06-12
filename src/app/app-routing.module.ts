import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { RegisterComponent } from './register/register.component';
import { ElasticproductComponent } from './elasticproduct/elasticproduct.component';
import { AuthGuard } from './helpers/auth.guard';
import { Role } from './models/Role';
import { KibanaMetricsComponent } from './kibana-metrics/kibana-metrics.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'home', component: HomeComponent},
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'elasticProduct', component: ElasticproductComponent , canActivate: [AuthGuard] , data: { roles: [Role.User]}},
      { path: 'kibana', component: KibanaMetricsComponent , canActivate: [AuthGuard] , data: { roles: [Role.Admin]}},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
