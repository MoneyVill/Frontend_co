import Peer, { MediaConnection } from 'peerjs'
import { atom } from 'jotai';
import { useSetAtom } from 'jotai';
import { useCallback } from 'react';
import { sanitizeId } from '@/utils/util'
import { phaserGame } from '@/components/PhaserGame';
import launcher from '@/scenes/launcher'
// import ShareScreenManager from '../web/ShareScreenManager'

// Computer State
export const computerDialogOpenAtom = atom(false);
export const computerIdAtom = atom<string | null>(null);
export const myStreamAtom = atom<MediaStream | null>(null);
export const peerStreamsAtom = atom(new Map<string, { stream: MediaStream; call: MediaConnection }>());
// export const shareScreenManagerAtom = atom<ShareScreenManager | null>(null);

// Computer Actions
export function useOpenComputerDialog() {
    const setComputerDialogOpen = useSetAtom(computerDialogOpenAtom);
    const setComputerId = useSetAtom(computerIdAtom);
    // const setShareScreenManager = useSetAtom(shareScreenManagerAtom);
  
    return useCallback(({ computerId, myUserId }: { computerId: string; myUserId: string }) => {
      // setShareScreenManager((prevManager) => {
      //   if (!prevManager) {
      //     return new ShareScreenManager(myUserId);
      //   }
      //   return prevManager;
      // });
      if (phaserGame) {
        const game = phaserGame.scene.keys.game as launcher;
        game.disableKeys();
      }
      setComputerDialogOpen(true);
      setComputerId(computerId);
    }, [setComputerDialogOpen, setComputerId]);
    // }, [setComputerDialogOpen, setComputerId, setShareScreenManager]);
}

export function useCloseComputerDialog() {
    const setComputerDialogOpen = useSetAtom(computerDialogOpenAtom);
    const setComputerId = useSetAtom(computerIdAtom);
    const setMyStream = useSetAtom(myStreamAtom);
    const setPeerStreams = useSetAtom(peerStreamsAtom);
    // const setShareScreenManager = useSetAtom(shareScreenManagerAtom);

    return useCallback(() => {
        if (phaserGame) {
            const game = phaserGame.scene.keys.game as launcher;
            game.enableKeys();
            // game.network.disconnectFromComputer(setComputerId);
            setPeerStreams((peerStreams) => {
                peerStreams.forEach(({ call }) => call.close());
                return new Map();
            });
            // setShareScreenManager((manager) => {
            // manager?.onClose();
            // return null;
            // });
        }
        setComputerDialogOpen(false);
        setMyStream(null);
        setComputerId(null);
    }, [setComputerDialogOpen, setComputerId, setMyStream, setPeerStreams]);
    // }, [setComputerDialogOpen, setComputerId, setMyStream, setPeerStreams, setShareScreenManager]);
}

export function useSetMyStream() {
    const setMyStream = useSetAtom(myStreamAtom);
    return useCallback((stream: MediaStream | null) => {
      setMyStream(stream);
    }, [setMyStream]);
}
  
export function useAddVideoStream() {
    const setPeerStreams = useSetAtom(peerStreamsAtom);
    return useCallback(({ id, call, stream }: { id: string; call: MediaConnection; stream: MediaStream }) => {
        setPeerStreams((prevStreams) => {
        const updatedStreams = new Map(prevStreams);
        updatedStreams.set(sanitizeId(id), { call, stream });
        return updatedStreams;
        });
    }, [setPeerStreams]);
}

export function useRemoveVideoStream() {
    const setPeerStreams = useSetAtom(peerStreamsAtom);
    return useCallback((id: string) => {
        setPeerStreams((prevStreams) => {
        const updatedStreams = new Map(prevStreams);
        updatedStreams.delete(sanitizeId(id));
        return updatedStreams;
        });
    }, [setPeerStreams]);
}