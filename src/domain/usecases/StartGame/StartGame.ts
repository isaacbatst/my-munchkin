import { Game, IGame } from "../../entities/Game";
import { ILobby, Lobby } from "../../entities/Lobby";
import { IdGenerator } from "../../interfaces/IdGenerator";

interface StartGameRepository {
  start(game: IGame): Promise<void>
  getLobby(lobbyId: string, playerId: string): Promise<ILobby | null>
}


export class StartGame {
  constructor(
    private repository: StartGameRepository,
    private idGenerator: IdGenerator,
  ){}
  
  async execute(lobbyId: string, playerId: string): Promise<{ id: string }> {
    const found = await this.repository.getLobby(lobbyId, playerId);
    
    if(!found) {
      throw new Error('LOBBY_NOT_FOUND');
    }

    const lobby = Lobby.toDomainInstance(found);
    const id = await this.idGenerator.generate();

    const game = new Game({ lobby, id });

    await this.repository.start(game.toDTO());

    return {
      id: game.getId()
    }
  }
}