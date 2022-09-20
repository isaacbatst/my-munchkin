import { ILobby, Lobby } from "../../entities/Lobby";
import { IPlayer, Player } from "../../entities/Player";
import { IdGenerator } from "../../interfaces/IdGenerator";

interface CreateLobbyParams {
  playerId: string;
}

interface CreateLobbyRepository {
  create(lobby: ILobby, playerId: string): Promise<void>
  getPlayerById(id: string): Promise<IPlayer | null>
}

export class CreateLobby {
  constructor(
    private repository: CreateLobbyRepository,
    private idGenerator: IdGenerator
  ){}

  async execute(params: CreateLobbyParams): Promise<{ id: string }> {
    const id = await this.idGenerator.generate();
    const found = await this.repository.getPlayerById(params.playerId);

    if(!found) {
      throw new Error('PLAYER_NOT_FOUND')
    }

    const player = Player.toDomainInstance(found);

    const lobby = new Lobby({ 
      id,
      players: [player]
    });

    await this.repository.create(lobby.toDTO(), params.playerId);

    return {
      id: lobby.getId()
    }
  }
}