import { Component, Input, OnInit } from '@angular/core';
import { VisitorService } from 'src/app/service/visitor.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-input-visitor-details',
  templateUrl: './input-visitor-details.component.html',
  styleUrls: ['./input-visitor-details.component.css']
})
export class InputVisitorDetailsComponent implements OnInit {
  @Input() visitor:any;
  visitorSubs?: Subscription;

  constructor(private visitorService : VisitorService, private router: Router) {
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

  insertData(): void {
    this.visitorSubs = this.visitorService
      .insert(this.visitor)
      .subscribe((result) => {
        if(result){
          this.router.navigateByUrl('/')
        }
      });
  }

  clickBtn(){
    this.insertData()
  }

  ngOnDestroy(): void {
    this.visitorSubs?.unsubscribe();
  }

}
