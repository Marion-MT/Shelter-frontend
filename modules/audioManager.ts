import { Audio } from 'expo-av';

type SoundKey = 'background' | 'scroll' | 'validate' | 'click' | 'backgroundGame';

const soundFiles: Record<SoundKey, any> = {
  background: require('../assets/sounds/background.mp3'),
  scroll: require('../assets/sounds/scroll.mp3'),
  validate: require('../assets/sounds/validate.mp3'),
  click: require('../assets/sounds/click.mp3'),
  backgroundGame: require('../assets/sounds/backgroundGame.mp3'),
};

class AudioManager {
  private static sounds: Partial<Record<SoundKey, Audio.Sound>> = {};
  private static musicMuted = false;
  private static effectsMuted = false;
  private static volume = 0.2;

  // --- Préchargement ---
  static async preloadAll() {
    for (const key of Object.keys(soundFiles) as SoundKey[]) {
      if (!this.sounds[key]) {
        const sound = new Audio.Sound();
        await sound.loadAsync(soundFiles[key]);
        if (key === 'background' || key === 'backgroundGame') {
          await sound.setIsLoopingAsync(true);
          await sound.setVolumeAsync(this.volume);
        }
        this.sounds[key] = sound;
      }
    }
  }

  // --- Musique de fond (menu) ---
  static async playBackground() {
    if (this.musicMuted) return;

    // Coupe la musique de jeu si elle tourne
    await this.pauseBackgroundGame();

    const sound = this.sounds.background;
    if (!sound) return;
    const status = await sound.getStatusAsync();
    if (status.isPlaying) return;

    await sound.setPositionAsync(0);
    await sound.setVolumeAsync(this.volume);
    await sound.playAsync();
  }

  static async pauseBackground() {
    const sound = this.sounds.background;
    if (sound) {
      const status = await sound.getStatusAsync();
      if (status.isPlaying) await sound.pauseAsync();
    }
  }

  // --- Musique de jeu ---
  static async playBackgroundGame() {
    if (this.musicMuted) return;

    // Coupe la musique du menu si elle tourne
    await this.pauseBackground();

    const sound = this.sounds.backgroundGame;
    if (!sound) return;
    const status = await sound.getStatusAsync();
    if (status.isPlaying) return;

    await sound.setPositionAsync(0);
    await sound.setVolumeAsync(this.volume);
    await sound.playAsync();
  }

  static async pauseBackgroundGame() {
    const sound = this.sounds.backgroundGame;
    if (sound) {
      const status = await sound.getStatusAsync();
      if (status.isPlaying) await sound.pauseAsync();
    }
  }

  // --- Bruitages ---
  static async playEffect(type: Exclude<SoundKey, 'background' | 'backgroundGame'>) {
    if (this.effectsMuted) return;
    const effect = new Audio.Sound();
    try {
      await effect.loadAsync(soundFiles[type]);
      await effect.setVolumeAsync(this.volume);
      await effect.playAsync();
      effect.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          effect.unloadAsync();
        }
      });
    } catch (e) {
      console.log(`Erreur lecture du son ${type}:`, e);
    }
  }

  // --- Réglages dynamiques ---
  static async setMusicMuted(muted: boolean) {
    this.musicMuted = muted;
    if (muted) {
      await this.pauseBackground();
      await this.pauseBackgroundGame();
    } else {
      await this.playBackground(); // relance la musique du menu
    }
  }

  static setEffectsMuted(muted: boolean) {
    this.effectsMuted = muted;
  }

  static async setMusicVolume(value: number) {
    this.volume = value / 100;

    const bg = this.sounds.background;
    const bgGame = this.sounds.backgroundGame;

    if (bg) await bg.setVolumeAsync(this.volume);
    if (bgGame) await bgGame.setVolumeAsync(this.volume);
  }

  // --- Nettoyage ---
  static async unloadAll() {
    for (const key in this.sounds) {
      await this.sounds[key as SoundKey]?.unloadAsync();
    }
    this.sounds = {};
  }
}

export default AudioManager;
