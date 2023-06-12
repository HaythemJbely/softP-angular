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

  /**
   * Saves an ElasticProduct.
   * @param {ElasticProduct} elasticProduct - The ElasticProduct object to be saved.
   * @returns  {Observable<ElasticProduct>} An observable that emits the saved ElasticProduct object.
   */
  saveElasticProduct(elasticProduct: ElasticProduct): Observable<ElasticProduct> {
    return this.httpClient.post<ElasticProduct>(this.resourceUrl, elasticProduct);
  }

  /**
   * Retrieves all ElasticProduct objects.
   * @returns {Observable<ElasticProduct[]>} An observable that emits an array of ElasticProduct objects.
   */
  findAll() {
    return this.httpClient.get<ElasticProduct[]>(this.resourceUrl);
  }

  /**
   * Updates an ElasticProduct.
   * @param {string} id - The ID of the ElasticProduct to be updated. 
   * @param {ElasticProduct} elasticProduct - The updated ElasticProduct object. 
   * @returns {Observable<ElasticProduct>} An observable that emits the updated ElasticProduct object.
   */
  updateElasticProduct(id: string, elasticProduct: ElasticProduct): Observable<ElasticProduct> {
    return this.httpClient.put<ElasticProduct>(`${this.resourceUrl}/${id}`, elasticProduct);
  }


  /**
   * Deletes an ElasticProduct.
   * @param {string} id - The ID of the ElasticProduct to be deleted. 
   * @returns {Observable<void>} An observable that emits a void value upon successful deletion.
   */
  deleteElasticproduct(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.resourceUrl}/${id}`);
  }

}
