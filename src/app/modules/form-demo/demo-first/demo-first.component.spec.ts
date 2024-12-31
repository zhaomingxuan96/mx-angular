import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoFirstComponent } from './demo-first.component';

describe('DemoFirstComponent', () => {
  let component: DemoFirstComponent;
  let fixture: ComponentFixture<DemoFirstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DemoFirstComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemoFirstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
