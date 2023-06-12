import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

declare const SwaggerUIBundle: any;

@Component({
  selector: 'app-swagger',
  templateUrl: './swagger.component.html',
  styleUrls: ['./swagger.component.css']
})
export class SwaggerComponent implements OnInit {
  constructor(private http: HttpClient) {}
  
  ngOnInit(): void {
    this.http.get('http://localhost:8080/v2/api-docs').subscribe((swaggerSpec: any) => {
      const ui = SwaggerUIBundle({
        dom_id: '#swagger-ui',
        layout: 'BaseLayout',
        presets: [
          SwaggerUIBundle.presets.apis,
          SwaggerUIBundle.SwaggerUIStandalonePreset
        ],
        spec: swaggerSpec,
        docExpansion: 'none',
        operationsSorter: 'alpha'
      });
    });
  }
}
