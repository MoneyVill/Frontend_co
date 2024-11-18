// /pages/api/phasergame.tsx
import React, { useEffect, useState } from 'react';
import { Game as GameType } from 'phaser';

let phaserGame: GameType | null = null;

const PhaserGame = () => {
  const isDevelopment = process?.env?.NODE_ENV !== 'production';
  const [game, setGame] = useState<GameType>();

  useEffect(() => {
    async function initPhaser() {
      const Phaser = await import('phaser');
      const { default: background } = await import('@/scenes/background');
      const { default: bootstrap } = await import('@/scenes/bootstrap');
      const { default: launcher } = await import('@/scenes/launcher');

      if (!phaserGame) {
        phaserGame = new Phaser.Game({
          type: Phaser.AUTO,
          title: 'townwill',
          parent: 'phaser-container',
          backgroundColor: '#93cbee',
          pixelArt: true,
          scale: {
            mode: Phaser.Scale.ScaleModes.RESIZE,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            width: window.innerWidth,
            height: window.innerHeight,
          },
          physics: {
            default: 'arcade',
            arcade: {
              gravity: { x: 0, y: 0 },
              debug: false,
            },
          },
          autoFocus: true,
          scene: [bootstrap, background, launcher],
        });

        setGame(phaserGame);
      }
    }

    initPhaser();
  }, []); // 빈 의존성 배열을 통해 컴포넌트가 마운트될 때 한 번만 실행

  return <div id="phaser-container" style={{ width: '100%', height: '100%' }}></div>;
};

export { phaserGame };
export default PhaserGame;
