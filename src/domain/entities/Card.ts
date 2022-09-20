import { Effect } from "./Effect";

export enum Deck {
  DOOR = 'DOOR',
  TREASURE = 'TREASURE'
}

export interface CardParams {
  name: string;
  deck: string;
  effects: Effect[],
  category: string
}

export abstract class Card {
  private name: string;
  private deck: Deck;
  private effects: Effect[];

  constructor(params: CardParams) {
    if(params.name.length === 0) throw new Error('INVALID_EMPTY_NAME');
    if(params.effects.length === 0) throw new Error('INVALID_EMPTY_EFFECTS_LIST');
    if(!this.isDeckValid(params.deck)) throw new Error('UNKNOWN_DECK');

    this.deck = params.deck;
    this.name = params.name;
    this.effects = params.effects
  }

  private isDeckValid(deck: string): deck is Deck {
    return deck in Deck;
  }
}