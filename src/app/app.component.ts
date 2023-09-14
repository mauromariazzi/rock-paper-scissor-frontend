import { Component } from '@angular/core';
import { GameService } from 'src/service/game.service';
import { Game } from './model/Game.model';
import { Round } from './model/Round.model';
import { FormBuilder, FormControl } from '@angular/forms';


enum GameStatus {
  STARTED = 'STARTED',
  FINISHED = 'FINISHED',
}

enum Choice {
  ROCK = 'ROCK',
  PAPER = 'PAPER',
  SCISSOR = 'SCISSOR',
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  playerName = new FormControl('')

  currentGame: Game = {
    id: 0,
    playerName: '',
    playerScore: 0,
    status: '',
    rounds: []
  }

  currentRound: Round = {
    playerChoice: '',
    computerChoice: '',
    playerResult: '',
  }

  gameStatus: typeof GameStatus = GameStatus;
  possibleChoices: typeof Choice = Choice;

  showResult: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private gameService: GameService
  ) {}

  startGame() {
    if(this.playerName.value) {
      this.gameService.startGame(this.playerName.value).subscribe(game => {
        this.currentGame = game;
      })
    }
  }

  endGame() {
    this.gameService.endGame(this.currentGame.id).subscribe(game => {
      this.currentGame = game;
      setTimeout(() => {
        location.reload();
      }, 2000)
    });
  }

  playRound(choice: string) {
    this.gameService.playRound(this.currentGame.id, choice).subscribe(game => {
      this.currentGame = game;
      this.currentRound = game.rounds[game.rounds.length -1];
      this.showResult = true;
    })
  }
}
