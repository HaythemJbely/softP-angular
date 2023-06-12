import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ElasticProduct } from '../models/ElasticProduct';
import { ElasticProductService } from '../services/elastic-product.service';

@Component({
  selector: 'app-elasticproduct',
  templateUrl: './elasticproduct.component.html',
  styleUrls: ['./elasticproduct.component.css']
})
export class ElasticproductComponent implements OnInit {

  elasticProducts: ElasticProduct[] = [];
  elasticProductForm: FormGroup;
  elasticProduct: ElasticProduct = new ElasticProduct();
  editing: boolean = false;
  elasticProductId?: string;


  constructor(
    private elasticProductService: ElasticProductService,
    private formBuilder: FormBuilder
  ) {
    this.elasticProductForm = this.formBuilder.group({
      productName: [null],
      productDescription: [null],
      productPrice: [null],
      quantity: [null],
      category: [null],
      manufacturer: [null],
    })
  }
  ngOnInit(): void {
    this.findAllElasticProducts();
  }

  findAllElasticProducts() {
    this.elasticProductService.findAll().subscribe(res => {
      this.elasticProducts = res;
    })
  }

  getElasticProductForm(): ElasticProduct {
    return {
      ...new ElasticProduct(),
      productName: this.elasticProductForm.get(['productName'])?.value,
      productDescription: this.elasticProductForm.get(['productDescription'])?.value,
      productPrice: this.elasticProductForm.get(['productPrice'])?.value,
      quantity: this.elasticProductForm.get(['quantity'])?.value,
      sportsCategory: this.elasticProductForm.get(['category'])?.value,
      manufacturer: this.elasticProductForm.get(['manufacturer'])?.value,
    }
  }

  saveElasticProduct():void {
    this.elasticProduct = this.getElasticProductForm();
    this.elasticProductService.saveElasticProduct(this.elasticProduct).subscribe(res =>{
      this.elasticProduct = res;
      this.findAllElasticProducts();
      this.elasticProductForm.reset();
    })
  }

  deleteElasricProduct(id : string): void {
    this.elasticProductService.deleteElasticproduct(id).subscribe(()=> {
      console.log('Elastic product deleted successfully');
      this.findAllElasticProducts();
    }, error => {
      console.error('An Error occurs when deleting Elastic product',error);
    });
  }

  cancelEdit(): void {
    this.editing = false;
    this.elasticProductForm.reset();
  }
  
  updateElasticProduct(): void {
    const updatedProduct: ElasticProduct = this.getElasticProductForm();
    this.elasticProductService.updateElasticProduct(this.elasticProductId!, updatedProduct).subscribe(res => {
      this.cancelEdit();
      this.findAllElasticProducts();
    });
  }
  editElasticProduct(product: ElasticProduct): void {
    this.editing = true;
    this.elasticProductId = product.id;
    this.elasticProductForm.patchValue({
      productName: product.productName,
      productDescription: product.productDescription,
      productPrice: product.productPrice,
      quantity: product.quantity,
      category: product.sportsCategory,
      manufacturer: product.manufacturer
    });
  }
  
  
}
