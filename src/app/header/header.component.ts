import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../auth/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuthenticated: boolean;
  private userSub: Subscription;

  user: User;

  constructor(private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
      this.user = user;
    });

  }

  
  onLogout() {
    this.authService.logout();
  }

  onLogoutAll() {
    this.authService.logoutAll();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  goToHome() {
    if(!!this.user) {
      if(this.user.userType === 'admin') {
        this.router.navigate(['/admin/dashboard'], {relativeTo: this.route});
      }
      else if(this.user.userType === 'faculty') {
        this.router.navigate(['/faculty'], {relativeTo: this.route});
      }
      else if(this.user.userType === 'student') {
        this.router.navigate(['/student/dashboard'], { relativeTo: this.route, queryParamsHandling: "preserve" });
      }
    }
    else {
      this.router.navigate(['/'], {relativeTo: this.route});
    }
  }

  changePassword() {
    this.router.navigate(['/change_password'], { relativeTo: this.route });

  }
}
