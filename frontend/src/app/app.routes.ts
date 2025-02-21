import { Routes } from '@angular/router';
import { BoardComponent } from './components/page/board/board.component';
import { MenuComponent } from './components/page/menu/menu.component';

export const routes: Routes = [
    { path: 'board', component: BoardComponent},
    { path: '', component: MenuComponent }
];
