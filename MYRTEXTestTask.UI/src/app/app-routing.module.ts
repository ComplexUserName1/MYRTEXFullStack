import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListOfEmployeesComponent } from './components/list-of-employees/list-of-employees.component';
import { CompanyAboutComponent } from './components/company-about/company-about.component';

const routes: Routes = [
  {
    path: 'about',
    component: CompanyAboutComponent
  },
  {
    path: 'employees',
    component: ListOfEmployeesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }