import { Component, OnInit } from '@angular/core';
import { FormGroup , FormControl, Validators } from '@angular/forms';
import { InvoicesService } from 'src/app/core/services/invoices.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoadingBarService } from '@ngx-loading-bar/core';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit {

  create_invoice: FormGroup = new FormGroup({});
  invoices: Array<any> = [];
  loading: boolean = false;

  constructor(private invoiceservice: InvoicesService,private loadingBar: LoadingBarService, private toastr: ToastrService, private router: Router) { }


  get formControls() {
    return this.create_invoice.controls;
  }

  create_inv (formvalue: Object) {
    for (const i in this.create_invoice.controls) {
      this.create_invoice.controls[i].markAsDirty();
      this.create_invoice.controls[i].updateValueAndValidity();
    }
    if (this.create_invoice.invalid) {
      return;
    }
    console.log(formvalue)
  }

  getinvices () {
    this.loadingBar.stop();
    this.loadingBar.start();
    this.loading = false
    this.loading = true
    this.invoiceservice.getinvoices().subscribe((res:any) => {
      if (res.status == "success") {
        this.invoices = res.invoices;
        this.loading = false
        this.toastr.success("Fetched Successfully.", "Successful.");
      }
      if (res.status == "error") {
        this.loading = false
        this.toastr.error(res.message, "Error");
      }
      console.log(res)
      this.loadingBar.stop();
    }, (err) => {
      this.loadingBar.stop();
    })

  }

  ngOnInit(): void {
    this.create_invoice = new FormGroup({
      "firstname": new FormControl(null , [Validators.required, Validators.minLength(3)]),
      "lastname": new FormControl(null , [Validators.required, Validators.minLength(3)]),
      "customer_phone": new FormControl(null , [Validators.required, Validators.minLength(3),Validators.pattern("(0)[0-9]{10}")]),
      "amount": new FormControl(null, [Validators.required, Validators.min(500)])
    });
    this.getinvices()

  }

}
