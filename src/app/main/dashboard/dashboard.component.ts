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
  constructor(private auth: AuthService) { }
  togglesidebar () {
    const sidebar = document.querySelector(".mainsidebar");
    sidebar?.classList.toggle("-translate-x-full");
  }

   logout() {
    this.auth.clearSessionStorage()
  }

  ngOnInit(): void {
    this.userDetails$ = this.auth.getUser$();
  }

}
