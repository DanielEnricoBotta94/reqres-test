import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, Observable, switchMap } from 'rxjs';
import { User, UserGet } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  id: number;
  user: User = new User();

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) { 
   
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params => {
        this.id = +params.get('id');
        if(Number.isNaN(this.id) || this.id < 0){
          console.error("Not a valid id!")
          this.router.navigate(['home']);
          return;
        }
        this.getDetails();
    });
  }

  async getDetails(){
    const userGet$ = this.userService.get(this.id);
    await firstValueFrom(userGet$)
      .then(response => {
        this.user = response.data;
      })
      .catch(error => {
        console.error(error);
      });
  }

}
