import { Howl } from 'howler';

export function useSoundEffect(src: string) {
  const sound = new Howl({
    src: [src],
    volume: 0.5,
  });

  const play = () => {
    sound.play();
  };

  const stop = () => {
    sound.stop();
  };

  return {
    play,
    stop,
  };
}
