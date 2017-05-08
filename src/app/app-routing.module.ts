import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SearchComponent } from './components/search.component';
import { EmployeeComponent } from './pages/employee.component';
import { UnitComponent } from './pages/unit.component';

const routes: Routes = [
  { path: '', redirectTo: 'employee', pathMatch: 'full' },
  { path: 'employee',  component: EmployeeComponent },
  { path: 'unit',  component: UnitComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],//导入路由组件启动路由
  exports: [ RouterModule ]//导出路由模块
})
export class AppRoutingModule {}





