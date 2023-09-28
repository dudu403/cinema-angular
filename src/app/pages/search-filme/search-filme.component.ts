import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FilmeLista } from 'src/app/models/filme-lista';

@Component({
  selector: 'app-search-filme',
  templateUrl: './search-filme.component.html',
  styleUrls: ['./search-filme.component.css'],
})
export class SearchFilmeComponent implements OnInit {
  filmes: FilmeLista[] = [];
  query: string = '';

  constructor(private route: ActivatedRoute) {}

  procurarFilme() {
    this.route.queryParams.subscribe((params) => {
      this.query = params['query'] || '';
    });
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params: ParamMap) => {
      const query = params.get('query');
      if (query !== null) {
        this.query = query;
        this.procurarFilme();
      }
    });
  }
}
