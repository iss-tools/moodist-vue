import { onKeyStroke } from '@vueuse/core';

export function useShortcuts(callbacks: Record<string, () => void>) {
  // Map React-style hotkeys to VueUse onKeyStroke
  
  onKeyStroke(['p', 'P'], (e) => {
    if (e.shiftKey && !e.altKey) {
      e.preventDefault();
      callbacks.pomodoro?.();
    } else if (e.shiftKey && e.altKey) {
      e.preventDefault();
      callbacks.presets?.();
    }
  });

  onKeyStroke(['n', 'N'], (e) => {
    if (e.shiftKey) {
      e.preventDefault();
      callbacks.notepad?.();
    }
  });

  onKeyStroke(['m', 'M'], (e) => {
    if (e.shiftKey) {
      e.preventDefault();
      callbacks.menu?.();
    }
  });

  onKeyStroke(['s', 'S'], (e) => {
    if (e.shiftKey && !e.altKey) {
      e.preventDefault();
      callbacks.share?.();
    }
  });

  onKeyStroke(['t', 'T'], (e) => {
    if (e.shiftKey && !e.altKey) {
      e.preventDefault();
      callbacks.todo?.();
    } else if (e.shiftKey && e.altKey) {
      e.preventDefault();
      callbacks.sleepTimer?.();
    }
  });

  onKeyStroke(['c', 'C'], (e) => {
    if (e.shiftKey) {
      e.preventDefault();
      callbacks.countdown?.();
    }
  });

  onKeyStroke(['b', 'B'], (e) => {
    if (e.shiftKey) {
      e.preventDefault();
      callbacks.breathing?.();
    }
  });

  onKeyStroke(['h', 'H'], (e) => {
    if (e.shiftKey) {
      e.preventDefault();
      callbacks.shortcuts?.();
    }
  });

  onKeyStroke([' ', 'Space'], (e) => {
    // Only toggle if not typing in an input/textarea
    if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') {
      return;
    }
    e.preventDefault();
    callbacks.togglePlay?.();
  });
}
