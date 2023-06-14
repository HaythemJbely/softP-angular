import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-kibana-metrics',
  templateUrl: './kibana-metrics.component.html',
  styleUrls: ['./kibana-metrics.component.css']
})
export class KibanaMetricsComponent implements OnInit{
    username?: string;

  ngOnInit(): void {
    const userJson = window.localStorage.getItem('user');
    if(userJson){
      const user = JSON.parse(userJson);
      this.username = user.username;
    }
  }

  redirectToSwagger() {
    window.location.href = '/swagger';
  }
}
