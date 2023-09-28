export class FilmeLista {
  constructor(
    public id: string,
    public titulo: string,
    public descricao: string,
    public cartaz: string,
    public banner: string,
    public pageTotal?: number
  ) {
    this.id = id;
    this.titulo = titulo;
    this.descricao = descricao;
    this.cartaz = cartaz;
    this.banner = banner;
    this.pageTotal = pageTotal;
  }
}
