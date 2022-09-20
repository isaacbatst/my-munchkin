import { ILobby, Lobby } from "./Lobby";

interface GameParams {
  id: string
  lobby: Lobby
}

export interface IGame {
  id: string
  lobby: ILobby
}

export class Game {
  private id: string;
  private lobby: Lobby

  constructor(params: GameParams){
    this.validateLobby(params.lobby);

    this.id = params.id
    this.lobby = params.lobby;
  }

  private validateLobby(lobby: Lobby) {
    const players = lobby.getPlayers();

    if(players.length < 3 || players.length > 6) {
      throw new Error('INVALID_PLAYERS_LENGTH')
    } 
  }

  public getLobby(): ILobby {
    return this.lobby.toDTO();
  }

  public getId(): string {
    return this.id;
  }

  public toDTO(): IGame {
    return {
      id: this.id,
      lobby: this.lobby.toDTO()
    }
  }
}