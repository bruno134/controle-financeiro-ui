import { ReturnStatement } from '@angular/compiler';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Categoria } from '../services/categoria/categoria';
import { CategoriaService } from '../services/categoria/categoria.service';
import { Origem } from '../services/origem/origem';
import { OrigemService } from '../services/origem/origem.service';

@Component({
  selector: 'cf-preferencias-modal',
  templateUrl: './cf-preferencias-modal.component.html',
  styleUrls: ['./cf-preferencias-modal.component.css']
})
export class CfPreferenciasModalComponent implements OnInit {

  @ViewChild('preferenciaModal', { static: true }) prefModal!: TemplateRef<any>;

  bsModalRef?: BsModalRef;
  title = "Preferências";
  headers: string[] = ["#", "Descrição", "Tipo", "ativo"];
  listaItens: any[] = [];
  identificador: string = "";
  nome: string = "";
  tipo: string = "Despesa";
  isCategoria: boolean = false;


  constructor(private modalService: BsModalService,
    private categoriaService: CategoriaService,
    private origemService: OrigemService,) { }

  ngOnInit(): void {

  }

  openModalWithComponent(identificador: string) {
    this.identificador = identificador;
    this.customIniciaComponente();
    this.bsModalRef = this.modalService.show(this.prefModal, { class: 'modal-lg' });
    this.isCategoria = this.identificador === "categoria" ? true : false;
  }
  closeModal() {
    this.bsModalRef?.hide();
  }

  defineHeaders(identificador: string) {

    switch (identificador) {
      case "categoria":
        return ["#", "Descrição", "Tipo"];
      case "formaPagto":
        return ["#", "Descrição"];
      default:
        return [""]
    }
  }

  customIniciaComponente() {
    this.headers = this.defineHeaders(this.identificador);
    this.buscaPreferencias(this.identificador);

  }

  buscaPreferencias(identificador: string) {

    switch (identificador) {
      case "categoria":
        this.categoriaService.buscaListaCategoria().subscribe(
          categorias => {
            this.listaItens = categorias;
          },
          erro => console.log(erro)
        );
        break;
      case "formaPagto":
        this.origemService.buscaListaOrigem().subscribe(
          formaPagtos => {
            this.listaItens = formaPagtos
          },
          erro =>
            console.log(erro)
        );
        break;
      default:
        alert('deu ruim');
    }

  }

  salvar() {

    switch (this.identificador) {
      case "categoria":
        this.salvaCategoria()
        break;
      case "formaPagto":
        this.salvaFormaPagto();
        break;
    }
  }

  salvaCategoria() {

    let novaCategoria = <Categoria>{
      nome: this.nome,
      tipoCategoria: this.tipo
    }

    console.log(novaCategoria);
    this.categoriaService.salvarCategoria(novaCategoria).subscribe(
      () => {
        console.log("ok")
        this.customIniciaComponente();
      },
      error => console.log(error)
    )
  }

  salvaFormaPagto() {
    let novaFormaPagto = <Origem>{
      nome: this.nome
    }

    console.log(novaFormaPagto);
    this.origemService.salvaOrigem(novaFormaPagto).subscribe(
      () => {
        console.log("ok")
        this.customIniciaComponente();
      },
      error => console.log(error)
    )
  }

}
