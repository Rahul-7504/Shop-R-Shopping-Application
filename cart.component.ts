import { Component } from '@angular/core';
import { SharedService } from '../shared.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {


  cartItems: any[] = [];

  constructor(private sharedService: SharedService,private toastr: ToastrService) { }
  ngOnInit(): void {
    this.loadCartItems();
  }

  // Load cart items on init
  loadCartItems(): void {
    this.sharedService.getCartItems().subscribe(
      (items) => {
        this.cartItems = items;
      },
      (error) => {
        console.error('Error fetching cart items:', error);
      }
    );
  }

  // Remove item from cart
  removeFromCart(index: number): void {
    this.sharedService.removeFromCart(index);
    this.toastr.success('Card Remove Succssfull')
  }

  }


