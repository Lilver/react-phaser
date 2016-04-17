'use strict';

var treeUtils = require('../../tree-utils'),
    graphicsPropertes = require('../../properties/base/Phaser.Graphics'),

    updateGraphics = treeUtils.genPropertyMapUpdate(graphicsPropertes),

    itemTypes = require('./renderers'),

    initGraphics = function (node, tree) {
        node.obj = new Phaser.Graphics(treeUtils.game(tree), 0, 0);
        updateGraphics(node, null, tree);
    },

    killGraphics = function (node) {
        node.obj.kill();
    },

    onChildrenInit = function (node, tree) {
        draw(node, tree);

        var game = treeUtils.game(tree),
            texture = new Phaser.RenderTexture(game, node.obj.width, node.obj.height);

        texture.renderXY(node.obj, 0, 0);
        texture.destroy();
        node.obj.destroy();

        game.cache.addRenderTexture(node.props.assetKey, texture);

    },

    draw = function (node, tree) {
        for (var i = 0; i < node.children.length; i++) {
            var child = tree.nodes[node.children[i]];
            if (itemTypes[child.tag]) {
                itemTypes[child.tag].draw(child, tree, node.obj, 0, 0);
            }
        }
    };

module.exports = {
    init: initGraphics,
    onChildrenInit: onChildrenInit,
    kill: killGraphics,
    update: updateGraphics
};

