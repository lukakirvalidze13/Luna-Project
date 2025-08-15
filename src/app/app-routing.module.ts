import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { WheelComponent } from './pages/wheel/wheel.component';
import { PositionsComponent } from './pages/positions/positions.component';
import { MinigamesComponent } from './pages/minigames/minigames.component';
const routes: Routes = [

  {path: '', component: HomepageComponent},
  {path: 'wheel', component: WheelComponent},
  {path: 'positions', component: PositionsComponent},
  {path: 'minigames', component: MinigamesComponent},
  {path: '**', redirectTo: ''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
