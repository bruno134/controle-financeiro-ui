import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'cf-alerta-modal',
  templateUrl: './cf-alerta.component.html',
  styleUrls: ['./cf-alerta.component.css']
})
export class CfAlertaComponent implements OnInit {

  @Input() message  = [""];
  @Input() inputType!: string; 
  
  constructor() { }

  ngOnInit(): void {
  }
  
}
