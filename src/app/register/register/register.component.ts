import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  eye:boolean =  true;
  constructor() { }

  eyetoggle() {
    this.eye = !this.eye
  }

  ngOnInit(): void {
  }

}
