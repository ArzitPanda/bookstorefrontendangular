import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditBottomSheetComponent } from './admin-edit-bottom-sheet.component';

describe('AdminEditBottomSheetComponent', () => {
  let component: AdminEditBottomSheetComponent;
  let fixture: ComponentFixture<AdminEditBottomSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminEditBottomSheetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEditBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
