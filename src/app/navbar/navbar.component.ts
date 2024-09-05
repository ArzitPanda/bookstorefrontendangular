import { Component, HostListener } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { UserDetails, UserService } from '../../services/user.service';
import { CommonModule, Location } from '@angular/common';
import { BookService } from '../../services/book.service';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { LogoutConfirmDialog } from '../../component/admin/admin-dash-board/admin-dash-board.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule,MatButtonModule,RouterModule,CommonModule,MatIconModule,MatListModule,MatDialogModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  userDetails: UserDetails | null = null;
  isWishListOpen:boolean =false
  wishList:any[] =[]
isMenuOpen: boolean=false;
showBackButton = false;

  constructor(private userService: UserService,
    private router:Router,
    private location: Location,
    private wishlistService:BookService
    ,
   public dialog: MatDialog
    ) {

      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.showBackButton = this.router.url !== '/user'; // Adjust this condition based on your default route
        }
      });


    }
    goBack() {
      this.location.back();
    }
    

  ngOnInit(): void {
    this.userService.userDetails$.subscribe(details => {
      this.userDetails = details;
    });

    this.fetchAllWishList()
  }



  logout(): void {
    const dialogRef = this.dialog.open(LogoutConfirmDialog);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        sessionStorage.removeItem('authToken');
        this.router.navigate(['/login']);
      }
    });
  }


  toggleNavMenu()
  {
    this.isMenuOpen =!this.isMenuOpen
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const clickedInside = target.closest('.profile-container');
    if (!clickedInside) {
      this.isMenuOpen = false;
    }
    const clickedInsideWishlist = (event.target as HTMLElement).closest('.wishlist-container')
    if(!clickedInsideWishlist && !(event.target as HTMLElement)?.classList.contains('wishlist-btn'))
    {
      this.isWishListOpen=false;
    }

    
  }

  fetchAllWishList()
  {
    this.wishlistService.getWishList().subscribe({
      next:(data)=>{console.log(data)

        this.wishList = Array.from(new Set(data.map((item: { id: any; }) => item.id)))
        .map(id => {
            return data.find((item: { id: any; }) => item.id === id);
        });

      },
      error:(err)=>console.log(err)
    })
  }

  onWishListToggle():void
  {
    if(this.isWishListOpen===false)
      this.isWishListOpen=true
    else
    this.isWishListOpen=false
  }
}
