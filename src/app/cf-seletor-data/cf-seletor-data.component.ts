import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DateUtilsService } from '../services/dates/dateUtils.service';

@Component({
  selector: 'cf-seletor-data',
  templateUrl: './cf-seletor-data.component.html',
  styleUrls: ['./cf-seletor-data.component.css']
})
export class CfSeletorDataComponent implements OnInit {

  @Output() selectedDates = new EventEmitter()

  datesRange:Date[] = [];
  change:boolean = false;
  bsRangeValue:Date[] = [];

  constructor(private dateService:DateUtilsService) {   
   }

  ngOnInit(): void {
    let today = new Date();
    this.datesRange[0] = new Date(today.getFullYear(), (today.getMonth()-1), 28);
    this.datesRange[1]  = today;
  }

  nextMonth(){

    this.datesRange[0] = this.dateService.addMonths(this.datesRange[0],1);
    this.datesRange[1] = this.dateService.addMonths(this.datesRange[1],1);
    this.datesRange = [this.datesRange[0],this.datesRange[1]]
    this.disparaEventoConsulta()
  }

  previousMonth(){
    this.datesRange[0] = this.dateService.addMonths(this.datesRange[0],-1);
    this.datesRange[1] = this.dateService.addMonths(this.datesRange[1],-1);
    this.datesRange = [this.datesRange[0],this.datesRange[1]]
    this.disparaEventoConsulta()
  }

  disparaEventoConsulta(){
    this.selectedDates.emit(this.datesRange);
  }

}

