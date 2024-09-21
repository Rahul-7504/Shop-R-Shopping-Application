import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  products: any[] = [];
  showPaymentModal = false;
  selectedProduct: any;
  
  

  constructor(private sharedService: SharedService,private toastr: ToastrService, private router: Router) { }
  ngOnInit(): void {
    this.sharedService.getProducts().subscribe(
      (products) => {
        this.products = products;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  openPaymentModal(product: any): void {
    this.router.navigate(['/payment'], { queryParams: { product: JSON.stringify(product) } });
  }

  // handlePaymentCompletion(event: any): void {
  //   const { method, product } = event;
  //   this.toastr.success(`${method} selected for ${product.title}`);
  //   this.showPaymentModal = false;

  //   // Add the product to orders if Cash on Delivery is selected
  //   if (method === 'Cash on Delivery') {
  //     this.sharedService.addToOrders(product);
  //     this.toastr.success(`${product.title} added to orders`);
  //   }
  // }


  addToCart(product: any): void {
    this.sharedService.addToCart(product);
    this.toastr.success("Added Favourite ")
  }

  removeCard(product: any): void {
    this.sharedService.removeProduct(product._id).subscribe(
        () => {
            this.products = this.products.filter(p => p !== product);
            this.toastr.success('Card removed successfully');
        },
        (error) => {
            console.error('Error removing product:', error);
            this.toastr.error('Failed to remove card');
        }
    );
}

}
