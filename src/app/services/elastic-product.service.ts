import { Injectable } from '@angular/core';
import { SERVER_API_URL } from '../app.constants';
import { ElasticProduct } from '../models/ElasticProduct';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ElasticProductService {

  private resourceUrl = SERVER_API_URL + 'elasticProduct'

  constructor(private httpClient: HttpClient) { }

  saveElasticProduct(elasticProduct : ElasticProduct) : Observable<ElasticProduct>{
    return this.httpClient.post<ElasticProduct>(this.resourceUrl ,elasticProduct);
  }

  findAll(){
    return this.httpClient.get<ElasticProduct[]>(this.resourceUrl);
  }

  deleteElasticproduct(id : string) : Observable<void> {
    return this.httpClient.delete<void>(`${this.resourceUrl}/${id}`);
  }
}
