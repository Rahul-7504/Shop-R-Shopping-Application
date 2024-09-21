import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private ordersSubject = new BehaviorSubject<any[]>(this.getOrdersFromLocalStorage());


  // getOrders() {
  //   throw new Error('Method not implemented.');
  // }
  // addToOrders(product: any) {
  //   throw new Error('Method not implemented.');
  // }
  private cartSubject = new BehaviorSubject<any[]>(this.getCartItemsFromLocalStorage());

  constructor(private http: HttpClient) { }

  getOrdersFromLocalStorage(): any[] {
    const savedOrders = localStorage.getItem('orders');
    return savedOrders ? JSON.parse(savedOrders) : [];
  }

  saveOrdersToLocalStorage(orders: any[]): void {
    localStorage.setItem('orders', JSON.stringify(orders));
  }

  getOrders(): Observable<any[]> {
    return this.ordersSubject.asObservable();
  }

  addToOrders(product: any): void {
    const currentOrders = this.ordersSubject.value;
    currentOrders.push({ ...product, paymentMethod: 'Cash on Delivery' });
    this.ordersSubject.next(currentOrders);
    this.saveOrdersToLocalStorage(currentOrders);
  }


  getCartItemsFromLocalStorage(): any[] {
    const savedItems = localStorage.getItem('cartItems');
    return savedItems ? JSON.parse(savedItems) : [];
  }

  // Save cart items to localStorage
  saveCartItemsToLocalStorage(items: any[]): void {
    localStorage.setItem('cartItems', JSON.stringify(items));
  }

  // Expose cart items as Observable
  getCartItems(): Observable<any[]> {
    return this.cartSubject.asObservable();
  }

  // Add item to cart and save in localStorage
  addToCart(item: any): void {
    const currentItems = this.cartSubject.value;
    currentItems.push(item);
    this.cartSubject.next(currentItems);
    this.saveCartItemsToLocalStorage(currentItems);
  }

  // Remove item from cart and update localStorage
  removeFromCart(index: number): void {
    const currentItems = this.cartSubject.value;
    currentItems.splice(index, 1);
    this.cartSubject.next(currentItems);
    this.saveCartItemsToLocalStorage(currentItems);
  }

  // Other product methods
  addProduct(data: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/products/saveproduct', data);
  }

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/products/getproduct');
  }
  removeProduct(productId: string): Observable<void> {
    return this.http.delete<void>(`http://localhost:3000/products/deleteproduct/${productId}`);
}

}
