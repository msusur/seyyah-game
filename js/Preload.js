var TopDownGame = TopDownGame || {};

TopDownGame.Preload = function() {};

TopDownGame.Preload.prototype = {
    preload: function() {
        this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadbar');
        this.preloadBar.anchor.setTo(0.5);

        this.load.setPreloadSprite(this.preloadBar);

        // Game assets
        this.load.tilemap('game-level1', 'assets/tilemaps/game-level1.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('gameTiles', 'assets/images/tiles.png');

        // Game items
        this.load.image('computer', 'assets/images/computer.png');

        // Modals
        this.load.image('terminal-background', 'assets/images/terminal-background.png');

        // Player sprites
        this.load.spritesheet('player-all', 'assets/images/player-sprite.png', 16, 16);
    },
    create: function() {
        this.state.start('Game');
    }
};