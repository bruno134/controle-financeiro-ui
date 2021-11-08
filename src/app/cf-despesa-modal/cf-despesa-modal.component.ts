import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';

@Component({
  selector: 'cf-despesa-modal',
  templateUrl: './cf-despesa-modal.component.html',
  styleUrls: ['./cf-despesa-modal.component.css']
})
export class CfDespesaModalComponent implements OnInit {

  bsModalRef?: BsModalRef;
  @ViewChild('template', { static: true }) meuModal!: TemplateRef<any>;
  title:string = "";

  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
    this.title = "Nova despesa"
  }

  openModalWithComponent() {
    this.bsModalRef = this.modalService.show(this.meuModal,{class: 'modal-xl'});
    this.bsModalRef.content.closeBtnName = 'Close';
  }

}
