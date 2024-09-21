import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent {
addToCart(_t10: any) {
throw new Error('Method not implemented.');
}
  searchTerm: string = '';
  filteredData: any[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['term'] || '';
      if (this.searchTerm) {
        this.searchProducts();
      }
    });
}
searchProducts() {
  this.http.get(`http://localhost:3000/products/search?title=${this.searchTerm}`)
    .subscribe((response: any) => {
      this.filteredData = response.products || [];
    }, error => {
      console.error('Error fetching data:', error);
      this.filteredData = [];
    });
}
}
