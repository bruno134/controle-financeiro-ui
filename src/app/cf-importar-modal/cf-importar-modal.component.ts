import { Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Categoria } from '../services/categoria/categoria';
import { CategoriaService } from '../services/categoria/categoria.service';
import { Despesa } from '../services/despesa/despesa';
import { DespesasService } from '../services/despesa/despesas.service';
import { Origem } from '../services/origem/origem';
import { OrigemService } from '../services/origem/origem.service';
import { RateioDespesaService } from '../services/rateio/rateio-despesa.service';
import { RateioDespesa } from '../services/rateio/despesaRateio';
import Swal from 'sweetalert2';
import { DateUtilsService } from '../services/dates/dateUtils.service';


@Component({
  selector: 'cf-importar-modal',
  templateUrl: './cf-importar-modal.component.html',
  styleUrls: ['./cf-importar-modal.component.css']
})
export class CfImportarModalComponent implements OnInit {
  
  @ViewChild('importModal', { static: true }) meuModal!: TemplateRef<any>;
  @Output() importEvent = new EventEmitter();

  fileForm: FormGroup;
  importForm: FormGroup;
  
  title:string = "Importar despesas"
  messagesModal:string[] = [];
  alertType:string = "warning"
  bsModalRef?: BsModalRef;
  listaDespesaImportar:Despesa[] = [];
  listaCategorias:Categoria[] = [];
  listaRateio:RateioDespesa[] = [];
  listaOrigem:Origem[] = [];
  listaMeses:any[] = [];
  listaAnos:number[] = [];
  anoDespesa:number;
  mesDespesa:number;
  headers:string[] =  ["#", "Data", "Descrição", "Valor", "Categoria", "Rateio"];
  display =false;
  origemImportacao = "CARTAO CREDITO";
  
  constructor(private modalService: BsModalService,
              private fb: FormBuilder,
              private despesaService:DespesasService,
              private categoriaService: CategoriaService,
              private tipoRateioService:RateioDespesaService,
              private origemService:OrigemService,
              private dateService: DateUtilsService) { 
              
              this.fileForm = this.fb.group({
                file: [null],
              });

              this.importForm = this.fb.group({
                despesaArray:this.fb.array([])
              });

              let today = new Date();
              this.anoDespesa = today.getFullYear();
              this.mesDespesa = today.getMonth()+1;
  }

  get despesaArray() {
    return this.importForm.controls["despesaArray"] as FormArray;
  }

  ngOnInit(): void {
    this.buscarListaCategoria();
    this.buscarListaRateio();
    this.buscaListaOrigem();
    this.listaAnos = this.dateService.getListofYears(new Date().getFullYear()-3,30);
    this.listaMeses = this.dateService.getListofMonths();
  }
  
  openModalWithComponent() {
    this.bsModalRef = this.modalService.show(this.meuModal,{class: 'modal-xl'});
    this.ngOnInit();
  }

  

  loadFile(event: any) {
    const elemento = event.target
    if (elemento) {
      const tempFile = elemento as HTMLInputElement
      if (tempFile) {
        let auxFiles = tempFile.files
        if (auxFiles) {
          const file = auxFiles[0]
          this.fileForm.patchValue({
            file: file
          });
          this.fileForm.get('file')?.updateValueAndValidity()
        }
      }
    }
  }

  importFile() {
    var formData: any = new FormData();
    let dataAtual = new Date();
    let mes:number = this.mesDespesa
    let ano: number = this.anoDespesa

     formData.append("file", this.fileForm.get('file')?.value); 
     formData.append("instrumento", this.origemImportacao);
     formData.append("mes", mes);
     formData.append("ano", ano);

      this.despesaService.importarDespesa(formData).subscribe(
        data => {
           this.listaDespesaImportar = data
          this.toFormList(this.listaDespesaImportar);
        },
         (error) => console.log(error)
    )
  }

  salvar(){
    if(this.despesaArray.controls.length>0){

      let listaDespesas:Despesa[] = this.retornaDespesaParaImportar(this.despesaArray.controls);
      // console.log(listaDespesas);
      this.despesaService.incluirLote(listaDespesas).subscribe(()=>{
        this.importEvent.emit(true);
        this.closeModal()
      }, erro => this.showErrorAlert("Houve um erro inesperado na importação") )
    } else { this.showErrorAlert("não informaram despesas para importação")}
  }

  criaDespesaRow(despesa:Despesa){
    return this.fb.group({
      selecionado: [true],
      data: [despesa.data],
      descricao: [despesa.descricao],
      valor: [despesa.valor],
      categoria: ["Não categorizado"],
      instrumento: [despesa.instrumento],
      tipoRateio: [this.listaRateio[0].nome],
      dataCompetencia: [despesa.dataCompetencia],
    });
  }

  toFormList(lista:Despesa[]){
   this.despesaArray.clear();
   lista.forEach(desp =>  this.despesaArray.push(this.criaDespesaRow(desp)));
  }

  buscarListaCategoria(){
      this.categoriaService.buscaListaCategoria().subscribe(listaCategoria =>
        this.listaCategorias = listaCategoria
        ,
        erro => console.log(erro)
        );
  }

  buscarListaRateio(){
      this.tipoRateioService.buscaListaRateio().subscribe(listaRateio =>
        this.listaRateio = listaRateio,
        erro => console.log(erro)
        );
  }

  buscaListaOrigem(){
      this.origemService.buscaListaOrigem().subscribe( 
        listaOrigem => this.listaOrigem = listaOrigem,
        erro => console.log(erro)
        );
  }

  retornaDespesaParaImportar(listaDespesa:AbstractControl[]){
    let listaRetorno:Despesa[] = [];
    
    if(listaDespesa){
      listaDespesa.forEach( despesa => {
        //Só inclui as despesas marcadas como selecionada
        if(despesa.get('selecionado')?.value){
          listaRetorno.push(
            <Despesa>({
              id: 0,
              data:        despesa.get('data')?.value,
              valor:       despesa.get('valor')?.value,
              descricao:   despesa.get('descricao')?.value,
              categoria:   despesa.get('categoria')?.value,
              tipoRateio:  despesa.get('tipoRateio')?.value,
              instrumento: despesa.get('instrumento')?.value,
              dataCompetencia: despesa.get('dataCompetencia')?.value
            })
          )
        }
      })
    }
      return listaRetorno;
  }

  resetControles(){
    this.despesaArray.clear();
    this.listaDespesaImportar = [];
  }

  closeModal(){
   this.resetControles();
    this.bsModalRef?.hide()
  }

  openConfirmAlert(){
    Swal.fire({
      icon: 'question',
      title: 'Confirma a importação das despesas selecionadas?',
      showDenyButton: true,
      confirmButtonText: 'Salvar',
      denyButtonText: `Não salve`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
       this.salvar()
      } else if (result.isDenied) {
        Swal.fire('Nenhuma importação foi realizada', '', 'info')
      }
    })
  }

  showErrorAlert(message:string){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Algo deu ruim!',
      footer: message
    })
  }
}
