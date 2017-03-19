var TopDownGame = TopDownGame || {};

TopDownGame.Boot = function() {};

TopDownGame.Boot.prototype = {
    preload: function() {
        this.load.image('preloadbar', 'assets/images/preloader-bar.png');
    },
    create: function() {
        this.game.world.setBounds(0, 0, 200, 200);
        this.game.stage.backgroundColor = '#fff';

        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;

        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.state.start('Preload');
    }
};