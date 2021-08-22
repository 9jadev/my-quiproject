import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userDetails$:any;
  isOpen:boolean = false;
  constructor(private auth: AuthService) { }
  togglesidebar () {
    const sidebar = document.querySelector(".mainsidebar");
    sidebar?.classList.toggle("-translate-x-full");
  }

   logout() {
    this.auth.clearSessionStorage()
  }
  drawer() {
    const sideb = document.querySelector(".nav__links");
    const nav__overlay = document.querySelector(".nav__overlay");
    sideb?.classList.toggle('nav__open');
    nav__overlay?.classList.toggle('nav__open');
  }
  overlay () {
    const sideb = document.querySelector(".nav__links");
    const nav__overlay = document.querySelector(".nav__overlay");
    sideb?.classList.remove('nav__open');
    nav__overlay?.classList.remove('nav__open');
  }
  ngOnInit(): void {
    this.userDetails$ = this.auth.getUser$();
  }

}
