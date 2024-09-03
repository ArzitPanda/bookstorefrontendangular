import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-admin-dash-board',
  standalone: true,
  imports: [
    MatSidenavModule,
    RouterModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './admin-dash-board.component.html',
  styleUrls: ['./admin-dash-board.component.css']
})
export class AdminDashBoardComponent {

  constructor(private router: Router, public dialog: MatDialog) {}

  logout(): void {
    const dialogRef = this.dialog.open(LogoutConfirmDialog);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        sessionStorage.removeItem('authToken');
        this.router.navigate(['/login']);
      }
    });
  }
}

@Component({
  selector: 'logout-confirm-dialog',
  template: `
    <div class="p-6 max-w-sm mx-auto bg-white rounded-lg shadow-md">
      <div class="text-xl font-semibold text-gray-800 mb-4">Confirm Logout</div>
      <div class="text-gray-600 mb-6">
        <p>Are you sure you want to log out?</p>
      </div>
      <div class="flex justify-end space-x-4">
        <button class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300" (click)="dialogRef.close(false)">
          Cancel
        </button>
        <button class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600" (click)="dialogRef.close(true)">
          Logout
        </button>
      </div>
    </div>
  `,
})
export class LogoutConfirmDialog {
  constructor(public dialogRef: MatDialogRef<LogoutConfirmDialog>) {}
}
