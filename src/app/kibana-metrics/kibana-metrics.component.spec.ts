import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KibanaMetricsComponent } from './kibana-metrics.component';

describe('KibanaMetricsComponent', () => {
  let component: KibanaMetricsComponent;
  let fixture: ComponentFixture<KibanaMetricsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KibanaMetricsComponent]
    });
    fixture = TestBed.createComponent(KibanaMetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
