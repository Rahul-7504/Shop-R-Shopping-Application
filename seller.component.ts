import { Component } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent {

  product = {
    title: '',
    description: '',
    imageUrl: '',
    price:0
  };
  constructor(private toastr: ToastrService,private sharedService: SharedService) { }

  addProduct(): void {
    console.log(this.product); // Log the product object to check if the price is set correctly
    this.sharedService.addProduct(this.product).subscribe(
      response => {
        console.log('Product added successfully:', response);
        this.product = { title: '', description: '', imageUrl: '', price: 0 }; // Reset the form
        this.toastr.success('Product Added Successfully');
      }
    );
  }
  
}

