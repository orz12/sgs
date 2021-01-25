import { CardMoveReason, GameEventIdentifiers, ServerEventFinder } from 'core/event/event';
import { Sanguosha } from 'core/game/engine';
import { AllStage, DamageEffectStage } from 'core/game/stage_processor';
import { Player } from 'core/player/player';
import { PlayerCardsArea, PlayerId } from 'core/player/player_props';
import { Room } from 'core/room/room';
import { CommonSkill, TriggerSkill, CompulsorySkill, ShadowSkill, RulesBreakerSkill } from 'core/skills/skill';
import { TranslationPack } from 'core/translations/translation_json_tool';

@CompulsorySkill({ name: 'benxi', description: 'benxi_description' })
export class BenXi extends RulesBreakerSkill {
  public breakOffenseDistance() {
    return 1;
  }
}
