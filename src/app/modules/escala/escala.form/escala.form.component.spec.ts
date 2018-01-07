import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EscalaFormComponent } from './escala.form.component';

describe('EscalaFormComponent', () => {
  let component: EscalaFormComponent;
  let fixture: ComponentFixture<EscalaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscalaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EscalaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
