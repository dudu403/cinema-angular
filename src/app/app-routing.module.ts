import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalhesFilmeComponent } from './pages/detalhes-filme/detalhes-filme.component';
import { HomeComponent } from './pages/home/home.component';
import { ListagemFilmeComponent } from './pages/listagem-filme/listagem-filme.component';
import { SearchFilmeComponent } from './pages/search-filme/search-filme.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'filmes/home',
    pathMatch: 'full',
  },
  {
    path: 'filmes/home',
    component: HomeComponent,
  },
  {
    path: 'filmes/detalhes/:id',
    component: DetalhesFilmeComponent,
  },
  {
    path: 'filmes/lista',
    component: ListagemFilmeComponent,
  },
  {
    path: 'filmes/search',
    component: SearchFilmeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
