import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


import { CfHeaderComponent } from './cf-header/cf-header.component';
import { CfTransactionTableComponent } from './cf-transaction-table/cf-transaction-table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CfDespesaModalComponent } from './cf-despesa-modal/cf-despesa-modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { InputMaskModule } from '@ngneat/input-mask';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@NgModule({
  declarations: [
    AppComponent,
    CfHeaderComponent,
    CfTransactionTableComponent,
    CfDespesaModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    FormsModule,
    PaginationModule.forRoot(),
    InputMaskModule.forRoot({ inputSelector: 'input', isAsync: true })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
