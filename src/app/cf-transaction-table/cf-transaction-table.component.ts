import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DespesasService } from '../services/despesa/despesas.service';
import { Despesa } from '../services/despesa/despesa';
import Swal from 'sweetalert2';
import { CategoriaService } from '../services/categoria/categoria.service';
import { OrigemService } from '../services/origem/origem.service';
import { RateioDespesaService } from '../services/rateio/rateio-despesa.service';
import { Categoria } from '../services/categoria/categoria';
import { Origem } from '../services/origem/origem';
import { RateioDespesa } from '../services/rateio/despesaRateio';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'cf-transaction-table',
  templateUrl: './cf-transaction-table.component.html',
  styleUrls: ['./cf-transaction-table.component.css']
})
export class CfTransactionTableComponent implements OnInit {
@Input() listaDespesa:Despesa[] = [];
@Input() headers:string[] =  ["#", "Data", "Descrição", "Valor", "Categoria", "Origem Despesa", "Rateio"];
@Output() deleteEvent = new EventEmitter();

/* váriaveis */
paginaAnterior:number = 0;
proximaPagina:number = 0;
paginaAtual:number = 0;
totalDePaginas:number = 0;
tamanhoPagina:number = 0;
currentPage:number = 0;
dataInicio:Date;
dataFim:Date;
totalDespesaFiltro:number=0;
filtrosSelecionados: Map<string,string> = new Map<string,string>();
descricaoControl = new FormControl();

//listas
listaCategorias:Categoria[] = [];
listaOrigem: Origem[] = [];
listaRateio: RateioDespesa[] = [];
listaDespesaOriginal:Despesa[] = [];


  constructor(private despesaService:DespesasService,
              private categoriaService: CategoriaService,
              private origemService: OrigemService,
              private rateioSerice: RateioDespesaService) { 
    let dataAtual = new Date();
    this.dataInicio = dataAtual;
    this.dataFim = new Date(dataAtual.getFullYear(),(dataAtual.getMonth()+1),dataAtual.getDay());
  }

  ngOnInit(): void {
    this.carregaCombos();
  }

  mudaTamanhoPagina(vl:string){
    this.tamanhoPagina = vl as unknown as number
    this.buscaListaDespesa(this.dataInicio,this.dataFim, 1,this.tamanhoPagina,this.filtrosSelecionados);
  }

  filtrarPorTexto(query:string){
    let novaLista:Despesa[] = []
    query = query.toLowerCase();
    this.listaDespesa = this.listaDespesaOriginal

    if(query!=""){
     novaLista = this.listaDespesa.filter(despesa => 
        despesa.descricao.toLowerCase().includes(query)
      )
      this.listaDespesa = novaLista
      this.totalDespesaFiltro = this.somaDespesas(this.listaDespesa)
    }
    else{
      this.totalDespesaFiltro = this.somaDespesas(this.listaDespesa)
    }
  }

  filtraPor(chave:string,valor:string){

    if(this.filtrosSelecionados.has(chave)){
      if(this.filtrosSelecionados.delete(chave)){
          if(valor!="TODOS")
            this.filtrosSelecionados.set(chave,valor);
      }else{
        console.error("erro ao deletar chave " + chave);
      }
    }else{
      this.filtrosSelecionados.set(chave,valor)
    }

    this.buscaListaDespesa(this.dataInicio,this.dataFim, 1,this.tamanhoPagina,this.filtrosSelecionados);
  }
  
  mapPrint(map:Map<string,string>){
    map.forEach((v,k)=> console.log("chave: " + k + " valor " + v))
    
  }


  buscaListaDespesa(dataInicial:Date,dataFinal:Date,pagina: number, 
                    tamanhoPagina:number,filtros?:Map<string,string>) {
    
    let mes = dataFinal.getMonth()+1;
    let ano = dataFinal.getFullYear();

    if (pagina) {
      this.listaDespesa = []
      if (pagina==0) pagina = 1
      this.despesaService.consultaListaDespesa(mes, ano, pagina,tamanhoPagina,filtros).subscribe(service => {
        this.listaDespesa = service.despesas;
        this.listaDespesaOriginal = this.listaDespesa;
        this.proximaPagina = service.proximaPagina;
        this.paginaAnterior = service.paginaAnterior != null ? service.paginaAnterior : 0;
        this.paginaAtual = this.paginaAnterior + 1;
        this.totalDePaginas = service.totalPaginas;
        this.dataInicio = dataInicial
        this.dataFim = dataFinal
        this.totalDespesaFiltro = this.somaDespesas(this.listaDespesa)
      });
    }
  }

  buscaProximaPagina(pagina:number){
    this.buscaListaDespesa(this.dataInicio, this.dataFim, pagina, this.tamanhoPagina, this.filtrosSelecionados)
  }

  buscaPaginaAnterior(pagina:number){
    this.buscaListaDespesa(this.dataInicio, this.dataFim, pagina, this.tamanhoPagina,this.filtrosSelecionados)
  }

  apagarDespesa(id:number){
    
    this.despesaService.apagaDespesa(id).subscribe(
      () => {
        this.deleteEvent.emit(true);
      },
      erro => console.error(erro)
    )
  }

  somaDespesas(despesas:Despesa[]){
    let totalDespesa = 0;
    var valorDespesa = 0;
    
    despesas.forEach(d=> {
      valorDespesa = 0;
      if(!isNaN(Number(d.valor))){
        valorDespesa = Number(d.valor);
      } else{
        console.error('Not a Number: ' + d.valor);
      }
        totalDespesa += valorDespesa;
      }
    )
    return totalDespesa;
  }

  mostrarAlertaDelecao(id:number){
    Swal.fire({
      icon: 'question',
      title: 'Deseja apagar despesa?',
      showDenyButton: true,
      confirmButtonText: 'Apagar',
      denyButtonText: `Mudei de ideia`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.apagarDespesa(id);
        Swal.fire('Apagado!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Ação cancelada', '', 'info')
      }
    })
   
  }

  carregaCombos(){
          this.categoriaService.buscaListaCategoria().subscribe(
            categorias => this.listaCategorias = categorias,
            erro => console.log(erro)
          );

          this.origemService.buscaListaOrigem().subscribe(
            origens => this.listaOrigem = origens,
            erro => console.log(erro)
          )


          this.rateioSerice.buscaListaRateio().subscribe(
            rateios => this.listaRateio = rateios,
            erro => console.log(erro)
          )
  }
}