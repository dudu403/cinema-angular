import { environment } from 'src/environments/environment';
import { FilmeCreditos } from '../models/creditos';
import { FilmeDetalhes } from '../models/detalhes';
import { IFavoritosFilmes } from '../models/filme-favoritos';
import { HttpClient } from '@angular/common/http';
import { FilmeLista } from '../models/filme-lista';
import { TipoLista } from '../models/tipo-lista';
import { RepositorioFilmesFavoritos } from './local-storage.service';
import { Observable, forkJoin, map, mergeMap, of, switchMap } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FilmeService {
  private urlPrincipal: string = 'https://api.themoviedb.org/3';

  private _options = {
    headers: {
      accept: 'application/json',
      Authorization: environment.API_KEY,
    },
  };

  private favoritos: IFavoritosFilmes;

  constructor(
    private http: HttpClient,
    private repositorioFavoritos: RepositorioFilmesFavoritos
  ) {
    this.favoritos = this.repositorioFavoritos.carregarFavoritos();
  }

  public obterListaFilmes(
    tipo: TipoLista,
    page: number,
    query: string
  ): Observable<{ filmes: FilmeLista[]; totalPages: number }> {
    let url = '';

    switch (tipo) {
      case 'Searcher':
        return this.obterListaFilmesSearch(query, page);
      case 'Favoritos':
        return this.obterFilmesFavoritos(this.favoritos.favoritosIds, page);
      case 'BemAvaliado':
        url = `${this.urlPrincipal}/movie/top_rated?language=pt-BR&page=${page}`;
        break;
      case 'EmAlta':
        url = `${this.urlPrincipal}/movie/popular?language=pt-BR&page=${page}`;
        break;
      case 'Lancamentos':
        url = `${this.urlPrincipal}/movie/now_playing?language=pt-BR&page=${page}`;
        break;
      case 'EmBreve':
        url = `${this.urlPrincipal}/movie/upcoming?language=pt-BR&page=${page}`;
        break;
    }

    return this.http.get<any[]>(url, this._options).pipe(
      mergeMap((archive: any) => {
        const totalPages = archive.total_pages;
        const filmes = archive.results.map((obj: any) => {
          return this.mapearFilmeListagem(obj);
        });
        return of({ filmes, totalPages });
      })
    );
  }

  obterListaFilmesSearch(
    query: string,
    page: number
  ): Observable<{ filmes: FilmeLista[]; totalPages: number }> {
    const url = `https://api.themoviedb.org/3/search/movie?language=pt-BR&query=${query}&page=${page}`;
    return this.http.get<any[]>(url, this._options).pipe(
      mergeMap((archive: any) => {
        const totalPages = archive.total_pages;
        const filmes = archive.results.map((obj: any) => {
          return this.mapearFilmeListagem(obj);
        });
        return of({ filmes, totalPages });
      })
    );
  }

  public obterFilmesFavoritos(
    ids: number[],
    page: number
  ): Observable<{ filmes: FilmeLista[]; totalPages: number }> {
    this.favoritos = this.repositorioFavoritos.carregarFavoritos();

    const startIndex = (page - 1) * 20;
    const endIndex = startIndex + 20;

    const filmesIds = ids.slice(startIndex, endIndex);

    const filmesFavoritos = filmesIds.map((id) => {
      const url = `${this.urlPrincipal}/movie/${id}?language=pt-BR`;
      return this.http
        .get<any>(url, this._options)
        .pipe(map((obj) => this.mapearFilmeListagem(obj)));
    });

    return forkJoin(filmesFavoritos).pipe(
      map((filmes: FilmeLista[]) => {
        const totalPages: number = Math.ceil(ids.length / 20);
        return { filmes, totalPages };
      })
    );
  }

  public obterDetalhesFilmePorId(id: number): Observable<FilmeDetalhes> {
    const url = `${this.urlPrincipal}/movie/${id}?language=pt-BR`;

    return this.http
      .get<any>(url, this._options)
      .pipe(
        map((archive: any) => {
          return this.mapearFilmeDetalhes(archive);
        })
      )
      .pipe(
        switchMap((archive: FilmeDetalhes) => {
          return this.obterUrlVideo(archive.id).pipe(
            map((videoUrl: string) => {
              archive.video = videoUrl;
              return archive;
            })
          );
        })
      );
  }

  public obterUrlVideo(id: string): Observable<string> {
    const url = `${this.urlPrincipal}/movie/${id}/videos?language=pt-BR`;

    return this.http.get<any>(url, this._options).pipe(
      map((archive: any) => {
        return this.mapearUrlVideo(archive.results);
      })
    );
  }

  public obterCreditos(id: string): Observable<FilmeCreditos> {
    const url = `${this.urlPrincipal}/movie/${id}/credits?language=pt-BR`;

    return this.http.get<any>(url, this._options).pipe(
      map((archive: any) => {
        return this.mapearCreditos(archive);
      })
    );
  }

  private mapearFilmeListagem(obj: any): FilmeLista {
    return {
      id: obj.id,
      titulo: obj.title,
      descricao: obj.overview,
      cartaz: obj.poster_path,
      banner: obj.backdrop_path,
    };
  }

  private mapearCreditos(obj: any): FilmeCreditos {
    const creditos = new FilmeCreditos();

    const elencoPrincipal = obj.cast.filter((item: any) => item.order < 11);

    const diretor = obj.crew.filter(
      (item: any) =>
        item.job === 'Director' ||
        item.job === 'Writer' ||
        item.job === 'Producer'
    );

    elencoPrincipal.map((item: any) => this.organizarCreditos(item, creditos));

    diretor.map((item: any) => this.organizarCreditos(item, creditos));

    return creditos;
  }

  private organizarCreditos(obj: any, creditos: FilmeCreditos) {
    if (obj.job) {
      creditos.adicionarEquipe(obj);
    } else {
      creditos.adicionarElenco(obj);
    }
  }

  private mapearUrlVideo(obj: any[]): string {
    const trailerDub = obj.find(
      (video) =>
        video.type === 'Trailer' &&
        (video.name.includes('Dub') || video.name.includes('DUB'))
    );
    const trailerLeg = obj.find(
      (video) =>
        video.type === 'Trailer' &&
        (video.name.includes('Leg') || video.name.includes('LEG'))
    );
    const primeiroTrailer = obj.find((video) => video.type === 'Trailer');
    const primeiroTeaser = obj.find((video) => video.type === 'Teaser');

    const videoKey =
      trailerDub?.key ||
      trailerLeg?.key ||
      primeiroTrailer?.key ||
      primeiroTeaser?.key;

    return videoKey ? `https://www.youtube.com/embed/${videoKey}` : '';
  }

  private mapearFilmeDetalhes(obj: any): FilmeDetalhes {
    return {
      id: obj.id,
      titulo: obj.title,
      cartaz: obj.poster_path,
      descricao: obj.overview,
      favoritado: obj.vote_count,
      generos: obj.genres.map((genero: any) => genero.name),
      banner: obj.backdrop_path,
      credito: obj.credito,
      video: '',
    };
  }
}
