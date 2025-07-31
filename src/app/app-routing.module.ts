import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignalsIntroComponent } from './signals-intro/signals-intro.component';
import { EffectsComponent } from './effects/effects.component';
import { ElementDetailsComponent } from './element-details/element-details.component';
import { ElementListComponent } from './element-list/element-list.component';
import { ComputedSignalComponent } from './computed-signal/computed-signal.component';

const routes: Routes = [
  { path: '', redirectTo: 'elements', pathMatch: 'full' }, 
  { path: 'intro', component: SignalsIntroComponent }, 
  { path: 'effects', component: EffectsComponent }, 
  { path: 'computed-signal', component: ComputedSignalComponent }, 
  {
    path: 'elements', 
    children: [
      { path: '', component: ElementListComponent, outlet: 'list' },
      { path: '', component: ElementDetailsComponent, outlet: 'details' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }