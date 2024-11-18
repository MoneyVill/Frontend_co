// stores/index.ts -> stores/store.ts (Jotai)
import { atom } from 'jotai';
import { useSetAtom } from 'jotai';
import { useCallback } from 'react';
import { phaserGame } from '@/components/PhaserGame';
import launcher from '@/scenes/launcher';

// Whiteboard State
export const whiteboardDialogOpenAtom = atom(false);
export const whiteboardIdAtom = atom<string | null>(null);
export const whiteboardUrlAtom = atom<string | null>(null);
export const whiteboardUrlsAtom = atom(new Map<string, string>());


// Whiteboard Actions
export function useOpenWhiteboardDialog() {
    const setWhiteboardDialogOpen = useSetAtom(whiteboardDialogOpenAtom);
    const setWhiteboardId = useSetAtom(whiteboardIdAtom);
    const setWhiteboardUrl = useSetAtom(whiteboardUrlAtom);
    const whiteboardUrls = useSetAtom(whiteboardUrlsAtom);
  
    return useCallback((whiteboardId: string) => {
      setWhiteboardDialogOpen(true);
      setWhiteboardId(whiteboardId);
  
    //   setWhiteboardUrl((prevUrls) => {
    //     const url = prevUrls.get(whiteboardId);
    //     if (url) {
    //       return url;
    //     }
    //     return null;
    //   });
      if (phaserGame) {
        const game = phaserGame.scene.keys.game as launcher;
        game.disableKeys();
      }
    }, [setWhiteboardDialogOpen, setWhiteboardId, setWhiteboardUrl, whiteboardUrls]);
  }
  
  export function useCloseWhiteboardDialog() {
    const setWhiteboardDialogOpen = useSetAtom(whiteboardDialogOpenAtom);
    const setWhiteboardId = useSetAtom(whiteboardIdAtom);
    const setWhiteboardUrl = useSetAtom(whiteboardUrlAtom);
  
    return useCallback(() => {
        if (phaserGame) {
            const game = phaserGame.scene.keys.game as launcher;
            game.enableKeys();
            // game.network.disconnectFromWhiteboard(setWhiteboardId);
        }

        setWhiteboardDialogOpen(false);
        setWhiteboardId(null);
        setWhiteboardUrl(null);
    }, [setWhiteboardDialogOpen, setWhiteboardId, setWhiteboardUrl]);
  }
  
  export function useSetWhiteboardUrls() {
    const setWhiteboardUrls = useSetAtom(whiteboardUrlsAtom);
    return useCallback(({ whiteboardId, roomId }: { whiteboardId: string; roomId: string }) => {
      setWhiteboardUrls((prevUrls) => {
        const updatedUrls = new Map(prevUrls);
        updatedUrls.set(whiteboardId, `https://wbo.ophir.dev/boards/sky-office-${roomId}`);
        return updatedUrls;
      });
    }, [setWhiteboardUrls]);
  }