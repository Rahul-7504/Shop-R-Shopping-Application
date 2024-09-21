import { Input, Output, EventEmitter } from '@angular/core';

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../shared.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.css']
})
export class PaymentMethodComponent {
  product: any;
  constructor(private route: ActivatedRoute, private sharedService: SharedService,private toastr: ToastrService,private router: Router ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.product = JSON.parse(params['product']);
    });
  }

  selectPayment(method: string): void {
    if (method === 'Cash on Delivery') {
      this.sharedService.addToOrders(this.product);
      alert(`${this.product.title} added to orders with ${method}`);
      this.toastr.success('order successfully')
      this.router.navigate(['/']);

    } else {
      this.toastr.error('upi payment is not available')
    }
  }

  
}
