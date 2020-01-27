import { UNLIMITED_TRIGGERING_TIMES } from 'core/game/game_props';
import { Player } from 'core/player/player';
import { PlayerId } from 'core/player/player_props';
import { Room } from 'core/room/room';
import { RulesBreakerSkill } from 'core/skills/skill';

export class ZhuGeLianNuSlashSkill extends RulesBreakerSkill {
  public breakRule(room: Room, owner: PlayerId) {
    room
      .getPlayerById(owner)
      .breakCardUseRules(this.name, UNLIMITED_TRIGGERING_TIMES);
  }

  public onLoseSkill(owner: Player) {
    owner.resetCommonCardUseRules(this.name);
  }
}