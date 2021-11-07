import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { CfHeaderComponent } from './cf-header/cf-header.component';
import { CfTransactionTableComponent } from './cf-transaction-table/cf-transaction-table.component';

@NgModule({
  declarations: [
    AppComponent,
    CfHeaderComponent,
    CfTransactionTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
