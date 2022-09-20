export interface IPlayer {
  id: string;
  name: string
}

interface PlayerParams {
  id: string;
  name: string
}

export class Player {
  private id: string;
  private name: string;

  constructor(params: PlayerParams){
    this.id = params.id;
    this.name = params.name;
  }

  public toDTO(): IPlayer {
    return {
      id: this.id,
      name: this.name
    }
  }

  public static toDomainInstance(player: IPlayer): Player {
    return new Player({
      id: player.id,
      name: player.name
    })
  }
}
