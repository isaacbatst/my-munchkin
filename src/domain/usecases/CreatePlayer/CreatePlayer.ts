import { IPlayer, Player } from "../../entities/Player";
import { IdGenerator } from "../../interfaces/IdGenerator"

interface CreatePlayerParams {
  name: string
}

interface CreatePlayerRepository {
  create(player: IPlayer): Promise<void>
}

export class CreatePlayer {
  constructor(
    private idGenerator: IdGenerator,
    private repository: CreatePlayerRepository
  ) {}

  async execute(params: CreatePlayerParams): Promise<{ id: string }> {
    const id = await this.idGenerator.generate();
    const player = new Player({ id, name: params.name });
    await this.repository.create(player.toDTO());
    return {
      id
    }
  }
}