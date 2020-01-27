import { CharacterNationality } from 'core/characters/character';
import { ClientEventFinder, GameEventIdentifiers } from 'core/event/event';
import { AllStage, RecoverEffectStage } from 'core/game/stage';
import { Player } from 'core/player/player';
import { Room } from 'core/room/room';
import { SkillType, TriggerSkill } from 'core/skills/skill';
import { TranslationPack } from 'core/translations/translation_json_tool';

export class JiuYuan extends TriggerSkill<SkillType.Compulsory> {
  public isAutoTrigger() {
    return true;
  }

  constructor() {
    super('jiuyuan', 'jiuyuan_description', SkillType.Compulsory, false, true);
  }

  public canUse(
    room: Room,
    owner: Player,
    content?: ClientEventFinder<GameEventIdentifiers.RecoverEvent>,
  ) {
    return (
      content !== undefined &&
      content.toId === owner.Id &&
      owner.Id !== content.fromId &&
      room.getPlayerById(content.fromId).Nationality === CharacterNationality.Wu
    );
  }

  public isTriggerable(stage: AllStage) {
    return stage === RecoverEffectStage.BeforeRecoverEffect;
  }

  onTrigger(room: Room, owner: Player) {
    room.broadcast(GameEventIdentifiers.SkillUseEvent, {
      translationsMessage: TranslationPack.translationJsonPatcher(
        '{0} activates skill {1}',
        room.getPlayerById(owner.Id).Name,
        this.name,
      ),
      fromId: owner.Id,
      triggeredBySkillName: this.name,
    });
  }

  onEffect(
    room: Room,
    event: ClientEventFinder<GameEventIdentifiers.RecoverEvent>,
  ) {
    if (
      event.toId == room.CurrentPlayer.Id &&
      room.getPlayerById(event.fromId).Nationality === CharacterNationality.Wu
    ) {
      event.recover++;
    }
  }
}