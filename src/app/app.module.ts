import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { CfHeaderComponent } from './cf-header/cf-header.component';
import { CfTransactionTableComponent } from './cf-transaction-table/cf-transaction-table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CfDespesaModalComponent } from './cf-despesa-modal/cf-despesa-modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { InputMaskModule } from '@ngneat/input-mask';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { CfAlertaComponent } from './cf-despesa-modal/cf-alerta/cf-alerta.component';
import { AlertModule } from 'ngx-bootstrap/alert';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CfImportarModalComponent } from './cf-importar-modal/cf-importar-modal.component';
import { GraficoCategoriaComponent } from './grafico-categoria/grafico-categoria.component';
import { GraficoTransacaoAnoComponent } from './grafico-transacao-ano/grafico-transacao-ano.component';
import { CfStatusRateioComponent } from './cf-status-rateio/cf-status-rateio.component';
import { CfRateioModalComponent } from './cf-rateio-modal/cf-rateio-modal.component';
import { CfPreferenciasModalComponent } from './cf-preferencias-modal/cf-preferencias-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    CfHeaderComponent,
    CfTransactionTableComponent,
    CfDespesaModalComponent,
    CfAlertaComponent,
    CfImportarModalComponent,
    GraficoCategoriaComponent,
    GraficoTransacaoAnoComponent,
    CfStatusRateioComponent,
    CfRateioModalComponent,
    CfPreferenciasModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    FormsModule,
    PaginationModule.forRoot(),
    InputMaskModule.forRoot({ inputSelector: 'input', isAsync: true }),
    AlertModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
