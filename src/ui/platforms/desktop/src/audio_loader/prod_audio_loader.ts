import { CharacterGender } from 'core/characters/character';
import lobbyBGM from './audios/bgm/lobby.mp3';
import roomBGM from './audios/bgm/room.mp3';
import chainAudio from './audios/chain.mp3';
import damageAudio from './audios/damage.mp3';
import seriousDamageAudio from './audios/damage2.mp3';
import equipAudio from './audios/equip.mp3';
import gameStartAudio from './audios/gamestart.mp3';
import lostHpAudio from './audios/loseHp.mp3';
import { AudioLoader } from './audio_loader';

export class ProdAudioLoader implements AudioLoader {
  getLobbyBackgroundMusic() {
    return lobbyBGM;
  }

  getRoomBackgroundMusic() {
    return roomBGM;
  }
  getGameStartAudio() {
    return gameStartAudio;
  }

  getDamageAudio(damage: number) {
    return damage === 1 ? damageAudio : seriousDamageAudio;
  }
  getLoseHpAudio(): string {
    return lostHpAudio;
  }
  getEquipAudio(): string {
    return equipAudio;
  }
  getChainAudio(): string {
    return chainAudio;
  }

  async getCardAudio(cardName: string, gender: CharacterGender, characterName?: string): Promise<string> {
    return (await import(`./audios/cards/${gender === CharacterGender.Female ? 'female' : 'male'}/${cardName}.ogg`))
      .default;
  }

  async getSkillAudio(skillName: string, gender: CharacterGender, characterName?: string): Promise<string> {
    const randomIndex = Math.round(Math.random() * 1) + 1;
    return (await import(`./audios/characters/${skillName}${randomIndex}.mp3`)).default;
  }

  async getDeathAudio(characterName: string): Promise<string> {
    return (await import(`./audios/characters/${characterName}.mp3`)).default;
  }
}
