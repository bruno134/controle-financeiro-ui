import { Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Categoria } from '../services/categoria/categoria';
import { CategoriaService } from '../services/categoria/categoria.service';
import { DespesasService } from '../services/despesa/despesas.service';
import { Despesa } from '../services/despesa/despesa';
import { Origem } from '../services/origem/origem';
import { OrigemService } from '../services/origem/origem.service';
import { RateioDespesaService } from '../services/rateio/rateio-despesa.service'
import { RateioDespesa } from '../services/rateio/despesaRateio';
import { createMask } from '@ngneat/input-mask';
import { Error } from 'src/app/error'

@Component({
  selector: 'cf-despesa-modal',
  templateUrl: './cf-despesa-modal.component.html',
  styleUrls: ['./cf-despesa-modal.component.css']
})
export class CfDespesaModalComponent implements OnInit {
  @Output() saveEvent = new EventEmitter();
  @ViewChild('template', { static: true }) meuModal!: TemplateRef<any>;

  bsModalRef?: BsModalRef;
  title:string = "";
  listaDeCategoria: Categoria[] = [];
  listaDeOrigens: Origem[] = [];
  listaDeRateios: RateioDespesa[] = [];
  messagesModal:string[] = [];
  alertType:string = "info";

  /* variaveis formulario */
  dataDespesa?: Date;
  valorDespesa?: string;
  descricaoDespesa?: string;
  categoriaDespesa?: string;
  tipoRateioDespesa?: string;
  origemDespesa?: string;

  /**  Declaraçao das mascaras */

   currencyInputMask = createMask({
    alias: 'numeric',
    digits: 2,
    digitsOptional: false,
    placeholder: '0',
  });



  constructor(private modalService: BsModalService, 
              private categoriaService: CategoriaService,
              private origemService: OrigemService,
              private rateioDespesaService: RateioDespesaService,
              private despesaService: DespesasService) {

              this.dataDespesa = new Date();
               }

  ngOnInit(): void {
    this.title = "Nova despesa"
    this.carregaComboCategoria();
    this.carregaComboOrigem();
    this.carregaComboRateio();
    
  }

  openModalWithComponent() {
    this.bsModalRef = this.modalService.show(this.meuModal,{class: 'modal-lg'});
  }

  carregaComboCategoria(){
    this.categoriaService.buscaListaCategoria().subscribe( categorias => {
      this.listaDeCategoria = categorias;
    })
  }

  carregaComboOrigem(){
    this.origemService.buscaListaOrigem().subscribe( origens => {
      this.listaDeOrigens = origens;
    })
  }

  carregaComboRateio(){
    this.rateioDespesaService.buscaListaRateio().subscribe(rateios =>{
      this.listaDeRateios = rateios;
      this.tipoRateioDespesa = this.listaDeRateios[0].nome
    })
    
  }

  inserirNovaDespesa(){

    const novaDespesa = <Despesa>({
      id: 0,
      data: this.dataDespesa?.toLocaleDateString("pt-BR"),
      valor: this.valorDespesa,
      descricao: this.descricaoDespesa,
      categoria: this.categoriaDespesa,
      tipoRateio: this.tipoRateioDespesa,
      instrumento: this.origemDespesa
    });

    console.log(novaDespesa);

     this.despesaService.incluir(novaDespesa).subscribe(retorno => {
       console.log(retorno)
       this.bsModalRef?.hide();
       this.saveEvent.emit(true);
       
      },
      erro => {
        this.alertType = this.defineAlertStyleBy(erro.status);
        this.messagesModal = this.setMessagesOfErrors(erro.error.errors);
      });
  }

  defineAlertStyleBy(httpCode:number){
      if(httpCode>=500)
        return "danger"
      else if (httpCode>=400)
        return "warning"
      else if (httpCode>=300)  
        return "info"
      else if (httpCode>=200)
        return "success"
      else return "info";
  }

  setMessagesOfErrors(errors:Error[]){

      var errorMessages:string[] = [];
      errors.forEach(erro => errorMessages.push(`${erro.message}[ ${erro.attemptedValue} ]`));
    
      return errorMessages;
  }

}
