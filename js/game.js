var TopDownGame = TopDownGame || {};

TopDownGame.Game = function() {};

TopDownGame.Game.prototype = {
    create: function() {
        this.map = this.game.add.tilemap('game-level1');

        this.map.addTilesetImage('tiles', 'gameTiles');

        // create layer
        this.base = this.map.createLayer('base');
        this.lake = this.map.createLayer('lake');
        this.obstacles = this.map.createLayer('obstacles');

        // set collision
        this.map.setCollisionBetween(1, 200, true, 'lake');
        this.map.setCollisionBetween(1, 200, true, 'obstacles');

        this.base.resizeWorld();

        // create player
        var result = this.findObjectsByType('playerStart', this.map, 'objectsLayer')
        this.player = this.game.add.sprite(result[0].x, result[0].y, 'player');
        this.game.physics.arcade.enable(this.player);
        this.game.camera.follow(this.player);

        // register cursors
        this.cursors = this.game.input.keyboard.createCursorKeys();
    },
    update: function() {
        // collision
        this.game.physics.arcade.collide(this.player, this.blockedLayer);
        // this.game.physics.arcade.overlap(this.player, this.items, this.collect, null, this);
        // this.game.physics.arcade.overlap(this.player, this.doors, this.enterDoor, null, this);

        // player movement
        this.player.body.velocity.x = 0;

        if (this.cursors.up.isDown) {
            if (this.player.body.velocity.y == 0)
                this.player.body.velocity.y -= 50;
        } else if (this.cursors.down.isDown) {
            if (this.player.body.velocity.y == 0)
                this.player.body.velocity.y += 50;
        } else {
            this.player.body.velocity.y = 0;
        }
        if (this.cursors.left.isDown) {
            this.player.body.velocity.x -= 50;
        } else if (this.cursors.right.isDown) {
            this.player.body.velocity.x += 50;
        }
    },
    findObjectsByType: function(type, map, layer) {
        var result = new Array();
        map.objects[layer].forEach(function(element) {
            if (element.properties.type === type) {
                element.y -= map.tileHeight;
                result.push(element);
            }
        });
        return result;
    }
}