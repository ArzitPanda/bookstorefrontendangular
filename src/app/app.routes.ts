import { Routes } from '@angular/router';
import { UserComponent } from '../component/user/user.component';
import { CartComponent } from '../component/cart/cart.component';
import { OrdersComponent } from '../component/orders/orders.component';
import { UserSettingsComponent } from '../component/user-settings/user-settings.component';
import { UserHomeComponent } from '../component/user-home/user-home.component';
import { LoginComponent } from '../component/login/login.component';
import { SignupComponent } from '../component/signup/signup.component';
import { ProductPageComponent } from '../component/product-page/product-page.component';
import { AuthGuard } from './guard/auth.guard';
import { AdminDashBoardComponent } from '../component/admin/admin-dash-board/admin-dash-board.component';
import { AdminProductComponent } from '../component/admin/admin-product/admin-product.component';
import { OrderAdminComponent } from '../component/admin/order-admin/order-admin.component';

export const routes: Routes = [
    
        {
            path:"login",component:LoginComponent,
        },
        {
            path:"signup",component:SignupComponent,
        },


       { path:"user",component:UserComponent,canActivate:[AuthGuard],
        children:[
            {
                    path:'', component:UserHomeComponent
            },

            {
                path:"cart",component:CartComponent,
            }

            ,
            {
                path:"orders",component:OrdersComponent,
            },
            {
                path:"settings",component:UserSettingsComponent,
            },
            { path: 'product/:id', component: ProductPageComponent },
        ]
    },
    {
        path:"admin",component:AdminDashBoardComponent,canActivate:[AuthGuard],
        children:[
            {path:'product',component:AdminProductComponent},
            {path:'order',component:OrderAdminComponent}
        ]
    }
];
