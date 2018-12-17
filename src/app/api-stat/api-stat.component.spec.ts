import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiStatComponent } from './api-stat.component';

describe('ApiStatComponent', () => {
  let component: ApiStatComponent;
  let fixture: ComponentFixture<ApiStatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiStatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
