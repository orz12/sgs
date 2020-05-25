import { GameEventIdentifiers, ServerEventFinder } from 'core/event/event';
import { Sanguosha } from 'core/game/engine';
import { AllStage, PhaseChangeStage, PlayerPhase } from 'core/game/stage_processor';
import { Player } from 'core/player/player';
import { Room } from 'core/room/room';
import { CommonSkill, TriggerSkill } from 'core/skills/skill';

@CommonSkill({ name: 'keji', description: 'keji_description' })
export class KeJi extends TriggerSkill {
  isTriggerable(event: ServerEventFinder<GameEventIdentifiers.PhaseChangeEvent>, stage?: AllStage) {
    return stage === PhaseChangeStage.BeforePhaseChange;
  }

  canUse(room: Room, owner: Player, content: ServerEventFinder<GameEventIdentifiers.PhaseChangeEvent>) {
    const canKeJi =
      !room.Analytics.getUsedCard(owner.Id, true).find(
        cardId => Sanguosha.getCardById(cardId).GeneralName === 'slash',
      ) &&
      !room.Analytics.getResponsedCard(owner.Id, true).find(
        cardId => Sanguosha.getCardById(cardId).GeneralName === 'slash',
      );

    return canKeJi && content.to === PlayerPhase.DropCardStage && owner.Id === content.toPlayer;
  }

  async onTrigger() {
    return true;
  }

  async onEffect(room: Room, skillUseEvent: ServerEventFinder<GameEventIdentifiers.SkillEffectEvent>) {
    room.skip(skillUseEvent.fromId, PlayerPhase.DropCardStage);

    return true;
  }
}
