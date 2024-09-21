import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
addToCart(_t39: any) {
throw new Error('Method not implemented.');
}
  searchTerm: string = '';
  filteredData: any[] = [];

  constructor(private http: HttpClient, private sharedService: SharedService, private router: Router) { }

  onSearch() {
    if (this.searchTerm.trim()) {
      this.router.navigate(['/search-results'], { queryParams: { term: this.searchTerm } });
      this.searchTerm = ''; // Reset the input box
    }
  }
}