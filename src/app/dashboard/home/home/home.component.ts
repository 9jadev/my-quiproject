import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  invoices:Array<any> = [];

  constructor(private auth:AuthService, private router:Router, private toastr: ToastrService) { }

  loadinvoices () {
    this.auth.fetchDashboard().subscribe((res: any) => {
      // console.log(res.status)
      if (res.status == "success") {
        this.invoices = res.invoices
        this.toastr.success("Fetch Successful.", "Successful");
      }
      if (res.status == "error") {
        this.toastr.success("Fetch Successful, invoices is empty. ", "Successful");
      }
      console.log(this.invoices[0]?.amount)
    }, (err: any) => {
      console.log(err)
      this.toastr.error("Network Error.", 'Error!');
    })
    console.log(this.invoices.length)
  }

  ngOnInit(): void {

    // this.toastr.error("It's a wrap", 'Unauthorised!');
    this.loadinvoices()
  }

}
