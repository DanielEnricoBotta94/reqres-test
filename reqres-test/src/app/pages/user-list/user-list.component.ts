import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: Array<User> = [];
  mode: 'table' | 'card' = 'card';
  totalPages = 0;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.listUsers();
  }

  async listUsers(page: number = 1){
    const userList$ = this.userService.list(page);
    await firstValueFrom(userList$)
      .then(response => {
        this.users = response.data;
        this.totalPages = response.total_pages;
      })
      .catch(error => {
        console.error(error);
      });
  }

  onPageChange($event: number){
    this.listUsers($event);
  }

  click(id: number){
    this.router.navigate(['/user-details', id]);
  }
}
