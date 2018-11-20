'use strict';

var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_COLOR = 'rgba(255, 255, 255, 1)';
var CLOUD_SHADOW_IDENT = 10;
var CLOUD_SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
var CLOUD_IDENT = 20;
var CLOUD_TEXT_LINES = [
  'Ура вы победили!',
  'Список результатов:'
];
var FONT = 'PT Mono';
var FONT_SIZE = '16px';
var FONT_COLOR = '#000';
var LINE_HEIGHT = 21;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderCloudText = function (ctx, x, y, textLines, font, size, color, lineHeight) {
  ctx.fillStyle = color;
  ctx.font = size + ' ' + font;
  ctx.textBaseline = 'hanging';
  for (var i = 0; i < textLines.length; i++) {
    ctx.fillText(textLines[i], x, y + lineHeight * i);
  }
};

window.renderStatistics = function (ctx) {
  renderCloud(ctx, CLOUD_X + CLOUD_SHADOW_IDENT, CLOUD_Y + CLOUD_SHADOW_IDENT, CLOUD_SHADOW_COLOR);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_COLOR);
  renderCloudText(ctx, CLOUD_X + CLOUD_IDENT, CLOUD_Y + CLOUD_IDENT, CLOUD_TEXT_LINES, FONT, FONT_SIZE, FONT_COLOR, LINE_HEIGHT);
};
