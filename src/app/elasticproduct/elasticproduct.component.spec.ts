import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElasticproductComponent } from './elasticproduct.component';

describe('ElasticproductComponent', () => {
  let component: ElasticproductComponent;
  let fixture: ComponentFixture<ElasticproductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ElasticproductComponent]
    });
    fixture = TestBed.createComponent(ElasticproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
