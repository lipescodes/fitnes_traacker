import { TrainingComponent } from './training.component';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { NgModule } from "@angular/core";

const routes: Routes = [
  { path: '', component: TrainingComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TrainingRouterModule{}
