import { Component, Input, OnInit } from '@angular/core';
import { IFavoritosFilmes } from 'src/app/models/filme-favoritos';
import { FilmeLista } from 'src/app/models/filme-lista';
import { RepositorioFilmesFavoritos } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-card-filme',
  templateUrl: './card-filme.component.html',
  styleUrls: ['./card-filme.component.css'],
})
export class CardFilmeComponent implements OnInit {
  @Input() filme: FilmeLista = new FilmeLista('', '', '', '', '');
  favoritos: IFavoritosFilmes = { favoritosIds: [] };
  idFilme: number = 0;

  constructor(private repositorioFavoritos: RepositorioFilmesFavoritos) {}

  ngOnInit(): void {
    this.favoritos = this.repositorioFavoritos.carregarFavoritos();
    this.idFilme = parseInt(this.filme.id);
  }
}
