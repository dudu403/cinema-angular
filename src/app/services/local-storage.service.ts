import { Injectable } from '@angular/core';
import { IFavoritosFilmes } from '../models/filme-favoritos';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RepositorioFilmesFavoritos {
  private favoritosSubject = new BehaviorSubject<IFavoritosFilmes>({
    favoritosIds: [],
  });

  favoritosAtualizados$ = this.favoritosSubject.asObservable();

  public carregarFavoritos(): IFavoritosFilmes {
    const favoritosJSON = localStorage.getItem('favoritos');
    if (favoritosJSON) {
      return JSON.parse(favoritosJSON);
    } else {
      return {
        favoritosIds: [],
      };
    }
  }

  public salvarFavoritos(favoritos: IFavoritosFilmes) {
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
    this.favoritosSubject.next({ favoritosIds: favoritos.favoritosIds });
  }
}
