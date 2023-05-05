import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/services/user.service';
import { removeCookie } from 'typescript-cookie';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  
  user: any = null;
  constructor(private router : Router, private userService: UserService) { 

  }

  ngOnInit(): void {
    removeCookie("XSRF-TOKEN");
    removeCookie("JSESSIONID");
    window.sessionStorage.clear();
    this.userService.setUserDetails(new User());
    this.router.navigate(['/login']);
  }


}
