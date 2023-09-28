import { Component, OnInit } from '@angular/core';
import { IFavoritosFilmes } from 'src/app/models/filme-favoritos';
import { FilmeLista } from 'src/app/models/filme-lista';
import { FilmeService } from 'src/app/services/filme.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  favoritos: IFavoritosFilmes = { favoritosIds: [] };
  filmesLancamentos: FilmeLista[] = [];
  filmes: FilmeLista[] = [];

  constructor(private filmeService: FilmeService) {}

  ngOnInit(): void {
    this.filmeService
      .obterListaFilmes('Lancamentos', 1, '')
      .subscribe((resultado) => {
        this.filmesLancamentos = resultado.filmes;
      });
    this.filmeService
      .obterListaFilmes('EmAlta', 1, '')
      .subscribe((resultado) => {
        this.filmes = resultado.filmes;
      });
  }
}
