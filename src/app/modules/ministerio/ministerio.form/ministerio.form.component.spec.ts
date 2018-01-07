import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinisterioFormComponent } from './ministerio.form.component';

describe('MinisterioFormComponent', () => {
  let component: MinisterioFormComponent;
  let fixture: ComponentFixture<MinisterioFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinisterioFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinisterioFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
