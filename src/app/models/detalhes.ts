import { FilmeCreditos } from './creditos';

export class FilmeDetalhes {
  constructor(
    public id: string,
    public titulo: string,
    public cartaz: string,
    public descricao: string,
    public favoritado: number,
    public generos: string[],
    public banner: string,
    public video: string,
    public credito: FilmeCreditos  
  ) {}
}
