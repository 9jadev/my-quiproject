import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {
  toggle:boolean = false;
  maketoggle () {
    this.toggle = !this.toggle;
  }
  constructor() { }

  ngOnInit(): void {
  }

}
