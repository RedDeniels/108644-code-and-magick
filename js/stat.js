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
var BAR_COLOR = 'hsl(240, r, 50%)';
var BAR_USER_COLOR = 'rgba(255, 0, 0, 1)';
var BAR_TEXT_IDENT = 8;

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

var roundingElements = function (arr) {
  for (var i = 0; i < arr.length; i++) {
    arr[i] = Math.round(arr[i]);
  }
  return arr;
};

var getMaxElement = function (Arr) {
  return Math.max.apply(null, Arr);
};

var getBarHeight = function (maxTime, maxHeight, selectedTime) {
  return (maxHeight * selectedTime) / maxTime;
};

var renderBar = function (ctx, x, y, userName, width, height, barColor, barUserColor) {
  if (userName === 'Вы') {
    ctx.fillStyle = barUserColor;
  } else {
    ctx.fillStyle = getSaturation(barColor);
  }
  ctx.fillRect(x, y, width, height);
};

var getSaturation = function (color) {
  var saturation = Math.round(Math.random() * 100);
  var arr = color.split('');
  for (var i = 0; i < color.length; i++) {
    if (color[i] === 'r') {
      arr[i] = saturation + '%';
    }
  }
  return arr.join('');
};

var getBarY = function (y, chart, height) {
  return y + (chart - height);
};

var getBarX = function (x, ident, id, width) {
  return x + ident * id + width * id;
};

var renderBarName = function (ctx, x, userName, chartY, chartHeight, font, size, color, ident) {
  ctx.fillStyle = color;
  ctx.font = size + ' ' + font;
  ctx.fillText(userName, x, chartY + chartHeight + ident);
};

var renderBarTime = function (ctx, x, y, time, lineHeight, font, size, color) {
  ctx.fillStyle = color;
  ctx.font = size + ' ' + font;
  ctx.textBaseline = 'hanging';
  ctx.fillText(time, x, y - lineHeight);
};

var checkRecord = function (names, times) {
  if (times.length > names.length) {
    for (var i = names.length; i < times.length; i++) {
      names[i] = 'unknown';
    }
  } else if (names.length > times.length) {
    for (var t = times.length; t < names.length; t++) {
      times[t] = 0;
    }
  }
};

var calculationBar = function (cloud, ident, bar) {
  return Math.floor((cloud - ident) / (bar + ident));
};

window.renderStatistics = function (ctx, names, times) {
  var chartY = getChartY(CLOUD_Y, CLOUD_TEXT_IDENT, CLOUD_TEXT_LINES.length + 1, LINE_HEIGHT);
  var amountBar = calculationBar(CLOUD_WIDTH, CHART_IDENT, BAR_WIDTH);
  checkRecord(names, times);
  renderCloud(ctx, CLOUD_X + CLOUD_SHADOW_IDENT, CLOUD_Y + CLOUD_SHADOW_IDENT, CLOUD_SHADOW_COLOR);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_COLOR);
  renderCloudText(ctx, CLOUD_X + CLOUD_TEXT_IDENT, CLOUD_Y + CLOUD_TEXT_IDENT, CLOUD_TEXT_LINES, FONT, FONT_SIZE, FONT_COLOR, LINE_HEIGHT);
  roundingElements(times);

  for (var i = 0; i < amountBar; i++) {
    var barX = getBarX(CLOUD_X + CHART_IDENT, CHART_IDENT, i, BAR_WIDTH);
    var barHeight = getBarHeight(getMaxElement(times), CHART_HEIGHT, times[i]);
    var barY = getBarY(chartY, CHART_HEIGHT, barHeight);
    renderBar(ctx, barX, barY, names[i], BAR_WIDTH, barHeight, BAR_COLOR, BAR_USER_COLOR);
    renderBarName(ctx, barX, names[i], chartY, CHART_HEIGHT, FONT, FONT_SIZE, FONT_COLOR, BAR_TEXT_IDENT);
    renderBarTime(ctx, barX, barY, times[i], LINE_HEIGHT, FONT, FONT_SIZE, FONT_COLOR);
  }
};
