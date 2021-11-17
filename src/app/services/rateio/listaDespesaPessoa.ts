import { DespesaPessoa } from "./DespesaPessoa";

export interface ListaDespesaPessoa{
    itens:DespesaPessoa[];
    descricaoDespesaCompartilhada:string;
    valorTotalDespesaCompartilhada:string;
}