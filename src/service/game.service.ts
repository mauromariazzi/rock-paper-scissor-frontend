import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from 'src/app/model/Game.model';
import { Round } from 'src/app/model/Round.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  apiUrl: string = '/api/v1/games';

  constructor(protected httpClient: HttpClient) { }

  startGame(playerName: string): Observable<Game> {
    return this.httpClient.post<Game>(`${this.apiUrl}?playerName=${playerName}`, null);
  }

  endGame(gameId: number): Observable<Game> {
    return this.httpClient.put<Game>(`${this.apiUrl}/${gameId}`, null);
  }

  playRound(gameId: number, choice: string): Observable<Game> {
    return this.httpClient.post<Game>(`${this.apiUrl}/${gameId}?playerChoice=${choice}`, null);
  }
}
