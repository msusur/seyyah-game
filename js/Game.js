var TopDownGame = TopDownGame || {};

TopDownGame.Game = function() {};

TopDownGame.Game.prototype = {
    create: function() {
        this.map = this.game.add.tilemap('game-level2');

        // this.map.addTilesetImage('tiles', 'gameTiles');
        this.map.addTilesetImage('indoor-tiles', 'indoorTiles');

        // create layer
        this.base = this.map.createLayer('base');
        //this.lake = this.map.createLayer('lake');
        this.obstacles = this.map.createLayer('obstacles');

        // set collision
        // this.map.setCollisionBetween(1, 200, true, 'lake');
        this.map.setCollisionBetween(1, 1000, true, 'obstacles');

        this.base.resizeWorld();

        this.createPlayer();

        this.createModal();

        this.createItems();

        this.createDoors();

        // register cursors
        this.cursors = this.game.input.keyboard.createCursorKeys();
    },
    update: function() {
        // collision
        this.game.physics.arcade.collide(this.player, this.obstacles);
        // this.game.physics.arcade.collide(this.player, this.lake, this.interact);
        this.game.physics.arcade.collide(this.player, this.items, this.interact, null, this);
        this.game.physics.arcade.overlap(this.player, this.doors, this.enterDoor, null, this);

        // player movement
        const step_factor = 50;
        this.player.body.velocity.x = 0;
        this.player.frame = 0;
        if (this.cursors.up.isDown) {
            this.player.frame = 3;
            if (this.player.body.velocity.y == 0) {
                this.player.body.velocity.y -= step_factor;
            }
        } else if (this.cursors.down.isDown) {
            if (this.player.body.velocity.y == 0) {
                this.player.body.velocity.y += step_factor;
            }
        } else {
            this.player.body.velocity.y = 0;
        }
        if (this.cursors.left.isDown) {
            this.player.body.velocity.x -= step_factor;
            this.player.frame = 5;
        } else if (this.cursors.right.isDown) {
            this.player.body.velocity.x += step_factor;
            this.player.frame = 1;
        }
    },
    interact: function(player, collectable) {
        var item = collectable.key;
        if (item === 'computer') {
            this.showModal('code-window');
        }
    },
    createItems: function() {
        this.items = this.game.add.group();
        this.items.enableBody = true;
        var item;
        var result = this.findObjectsByType('item', this.map, 'objectsLayer');
        result.forEach(function(element) {
            this.createFromTiledObject(element, this.items);
        }, this);
    },
    createDoors: function() {
        this.doors = this.game.add.group();
        this.doors.enableBody = true;

        var item;
        var result = this.findObjectsByType('door', this.map, 'objectsLayer');
        result.forEach(function(element) {
            this.createFromTiledObject(element, this.doors);
        }, this);
    },
    enterDoor: function(player, door) {
        debugger;
        var x, y;
        if (door.open) {
            x = door.enterX
            y = door.enterY;
        } else {
            x = door.targetX;
            y = door.targetY;
            door.open = true;
        }
        this.player.position.y = y;
        this.player.position.x = x;
        // player.x = x;
        // player.y = y;
    },
    createFromTiledObject: function(element, group) {
        var sprite = group.create(element.x, element.y, element.properties.sprite);

        if (sprite.body) {
            sprite.body.moves = false;
        }

        // Copy all properties to the sprite
        Object.keys(element.properties).forEach(function(key) {
            sprite[key] = element.properties[key];
        });
    },
    createModal: function() {
        // Modals to display.
        this.modal = new gameModal(this.game);
        this.modal.createModal({
            type: "code-window",
            includeBackground: true,
            backgroundColor: "0x191d19",
            backgroundOpacity: 1,
            modalCloseOnInput: true,
            fixedToCamera: true,
            itemsArr: [{
                    type: "text",
                    content: "Find the bug! (Click anywhere to close)",
                    fontFamily: "bitmapText",
                    fontSize: 12,
                    color: "0x6BD271",
                    offsetY: -120
                },
                {
                    type: "text",
                    align: "left",
                    content: "var list = new List { \"fish\", \"and\", \"chips\" };\r\n" +
                        "for (int i = 0; i < list.Count; i++) {   \r\n\t list.Add(list[i].ToUpper()); \r\n}",
                    fontFamily: "bitmapText",
                    fontSize: 12,
                    color: "0x6BD271",
                    offsetY: -50
                }
            ]
        });
    },
    showModal: function(modal) {
        this.modal.showModal(modal);
    },
    createPlayer: function() {
        var result = this.findObjectsByType('playerStart', this.map, 'objectsLayer');
        this.player = this.game.add.sprite(result[0].x, result[0].y, 'player-all');

        this.game.physics.arcade.enable(this.player);
        this.game.camera.follow(this.player);
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
};