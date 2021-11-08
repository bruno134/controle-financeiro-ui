import { Component, OnInit, Output, EventEmitter} from '@angular/core';
@Component({
  selector: 'cf-header',
  templateUrl: './cf-header.component.html',
  styleUrls: ['./cf-header.component.css']
})
export class CfHeaderComponent implements OnInit {
  @Output() myEvent = new EventEmitter();

  constructor() { }
  ngOnInit(): void {
  }

  chamaModal(){
    this.myEvent.emit(true);
  }
}
