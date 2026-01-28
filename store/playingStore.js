import { create } from "zustand";
import { Audio } from "expo-av";

const formatTime = (ms = 0) => {
  const total = Math.floor((ms || 0) / 1000);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${s < 10 ? "0" : ""}${s}`;
};

export const usePlayingStore = create((set, get) => ({
  queue: [],
  currentTrack: null,
  isLoaded: false,
  isPlaying: false,
  positionMillis: 0,
  durationMillis: 0,
  error: null,

  _sound: null,

  progress: () => {
    const { positionMillis, durationMillis } = get();
    if (!durationMillis) return 0;
    return Math.min(1, positionMillis / durationMillis);
  },

  timeLabel: () => {
    const { positionMillis, durationMillis } = get();
    return `${formatTime(positionMillis)} / ${formatTime(durationMillis)}`;
  },

  playTrack: async (track, uri) => {
    try {
      const state = get();
      if (state.currentTrack?.id === track?.id && state._sound) {
        await state._sound.playAsync();
        set({ isPlaying: true, error: null });
        return;
      }

      await get().stop();

      const { sound } = await Audio.Sound.createAsync(
        { uri },
        { shouldPlay: true },
      );

      sound.setOnPlaybackStatusUpdate((status) => {
        if (!status?.isLoaded) {
          set({ isLoaded: false });
          return;
        }

        set({
          isLoaded: true,
          isPlaying: !!status.isPlaying,
          positionMillis: status.positionMillis ?? 0,
          durationMillis: status.durationMillis ?? 0,
        });

        if (status.didJustFinish) {
          sound.setPositionAsync(0);
          set({ isPlaying: false, positionMillis: 0 });
        }
      });

      set({
        _sound: sound,
        currentTrack: track,
        isLoaded: true,
        isPlaying: true,
        positionMillis: 0,
        durationMillis: 0,
        error: null,
      });
    } catch (e) {
      set({ error: e?.message ?? String(e) });
      console.log("playTrack error:", e?.message ?? e);
    }
  },

  toggle: async (track, uri) => {
    const { currentTrack, _sound, isPlaying } = get();

    if (currentTrack?.id === track?.id && _sound) {
      if (isPlaying) {
        await _sound.pauseAsync();
        set({ isPlaying: false });
      } else {
        await _sound.playAsync();
        set({ isPlaying: true });
      }
      return;
    }

    await get().playTrack(track, uri);
  },

  pause: async () => {
    const s = get()._sound;
    if (!s) return;
    await s.pauseAsync();
    set({ isPlaying: false });
  },

  resume: async () => {
    const s = get()._sound;
    if (!s) return;
    await s.playAsync();
    set({ isPlaying: true });
  },

  seekTo: async (millis) => {
    const s = get()._sound;
    if (!s) return;
    const next = Math.max(0, millis);
    await s.setPositionAsync(next);
    set({ positionMillis: next });
  },

  stop: async () => {
    const s = get()._sound;

    if (s) {
      try {
        await s.stopAsync();
        await s.setPositionAsync(0);
        await s.unloadAsync();
      } catch {}
    }

    set({
      _sound: null,
      currentTrack: null,
      isLoaded: false,
      isPlaying: false,
      positionMillis: 0,
      durationMillis: 0,
      error: null,
    });
  },
}));
