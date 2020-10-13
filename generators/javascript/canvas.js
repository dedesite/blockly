'use strict';

goog.provide('Blockly.JavaScript.canvas');

goog.require('Blockly.JavaScript');

function get_canvas_ctx(value_canvas) {
    return `typeof ${value_canvas} === 'string' ?
      document.getElementById(${value_canvas}).getContext("2d") :
      ${value_canvas}.getContext("2d");`;
}

Blockly.JavaScript['canvas_draw_line'] = function(block) {
  var value_canvas = Blockly.JavaScript.valueToCode(block, 'CANVAS', Blockly.JavaScript.ORDER_ATOMIC);
  var value_from_x = Blockly.JavaScript.valueToCode(block, 'FROM_X', Blockly.JavaScript.ORDER_ATOMIC);
  var value_from_y = Blockly.JavaScript.valueToCode(block, 'FROM_Y', Blockly.JavaScript.ORDER_ATOMIC);
  var value_to_x = Blockly.JavaScript.valueToCode(block, 'TO_X', Blockly.JavaScript.ORDER_ATOMIC);
  var value_to_y = Blockly.JavaScript.valueToCode(block, 'TO_Y', Blockly.JavaScript.ORDER_ATOMIC);

  var code = `var ctx = ${get_canvas_ctx(value_canvas)}
      ctx.beginPath();
      ctx.moveTo(${value_from_x}, ${value_from_y});
      ctx.lineTo(${value_to_x}, ${value_to_y});
      ctx.stroke();
      ctx.closePath();
`;
  return code;
};

Blockly.JavaScript['canvas_draw_rectangle'] = function(block) {
  var value_canvas = Blockly.JavaScript.valueToCode(block, 'CANVAS', Blockly.JavaScript.ORDER_ATOMIC);
  var value_pos_x = Blockly.JavaScript.valueToCode(block, 'POS_X', Blockly.JavaScript.ORDER_ATOMIC);
  var value_pos_y = Blockly.JavaScript.valueToCode(block, 'POS_Y', Blockly.JavaScript.ORDER_ATOMIC);
  var value_width = Blockly.JavaScript.valueToCode(block, 'WIDTH', Blockly.JavaScript.ORDER_ATOMIC);
  var value_height = Blockly.JavaScript.valueToCode(block, 'HEIGHT', Blockly.JavaScript.ORDER_ATOMIC);

  var code = `var ctx = ${get_canvas_ctx(value_canvas)}
      ctx.strokeRect(${value_pos_x}, ${value_pos_y}, ${value_width}, ${value_height});
`;
  return code;
};

Blockly.JavaScript['canvas_draw_circle'] = function(block) {
  var value_canvas = Blockly.JavaScript.valueToCode(block, 'CANVAS', Blockly.JavaScript.ORDER_ATOMIC);
  var value_center_x = Blockly.JavaScript.valueToCode(block, 'CENTER_X', Blockly.JavaScript.ORDER_ATOMIC);
  var value_center_y = Blockly.JavaScript.valueToCode(block, 'CENTER_Y', Blockly.JavaScript.ORDER_ATOMIC);
  var value_radius = Blockly.JavaScript.valueToCode(block, 'RADIUS', Blockly.JavaScript.ORDER_ATOMIC);

  var code = `var ctx = ${get_canvas_ctx(value_canvas)}
      ctx.beginPath();
      ctx.arc(${value_center_x}, ${value_center_y}, ${value_radius}, 0, Math.PI * 2.0);
      ctx.stroke();
      ctx.closePath();
`;
  return code;
};

Blockly.JavaScript['canvas_pencil_start'] = function(block) {
  var value_canvas = Blockly.JavaScript.valueToCode(block, 'CANVAS', Blockly.JavaScript.ORDER_ATOMIC);
  var value_pos_x = Blockly.JavaScript.valueToCode(block, 'POS_X', Blockly.JavaScript.ORDER_ATOMIC);
  var value_pos_y = Blockly.JavaScript.valueToCode(block, 'POS_Y', Blockly.JavaScript.ORDER_ATOMIC);

  var code = `var ctx = ${get_canvas_ctx(value_canvas)}
      ctx.beginPath();
      ctx.moveTo(${value_pos_x}, ${value_pos_y});
`;
  return code;
};

Blockly.JavaScript['canvas_pencil_move'] = function(block) {
  var value_canvas = Blockly.JavaScript.valueToCode(block, 'CANVAS', Blockly.JavaScript.ORDER_ATOMIC);
  var value_pos_x = Blockly.JavaScript.valueToCode(block, 'POS_X', Blockly.JavaScript.ORDER_ATOMIC);
  var value_pos_y = Blockly.JavaScript.valueToCode(block, 'POS_Y', Blockly.JavaScript.ORDER_ATOMIC);

  var code = `var ctx = ${get_canvas_ctx(value_canvas)}
      ctx.lineTo(${value_pos_x}, ${value_pos_y});
      ctx.stroke();
`;
  return code;
};

Blockly.JavaScript['canvas_pencil_stop'] = function(block) {
  var value_canvas = Blockly.JavaScript.valueToCode(block, 'CANVAS', Blockly.JavaScript.ORDER_ATOMIC);

  var code = `var ctx = ${get_canvas_ctx(value_canvas)}
      ctx.closePath();
`;
  return code;
};

Blockly.JavaScript['canvas_drawing_mode'] = function(block) {
  var value_canvas = Blockly.JavaScript.valueToCode(block, 'CANVAS', Blockly.JavaScript.ORDER_ATOMIC);
  var dropdown_drawing_mode = block.getFieldValue('DRAWING_MODE');

  var code = `var ctx = ${get_canvas_ctx(value_canvas)}
      ctx.globalCompositeOperation = '${dropdown_drawing_mode}';
`;
  return code;
};

Blockly.JavaScript['canvas_set_stroke_color'] = function(block) {
  var value_canvas = Blockly.JavaScript.valueToCode(block, 'CANVAS', Blockly.JavaScript.ORDER_ATOMIC);
  var value_color = Blockly.JavaScript.valueToCode(block, 'COLOR', Blockly.JavaScript.ORDER_ATOMIC);

  var code = `var ctx = ${get_canvas_ctx(value_canvas)}
      ctx.strokeStyle = ${value_color};
`;
  return code;
};

Blockly.JavaScript['canvas_set_line_width'] = function(block) {
  var value_canvas = Blockly.JavaScript.valueToCode(block, 'CANVAS', Blockly.JavaScript.ORDER_ATOMIC);
  var value_line_width = Blockly.JavaScript.valueToCode(block, 'LINE_WIDTH', Blockly.JavaScript.ORDER_ATOMIC);

  var code = `var ctx = ${get_canvas_ctx(value_canvas)}
      ctx.lineWidth = ${value_line_width};
`;
  return code;
};

Blockly.JavaScript['canvas_get_mouse_pos'] = function(block) {
  var value_canvas = Blockly.JavaScript.valueToCode(block, 'CANVAS', Blockly.JavaScript.ORDER_ATOMIC);
  var value_event = Blockly.JavaScript.valueToCode(block, 'EVENT', Blockly.JavaScript.ORDER_ATOMIC);
  var variable_pos_x = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('POS_X'), Blockly.Variables.NAME_TYPE);
  var variable_pos_y = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('POS_Y'), Blockly.Variables.NAME_TYPE);

  var code = `
    var rect = (typeof ${value_canvas} === 'string' ?
      document.getElementById(${value_canvas}).getBoundingClientRect() :
      ${value_canvas}.getBoundingClientRect());
    ${variable_pos_x} = parseInt(${value_event}.clientX) - parseInt(rect.left);
    ${variable_pos_y} = parseInt(${value_event}.clientY) - parseInt(rect.top);
  `;
  return code;
};