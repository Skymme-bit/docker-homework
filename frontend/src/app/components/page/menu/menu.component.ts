import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterOutlet,CommonModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  protected title = 'JEU DE TAQUIN';
  protected pseudo:string;

  public gridIds: { mode: number; id: string }[] = [
    // Normalement, les ids devraient différés pour chaque mode de jeu.
    // Afin de simplifier le back, on a associé la même grille de jeu à chaque mode.
    { mode: 1, id: 'eazf5d' },
    { mode: 2, id: 'eazf5d' },
    { mode: 3, id: 'eazf5d' },
    { mode: 4, id: 'eazf5d' },
    { mode: 5, id: 'eazf5d' },
  ];

  public constructor(private readonly router: Router) {}

  public onChangeEvent(event: Event): void {
    const target = event.target as HTMLInputElement;
    console.log(target.value);
    this.pseudo = target.value;
  }


  public onClickStartGame(mode: string): void {
    void this.router.navigate(['/board'],
              {queryParams: {mode: mode, name: this.pseudo}});
  }
}
