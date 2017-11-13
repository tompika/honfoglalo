import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { GameComponent } from "./game/game.component";

import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { NotFoundComponent } from "./not-found/not-found.component";


import { ChatregComponent } from "./chatreg/chatreg.component";

import { AuthGuard } from './_guards/index';


const MAINMENU_ROUTES: Routes = [

    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'home', component: HomeComponent /*, canActivate: [AuthGuard]*/ },
    { path: 'game', component: GameComponent/* , canActivate: [AuthGuard]*/ },

    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'chatreg', component: ChatregComponent },
    { path: 'logout', component: HomeComponent },

    { path: '404', component: NotFoundComponent },
    { path: '**', redirectTo: '404' }

];
export const CONST_ROUTING = RouterModule.forRoot(MAINMENU_ROUTES);
