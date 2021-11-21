import { Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { RateioDespesaService } from '../services/rateio/rateio-despesa.service';
import { createMask } from '@ngneat/input-mask';
import { DespesaPessoa } from '../services/rateio/despesaPessoa';
import { RateioDespesaDTO } from '../services/rateio/rateioDespesaDTO';
import Swal from 'sweetalert2';

@Component({
  selector: 'cf-rateio-modal',
  templateUrl: './cf-rateio-modal.component.html',
  styleUrls: ['./cf-rateio-modal.component.css']
})
export class CfRateioModalComponent implements OnInit {

@ViewChild('rateioModal', { static: true }) rateioModal!: TemplateRef<any>;
@Output() saveRateioEvent = new EventEmitter();

bsModalRef?: BsModalRef;
valorRateio:number = 0;
valorSalario:number = 0;
despesaPessoa?:DespesaPessoa;

/**  Declaraçao das mascaras */

currencyInputMask = createMask({
  alias: 'numeric',
  digits: 2,
  digitsOptional: false
});

ratioInputMask = createMask({
  alias: 'numeric',
  digits: 3,
  digitsOptional: false
});

  constructor(private modalService: BsModalService,
              private rateioService:RateioDespesaService) { }

  ngOnInit(): void {
  }

  openModalWithComponent(despesaPessoa:DespesaPessoa){
    this.despesaPessoa = despesaPessoa;
    this.valorRateio = despesaPessoa.valorTaxa*100
    this.valorSalario = despesaPessoa.valorSalario
    this.bsModalRef = this.modalService.show(this.rateioModal,{class: 'modal-sm'});
  }

  closeModal(){
    this.bsModalRef?.hide();
  }

  alterarRateio(){

    let dataAtual = new Date();

    let rateio = <RateioDespesaDTO> ({
      mesCompetenciaRateio: dataAtual.getMonth()+1,
      anoCompetenciaRateio: dataAtual.getFullYear(),
      valorRateio: this.valorRateio/100,
      valorSalario: this.valorSalario,
      nomePessoaRateio: this.despesaPessoa?.nomeDono
    })

    this.rateioService.alteraValorRateio(rateio).subscribe(
      () => {
        this.saveRateioEvent.emit(true)
        this.openSuccessAlert()
        this.closeModal()
      },
      erro => console.log(erro));
  }

  openSuccessAlert(){
    Swal.fire({
      icon: 'success',
      title: 'Alteração realizada com sucesso'
    })
  }

}
