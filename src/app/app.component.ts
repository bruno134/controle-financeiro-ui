import { Component, ViewChild } from '@angular/core';
import { CfDespesaModalComponent } from './cf-despesa-modal/cf-despesa-modal.component';
import { CfImportarModalComponent } from './cf-importar-modal/cf-importar-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'controle-financeiro-ui';
  @ViewChild(CfDespesaModalComponent, {static: false}) despesaModal!: CfDespesaModalComponent;
  @ViewChild(CfImportarModalComponent, {static: false}) importModal!: CfImportarModalComponent;

  constructor(){}

  abrirModal(evento:string){
    switch (evento) {
      case "inserirDespesa":
          this.despesaModal.openModalWithComponent();
        break;
      case "importarDespesa":
          this.importModal.openModalWithComponent();
        break;
  }
  
}




}
