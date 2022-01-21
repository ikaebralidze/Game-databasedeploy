import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Game } from '../models';
import { HttpService } from '../services/Http.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit, OnDestroy {
  gameRating = 0;
  gameID: string;
  game: Game;
  routeSub: Subscription;
  gameSub: Subscription;
  constructor(
    private ActivatedRoute: ActivatedRoute,
    private httpServie: HttpService
  ) {}

  ngOnInit(): void {
    this.routeSub = this.ActivatedRoute.params.subscribe((pramas: Params) => {
      this.gameID = pramas['id'];
      this.getGameDetails(this.gameID);
    });
  }

  getColor(vaule: number): string {
    if (vaule > 75) {
      return '#5ee432';
    } else if (vaule > 50) {
      return '#fffa50';
    } else if (vaule > 25) {
      return '#f7aa38';
    } else {
      return '#ef4655';
    }
  }

  getGameDetails(id: string) {
    this.gameSub = this.httpServie
      .getGameDetails(id)
      .subscribe((gameResp: Game) => {
        this.game = gameResp;

        setTimeout(() => {
          this.gameRating = this.game.metacritic;
        }, 1000);
      });
  }

  ngOnDestroy(): void {
    if (this.gameSub) {
      this.gameSub.unsubscribe();
    }

    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}
