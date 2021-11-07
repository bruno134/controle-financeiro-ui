import { Despesa } from "./despesa";

export interface ConsultaDespesa {
    paginaAnterior: number;
    proximaPagina: number;
    totalPaginas: number;
    despesas: Despesa[];
}