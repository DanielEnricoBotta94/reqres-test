import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, Observable, switchMap } from 'rxjs';
import { User, UserGet } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { EMAIL_PATTERN } from 'src/app/util/regex';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  id: number;
  user: User = new User();

  userForm: FormGroup = new FormBuilder().group({
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    email: ['', Validators.compose([
      Validators.required, 
      Validators.pattern(EMAIL_PATTERN)])
    ],
  });

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
        this.userForm.setValue({
          first_name: this.user.first_name,
          last_name: this.user.last_name,
          email: this.user.email
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  async onSubmit(){
    if(!this.userForm.valid)
      return;
    this.user = { ...this.user, ...this.userForm.value }
    const put$ = this.userService.put(this.user);
    await firstValueFrom(put$)
      .then(() => {
          this.router.navigate(['/home']);
      })
      .catch(error => {
        console.error(error);
      }); 
  }
}
