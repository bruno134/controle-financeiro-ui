import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
// import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'cf-header',
  templateUrl: './cf-header.component.html',
  styleUrls: ['./cf-header.component.css']
})
export class CfHeaderComponent implements OnInit {

  // public modalRef: BsModalRef | undefined; // {1}
  @ViewChild('template', { static: true }) meuModal!: TemplateRef<any>;

  constructor() { }

  ngOnInit(): void {
  }

}
