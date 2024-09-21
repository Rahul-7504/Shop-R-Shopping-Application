import { Component,OnInit  } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  orders: any[] = [];

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.sharedService.getOrders().subscribe((orders) => {
      console.log(orders); // Log the orders to check their structure
      this.orders = orders;
    });
  }
  

  cancelOrder(index: number): void {
    this.orders.splice(index, 1);  // Remove the order at the specified index
  }
  
}
