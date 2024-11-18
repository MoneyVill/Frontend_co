import { atom } from 'jotai';
import { useSetAtom } from 'jotai';
import { useCallback } from 'react';
import { IChatMessage} from '@/../types/IOfficeState';

export enum MessageType {
  PLAYER_JOINED,
  PLAYER_LEFT,
  REGULAR_MESSAGE,
}

// Chat State
export const chatMessagesAtom = atom<{ messageType: MessageType; chatMessage: IChatMessage }[]>([]);
export const chatFocusedAtom = atom(false);
export const chatShowAtom = atom(true);

// Chat Actions
export function usePushChatMessage() {
  const setChatMessages = useSetAtom(chatMessagesAtom);
  return useCallback((message: IChatMessage) => {
    setChatMessages((prevMessages) => [
      ...prevMessages,
      { messageType: MessageType.REGULAR_MESSAGE, chatMessage: message },
    ]);
  }, [setChatMessages]);
}

// export function usePushPlayerJoinedMessage() {
//   const setChatMessages = useSetAtom(chatMessagesAtom);
//   return useCallback((author: string) => {
//     setChatMessages((prevMessages) => [
//       ...prevMessages,
//       {
//         messageType: MessageType.PLAYER_JOINED,
//         chatMessage: {
//           createdAt: new Date().getTime(),
//           author,
//           content: 'joined the lobby',
//         },
//       },
//     ]);
//   }, [setChatMessages]);
// }

// export function usePushPlayerLeftMessage() {
//   const setChatMessages = useSetAtom(chatMessagesAtom);
//   return useCallback((author: string) => {
//     setChatMessages((prevMessages) => [
//       ...prevMessages,
//       {
//         messageType: MessageType.PLAYER_LEFT,
//         chatMessage: {
//           createdAt: new Date().getTime(),
//           author,
//           content: 'left the lobby',
//         },
//       },
//     ]);
//   }, [setChatMessages]);
// }

export function useSetFocused() {
  const setChatFocused = useSetAtom(chatFocusedAtom);
  return useCallback((focused: boolean) => {
    setChatFocused(focused);
    // If needed, interact with Phaser to enable or disable game keys.
  }, [setChatFocused]);
}

export function useSetShowChat() {
  const setShowChat = useSetAtom(chatShowAtom);
  return useCallback((show: boolean) => {
    setShowChat(show);
  }, [setShowChat]);
}