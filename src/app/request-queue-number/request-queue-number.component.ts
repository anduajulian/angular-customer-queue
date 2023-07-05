import { Component, OnInit } from '@angular/core';
import { QueueService } from 'src/app/service/queue.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-request-queue-number',
  templateUrl: './request-queue-number.component.html',
  styleUrls: ['./request-queue-number.component.css'],
})
export class RequestQueueNumberComponent implements OnInit {
  queueNumber: any;
  resQueueNumber: any;
  queueSubs?: Subscription;
  queueNewSubs?: Subscription;
  newEntry: any;

  constructor(private queueService: QueueService) {}

  ngOnInit(): void {
    this.getData();
  }

  doPrint(): void {
    window.print();
    this.newQueue();
    this.insertData();
  }

  getData(): void {
    this.queueSubs = this.queueService.getNewest().subscribe((result) => {
      if (result[0]) {
        this.resQueueNumber = result[0];
        this.queueNumber = this.resQueueNumber.queue;
      } else {
        this.newEntry = { sequence: '1', queue: 'A001' };
        this.insertData();
      }
    });
  }

  insertData(): void {
    this.queueNewSubs = this.queueService
      .insert(this.newEntry)
      .subscribe((result) => {
        this.getData();
        console.log(result);
      });
  }

  newQueue(): void {
    const tmpSeq = parseInt(this.resQueueNumber.sequence) + 1;
    this.newEntry = { sequence: tmpSeq.toString() };
    const tempQueue = this.resQueueNumber.queue.split('').splice(1).join('');
    const newQueue = (parseInt(tempQueue) + 1).toString();
    if (newQueue.split('').length === 1) {
      this.newEntry.queue = `A00${newQueue}`;
    }
    if (newQueue.split('').length === 2) {
      this.newEntry.queue = `A0${newQueue}`;
    }
    if (newQueue.split('').length === 3) {
      this.newEntry.queue = `A${newQueue}`;
    }
  }

  ngOnDestroy(): void {
    this.queueSubs?.unsubscribe();
    this.queueNewSubs?.unsubscribe();
  }
}
