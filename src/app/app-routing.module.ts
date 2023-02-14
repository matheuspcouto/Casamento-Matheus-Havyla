import { ListaPresenteComponent } from './modules/lista-presentes/lista-presentes.component';
import { SucessoComprovanteComponent } from './modules/sucesso-comprovante/sucesso-comprovante.component';
import { SiteAtivoGuard } from './guards/site-ativo.guard';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AguardeComponent } from './modules/aguarde/aguarde.component';
import { HomeComponent } from './modules/home/home.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent, canActivate: [SiteAtivoGuard] },
  { path: 'lista-presentes', component: ListaPresenteComponent, canActivate:[SiteAtivoGuard] },
  //{ path: 'confirmar-presenca', component: DetalhesProdutoComponent, canActivate:[SiteAtivoGuard] },
  { path: 'comprovante', component: SucessoComprovanteComponent },
  { path: 'aguarde', component: AguardeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
