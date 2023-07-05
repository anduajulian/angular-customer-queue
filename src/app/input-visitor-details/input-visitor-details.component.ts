import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-visitor-details',
  templateUrl: './input-visitor-details.component.html',
  styleUrls: ['./input-visitor-details.component.css']
})
export class InputVisitorDetailsComponent implements OnInit {
  @Input() visitor:any;

  constructor() {
    this.visitor = {
    name:"",
    email:"",
    gender:"",
    address:"",
    nohp:"",
    queue:""
  }
}

  ngOnInit(): void {
  }

  clickBtn(){
    return console.log("WAKWAW");
  }

}
