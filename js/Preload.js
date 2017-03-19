var TopDownGame = TopDownGame || {};

TopDownGame.Preload = function() {};

TopDownGame.Preload.prototype = {
    preload: function() {
        this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadbar');
        this.preloadBar.anchor.setTo(0.5);

        this.load.setPreloadSprite(this.preloadBar);

        this.load.tilemap('game-level1', 'assets/tilemaps/game-level1.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('gameTiles', 'assets/images/tiles.png');
        this.load.image('player', 'assets/images/player.png');
    },
    create: function() {
        this.state.start('Game');
    }
};