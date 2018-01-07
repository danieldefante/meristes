import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritosFormComponent } from './favoritos.form.component';

describe('FavoritosFormComponent', () => {
  let component: FavoritosFormComponent;
  let fixture: ComponentFixture<FavoritosFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoritosFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
