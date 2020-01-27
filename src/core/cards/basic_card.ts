import { GameCardExtensions } from 'core/game/game_props';
import { Skill } from 'core/skills/skill';
import { Card, CardId, CardSuit, CardType } from './card';

export abstract class BasicCard extends Card {
  protected cardType = CardType.Basic;
  protected generalName: string;

  constructor(
    protected id: CardId,
    protected cardNumber: number,
    protected suit: CardSuit,
    protected name: string,
    protected description: string,
    protected fromPackage: GameCardExtensions,
    protected skill: Skill,
    generalName?: string,
  ) {
    super();
    this.generalName = generalName || this.name;
  }
}