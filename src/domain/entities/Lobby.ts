import { IPlayer, Player } from "./Player";

export interface ILobby {
  id: string,
  players: IPlayer[]
}

interface LobbyParams {
  id: string,
  players: Player[]
}

export class Lobby {
  private id: string;
  private players: Player[]
  
  constructor(params: LobbyParams) {
    this.id = params.id;
    this.players = params.players
  }

  public toDTO(): ILobby {
    return {
      id: this.id,
      players: this.players.map(player => player.toDTO())
    }
  }

  public static toDomainInstance(lobby: ILobby): Lobby {
    return new Lobby({
      id: lobby.id,
      players: lobby.players.map(Player.toDomainInstance)
    })
  }

  public getPlayers(): IPlayer[] {
    return this.players.map(player => player.toDTO())
  }

  public getId(): string {
    return this.id;
  }
}