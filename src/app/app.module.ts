import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  NgbAccordionModule,
  NgbCarouselModule,
  NgbCollapseModule,
  NgbModule,
} from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './pages/home/home.component';
import { DetalhesFilmeComponent } from './pages/detalhes-filme/detalhes-filme.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { ListaFilmeComponent } from './shared/lista-filme/lista-filme.component';
import { CardFilmeComponent } from './shared/card-filme/card-filme.component';
import { HttpClientModule } from '@angular/common/http';
import { SafePipe } from './shared/pipes/safe-pipe.pipe';
import { ListagemFilmeComponent } from './pages/listagem-filme/listagem-filme.component';
import { FormsModule } from '@angular/forms';
import { PaginationBarComponent } from './shared/paginacao/pagination-bar.component';
import { SearchFilmeComponent } from './pages/search-filme/search-filme.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DetalhesFilmeComponent,
    NavbarComponent,
    ListaFilmeComponent,
    CardFilmeComponent,
    SafePipe,
    ListagemFilmeComponent,
    PaginationBarComponent,
    SearchFilmeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    NgbCarouselModule,
    NgbCollapseModule,
    NgbAccordionModule,
    NgxSkeletonLoaderModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
