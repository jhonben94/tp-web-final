import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BolsasComponent } from './bolsas.component';

describe('BolsasComponent', () => {
  let component: BolsasComponent;
  let fixture: ComponentFixture<BolsasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BolsasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BolsasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
