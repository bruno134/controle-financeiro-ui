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



}
