import { GameCardExtensions } from 'core/game/game_props';
import { NullSkill } from 'core/skills/skill';
import { BasicCard } from '../basic_card';
import { CardSuit } from '../card';

export class Jink extends BasicCard {
  constructor(id: number, cardNumber: number, suit: CardSuit) {
    super(
      id,
      cardNumber,
      suit,
      'jink',
      'jink_description',
      GameCardExtensions.Standard,
      new NullSkill(),
    );
  }
}