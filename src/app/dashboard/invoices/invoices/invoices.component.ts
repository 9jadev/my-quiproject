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
  submiting: boolean = false;

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
    this.loadingBar.stop();
    this.loadingBar.start();
    this.submiting = false
    this.submiting = true
    this.invoiceservice.create_invoices(formvalue).subscribe((res:any) => {
      if (res.status == "success") {
        this.toastr.success(res.message, "Successful.");
        this.getinvices();
      }
      if (res.status == "error") {
        this.toastr.error(res.message, "whoops.");
      }
      this.loadingBar.stop();
      this.submiting = false
    },(err:any) => {
      this.toastr.error("error occoured.", "whoops.");
      this.loadingBar.stop();
      this.submiting = false
    })
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
      this.loadingBar.stop();
    }, (err) => {
      this.loadingBar.stop();
    })

  }

  ngOnInit(): void {
    this.create_invoice = new FormGroup({
      "customer_firstname": new FormControl(null , [Validators.required, Validators.minLength(3)]),
      "customer_lastname": new FormControl(null , [Validators.required, Validators.minLength(3)]),
      "customer_phone": new FormControl(null , [Validators.required, Validators.minLength(3),Validators.pattern("(0)[0-9]{10}")]),
      "amount": new FormControl(null, [Validators.required, Validators.min(500)])
    });
    this.getinvices()

  }

}
