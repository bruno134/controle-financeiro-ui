import { DespesaPessoa } from "./despesaPessoa";

export interface ListaDespesaPessoa{
    itens:DespesaPessoa[];
    descricaoDespesaCompartilhada:string;
    valorTotalDespesaCompartilhada:string;
}