import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class DateUtilsService {

  constructor() {}

isLeapYear(year:number) { 
    return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)); 
};

getDaysInMonth(year:number, month:number) {
    return [31, (this.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
};

addMonths(date:Date,value:number) {

    let summedDate = date;
    var n = summedDate.getDate();
    summedDate.setDate(1);
    summedDate.setMonth(summedDate.getMonth() + value);
    summedDate.setDate(Math.min(n, this.getDaysInMonth(summedDate.getFullYear(),summedDate.getMonth())));
    return summedDate;
};

getListofYears(baseYear:number, quantidadeAnos:number){
  let listYears:number[] = [];
  let offsetYear = baseYear;
  
  if(!offsetYear) offsetYear = (new Date().getFullYear()-2);

  for (let index = baseYear; index <= (baseYear+quantidadeAnos); index++) {
    listYears.push(index);
  }
  return listYears;
}

getListofMonths(){
  let today = new Date();
  let months:any[] = []

  for (let index = 0; index < 12; index++) {
    let newDate = new Date(today.getFullYear(),index,1);
    months.push({
      nomeMes:newDate.toLocaleString('pt-BR', { month: 'long' }),
      intMes:(index+1)
    });
  }
  return months;
}


}
