import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { LoginConsumerComponent } from '../consumer/components/login-consumer/login-consumer.component';
import { ConsumerStartComponent } from '../consumer/components/consumer-start/consumer-start.component';

@Component({
  selector: 'app-board-user',
  imports: [
    ConsumerStartComponent
  ],
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {
  content?: string;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUserBoard().subscribe({
      next: data => {
        this.content = data;
      },
      error: err => {
        if (err.error) {
          try {
            const res = JSON.parse(err.error);
            this.content = res.message;
          } catch {
            this.content = `Error with status: ${err.status} - ${err.statusText}`;
          }
        } else {
          this.content = `Error with status: ${err.status}`;
        }
      }
    });
  }
}