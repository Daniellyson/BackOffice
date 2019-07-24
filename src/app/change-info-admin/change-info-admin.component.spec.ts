import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeInfoAdminComponent } from './change-info-admin.component';

describe('ChangeInfoAdminComponent', () => {
  let component: ChangeInfoAdminComponent;
  let fixture: ComponentFixture<ChangeInfoAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeInfoAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeInfoAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
