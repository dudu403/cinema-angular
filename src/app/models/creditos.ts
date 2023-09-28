export class FilmeCreditos {
  elenco: {
    ordem: number;
    departamento: string;
    nome: string;
    personagem: string;
    imagem: string;
  }[] = [];

  equipe: {
    setor: string;
    nome: string;
    imagem: string;
  }[] = [];

  adicionarElenco(obj: any) {
    const creditosElenco = {
      ordem: obj.order,
      departamento: obj.known_for_department,
      nome: obj.name,
      personagem: obj.character,
      imagem: obj.profile_path,
    };
    this.elenco.push(creditosElenco);
  }

  adicionarEquipe(obj: any) {
    const creditosEquipe = {
      setor: obj.job,
      nome: obj.name,
      imagem: obj.profile_path,
    };
    this.equipe.push(creditosEquipe);
  }
}
