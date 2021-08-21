import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login: FormGroup = new FormGroup({});
  eye: boolean = true;
  loggIn: boolean = false;
  errormessage: string  = '';
  
  constructor(private router:Router, private auth: AuthService, private loadingBar: LoadingBarService, private toastr: ToastrService) { }

  eyetoggle() {
    this.eye = !this.eye
  }
  logIn(formvalue: Object) {
    for (const i in this.login.controls) {
      this.login.controls[i].markAsDirty();
      this.login.controls[i].updateValueAndValidity();
    }
    if (this.login.invalid) {
      return;
    }
    this.errormessage = '';
    this.loadingBar.stop();
    this.loggIn = true
    this.loadingBar.start();
    this.auth.login(formvalue).subscribe((res:any) => {
      this.loggIn = false
      this.loadingBar.stop();
      this.auth.storeToken(res.token)
      this.auth.storeUser(res.customer)
      this.router.navigate(["/dashboard"])
    }, (err:any) => {
      this.loggIn = false
      this.loadingBar.stop();
      this.toastr.error('Login Occoured.', 'Error');
      this.errormessage = err.error.message;
      this.login.reset();
    });
  
  }
  get formControls() {
    return this.login.controls;
  }

  ngOnInit(): void {
    this.login = new FormGroup({
      "email": new FormControl(null, [Validators.required, Validators.minLength(3), Validators.email]),
      "password": new FormControl(null, [Validators.required, Validators.minLength(3)])
    });
  }

}
