export class Effect {
  private name: string;
  private description: string;
  public execute: Function

  constructor(name: string, description: string, execute: Function) {
    this.name = name;
    this.description = description;
    this.execute = execute;
  }
}