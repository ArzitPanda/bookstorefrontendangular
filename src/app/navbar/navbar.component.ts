import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { UserDetails, UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule,MatButtonModule,RouterModule,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  userDetails: UserDetails | null = null;
  isWishListOpen:boolean =false
  wishList:any[] =[]

  constructor(private userService: UserService,private wishlistService:BookService) {}

  ngOnInit(): void {
    this.userService.userDetails$.subscribe(details => {
      this.userDetails = details;
    });

    this.fetchAllWishList()
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
