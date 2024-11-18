import { atom } from 'jotai';
import { useSetAtom } from 'jotai';
import { useCallback } from 'react';
import { RoomAvailable } from 'colyseus.js'
import { RoomType } from '@/../types/Rooms'

/**
 * Colyseus' real time room list always includes the public lobby so we have to remove it manually.
 */
const isCustomRoom = (room: RoomAvailable) => {
    return room.name === RoomType.CUSTOM;
};

// Room State
export const roomLobbyJoinedAtom = atom(false);
export const roomRoomJoinedAtom = atom(false);
export const roomIdAtom = atom('');
export const roomNameAtom = atom('');
export const roomDescriptionAtom = atom('');
export const roomAvailableRoomsAtom = atom<RoomAvailable[]>([]);
  
// Room Actions
export function useSetLobbyJoined() {
    const setLobbyJoined = useSetAtom(roomLobbyJoinedAtom);
    return useCallback((lobbyJoined: boolean) => {
        setLobbyJoined(lobbyJoined);
    }, [setLobbyJoined]);
}

export function useSetRoomJoined() {
    const setRoomJoined = useSetAtom(roomRoomJoinedAtom);
    return useCallback((roomJoined: boolean) => {
        setRoomJoined(roomJoined);
    }, [setRoomJoined]);
}

export function useSetJoinedRoomData() {
    const setRoomId = useSetAtom(roomIdAtom);
    const setRoomName = useSetAtom(roomNameAtom);
    const setRoomDescription = useSetAtom(roomDescriptionAtom);
    return useCallback(({ id, name, description }: { id: string; name: string; description: string }) => {
        setRoomId(id);
        setRoomName(name);
        setRoomDescription(description);
    }, [setRoomId, setRoomName, setRoomDescription]);
}

export function useSetAvailableRooms() {
    const setAvailableRooms = useSetAtom(roomAvailableRoomsAtom);
    return useCallback((rooms: RoomAvailable[]) => {
        setAvailableRooms(rooms.filter((room) => isCustomRoom(room)));
    }, [setAvailableRooms]);
}

export function useAddAvailableRooms() {
    const setAvailableRooms = useSetAtom(roomAvailableRoomsAtom);
    return useCallback(({ roomId, room }: { roomId: string; room: RoomAvailable }) => {
        if (!isCustomRoom(room)) return;

        setAvailableRooms((prevRooms) => {
        const roomIndex = prevRooms.findIndex((r) => r.roomId === roomId);
        if (roomIndex !== -1) {
            const updatedRooms = [...prevRooms];
            updatedRooms[roomIndex] = room;
            return updatedRooms;
        } else {
            return [...prevRooms, room];
        }
        });
    }, [setAvailableRooms]);
}

export function useRemoveAvailableRooms() {
    const setAvailableRooms = useSetAtom(roomAvailableRoomsAtom);
    return useCallback((roomId: string) => {
        setAvailableRooms((prevRooms) => prevRooms.filter((room) => room.roomId !== roomId));
    }, [setAvailableRooms]);
}