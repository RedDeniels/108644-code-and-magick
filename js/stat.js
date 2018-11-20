'use strict';

var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_COLOR = 'rgba(255, 255, 255, 1)';
var CLOUD_SHADOW_IDENT = 10;
var CLOUD_SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
var CLOUD_TEXT_IDENT = 20;
var CLOUD_TEXT_LINES = [
  'Ура вы победили!',
  'Список результатов:'
];
var FONT = 'PT Mono';
var FONT_SIZE = '16px';
var FONT_COLOR = '#000';
var LINE_HEIGHT = 21;
var CHART_HEIGHT = 150;
var CHART_IDENT = 50;
var BAR_WIDTH = 40;
var BAR_COLOR = 'rgba(0, 0, 255, 1)';
var BAR_USER_COLOR = 'rgba(255, 0, 0, 1)';
var BAR_TEXT_IDENT = 5;

var getChartY = function (cloudY, textIdent, amountLines, line) {
  return cloudY + textIdent + amountLines * line;
};

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

var roundElements = function (Arr) {
  for (var i = 0; i < Arr.length; i++) {
    Arr[i] = Math.round(Arr[i]);
  }
  return Arr;
};


window.renderStatistics = function (ctx, names, times) {
  var ChartY = getChartY(CLOUD_Y, CLOUD_TEXT_IDENT, CLOUD_TEXT_LINES.length + 1, LINE_HEIGHT);
  renderCloud(ctx, CLOUD_X + CLOUD_SHADOW_IDENT, CLOUD_Y + CLOUD_SHADOW_IDENT, CLOUD_SHADOW_COLOR);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_COLOR);
  renderCloudText(ctx, CLOUD_X + CLOUD_TEXT_IDENT, CLOUD_Y + CLOUD_TEXT_IDENT, CLOUD_TEXT_LINES, FONT, FONT_SIZE, FONT_COLOR, LINE_HEIGHT);
  roundElements(times);


};
