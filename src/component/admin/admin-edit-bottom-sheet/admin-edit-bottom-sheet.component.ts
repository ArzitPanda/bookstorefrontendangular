
import {Component} from '@angular/core';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { MatCommonModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';


@Component({
  selector: 'app-admin-edit-bottom-sheet',
  standalone: true,
  imports: [MatListModule,MatCommonModule],
  templateUrl: './admin-edit-bottom-sheet.component.html',
  styleUrl: './admin-edit-bottom-sheet.component.css'
})
export class AdminEditBottomSheetComponent {
  constructor(private bottomSheetRef: MatBottomSheetRef<AdminEditBottomSheetComponent>) {}

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
