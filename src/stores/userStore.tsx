import { atom } from 'jotai';
import { useSetAtom } from 'jotai';
import { useCallback } from 'react';
import { BackgroundMode } from '@/../types/BackgroundMode';
import { phaserGame } from '@/components/PhaserGame';
import bootstrap from '@/scenes/bootstrap';

// User State
export const userBackgroundModeAtom = atom(getInitialBackgroundMode());
export const userSessionIdAtom = atom('');
export const userVideoConnectedAtom = atom(false);
export const userLoggedInAtom = atom(false);
export const userPlayerNameMapAtom = atom(new Map<string, string>());
export const userShowJoystickAtom = atom(window.innerWidth < 650);

// Utility function for initial background mode
type BackgroundModeType = BackgroundMode.DAY | BackgroundMode.NIGHT;
function getInitialBackgroundMode(): BackgroundModeType {
  const currentHour = new Date().getHours();
  return currentHour > 6 && currentHour <= 18 ? BackgroundMode.DAY : BackgroundMode.NIGHT;
}

// Actions - Jotai style replacements for the reducers
export function useToggleBackgroundMode() {
  const setBackgroundMode = useSetAtom(userBackgroundModeAtom);
  return useCallback(() => {
    setBackgroundMode((prevMode) => {
      const newMode = prevMode === BackgroundMode.DAY ? BackgroundMode.NIGHT : BackgroundMode.DAY;
      if (phaserGame) {
        const bootstrapScene = phaserGame.scene.keys.bootstrap as bootstrap;
        bootstrapScene.changeBackgroundMode(newMode);
      }
      return newMode;
    });
  }, [setBackgroundMode]);
}

export function useSetSessionId() {
  const setSessionId = useSetAtom(userSessionIdAtom);
  return useCallback((sessionId: string) => {
    setSessionId(sessionId);
  }, [setSessionId]);
}

export function useSetVideoConnected() {
  const setVideoConnected = useSetAtom(userVideoConnectedAtom);
  return useCallback((connected: boolean) => {
    setVideoConnected(connected);
  }, [setVideoConnected]);
}

export function useSetLoggedIn() {
  const setLoggedIn = useSetAtom(userLoggedInAtom);
  return useCallback((loggedIn: boolean) => {
    setLoggedIn(loggedIn);
  }, [setLoggedIn]);
}

export function useSetPlayerNameMap() {
  const setPlayerNameMap = useSetAtom(userPlayerNameMapAtom);
  return useCallback(({ id, name }: { id: string; name: string }) => {
    setPlayerNameMap((prevMap) => {
      const updatedMap = new Map(prevMap);
      updatedMap.set(sanitizeId(id), name);
      return updatedMap;
    });
  }, [setPlayerNameMap]);
}

export function useRemovePlayerNameMap() {
  const setPlayerNameMap = useSetAtom(userPlayerNameMapAtom);
  return useCallback((id: string) => {
    setPlayerNameMap((prevMap) => {
      const updatedMap = new Map(prevMap);
      updatedMap.delete(sanitizeId(id));
      return updatedMap;
    });
  }, [setPlayerNameMap]);
}

export function useSetShowJoystick() {
  const setShowJoystick = useSetAtom(userShowJoystickAtom);
  return useCallback((show: boolean) => {
    setShowJoystick(show);
  }, [setShowJoystick]);
}

// Helper function to sanitize ID
function sanitizeId(id: string): string {
  return id.replace(/[^\w]/g, ''); // 간단한 ID 정리 로직
}