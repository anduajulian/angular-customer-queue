import { Component, OnInit } from '@angular/core';
import { VisitorService } from 'src/app/service/visitor.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-visitor-list',
  templateUrl: './visitor-list.component.html',
  styleUrls: ['./visitor-list.component.css'],
})
export class VisitorListComponent implements OnInit {
  allData: any;

  visitorSubs?: Subscription;

  constructor(private router: Router, private visitorService: VisitorService) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.visitorSubs = this.visitorService.getAll().subscribe((result) => {
      this.allData = result;
    });
  }

  ngOnDestroy(): void {
    this.visitorSubs?.unsubscribe();
  }
}
