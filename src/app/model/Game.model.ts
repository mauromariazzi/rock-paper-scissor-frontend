import { Round } from "./Round.model";

export interface Game {
  id: number;
  playerName: string;
  playerScore: number;
  status: string;
  rounds: Round[];
}