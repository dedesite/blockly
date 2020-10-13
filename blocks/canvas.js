'use strict';

goog.provide('Blockly.Constants.Canvas');

goog.require('Blockly');
goog.require('Blockly.Blocks');
goog.require('Blockly.FieldDropdown');
goog.require('Blockly.FieldLabel');

Blockly.defineBlocksWithJsonArray([
{
  "type": "canvas_draw_line",
  "message0": "%{BKY_CANVAS_DRAW_LINE_TITLE}",
  "args0": [
    {
      "type": "input_value",
      "name": "CANVAS"
    },
    {
      "type": "input_value",
      "name": "FROM_X",
      "check": "Number"
    },
    {
      "type": "input_value",
      "name": "FROM_Y",
      "check": "Number"
    },
    {
      "type": "input_value",
      "name": "TO_X",
      "check": "Number"
    },
    {
      "type": "input_value",
      "name": "TO_Y",
      "check": "Number"
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": "%{BKY_CANVAS_HUE}",
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "canvas_draw_rectangle",
  "message0": "%{BKY_CANVAS_DRAW_RECTANGLE_TITLE}",
  "args0": [
    {
      "type": "input_value",
      "name": "CANVAS"
    },
    {
      "type": "input_value",
      "name": "POS_X",
      "check": "Number"
    },
    {
      "type": "input_value",
      "name": "POS_Y",
      "check": "Number"
    },
    {
      "type": "input_value",
      "name": "WIDTH",
      "check": "Number"
    },
    {
      "type": "input_value",
      "name": "HEIGHT",
      "check": "Number"
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": "%{BKY_CANVAS_HUE}",
  "tooltip": "",
  "helpUrl": ""
},


{
  "type": "canvas_draw_circle",
  "message0": "%{BKY_CANVAS_DRAW_CIRCLE_TITLE}",
  "args0": [
    {
      "type": "input_value",
      "name": "CANVAS"
    },
    {
      "type": "input_value",
      "name": "CENTER_X",
      "check": "Number"
    },
    {
      "type": "input_value",
      "name": "CENTER_Y",
      "check": "Number"
    },
    {
      "type": "input_value",
      "name": "RADIUS",
      "check": "Number"
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": "%{BKY_CANVAS_HUE}",
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "canvas_pencil_start",
  "message0": "%{BKY_CANVAS_PENCIL_START_TITLE}",
  "args0": [
    {
      "type": "input_value",
      "name": "CANVAS"
    },
    {
      "type": "input_value",
      "name": "POS_X",
      "check": "Number"
    },
    {
      "type": "input_value",
      "name": "POS_Y",
      "check": "Number"
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": "%{BKY_CANVAS_HUE}",
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "canvas_pencil_move",
  "message0": "%{BKY_CANVAS_PENCIL_MOVE_TITLE}",
  "args0": [
    {
      "type": "input_value",
      "name": "CANVAS"
    },
    {
      "type": "input_value",
      "name": "POS_X",
      "check": "Number"
    },
    {
      "type": "input_value",
      "name": "POS_Y",
      "check": "Number"
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": "%{BKY_CANVAS_HUE}",
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "canvas_pencil_stop",
  "message0": "%{BKY_CANVAS_PENCIL_STOP_TITLE}",
  "args0": [
    {
      "type": "input_value",
      "name": "CANVAS"
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": "%{BKY_CANVAS_HUE}",
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "canvas_drawing_mode",
  "message0": "%{BKY_CANVAS_DRAWING_MODE_TITLE}",
  "args0": [
    {
      "type": "input_value",
      "name": "CANVAS"
    },
    {
      "type": "field_dropdown",
      "name": "DRAWING_MODE",
      "options": [
        [
          "%{BKY_CANVAS_DRAWING_MODE_PENCIL}",
          "source-over"
        ],
        [
          "%{BKY_CANVAS_DRAWING_MODE_ERASER}",
          "destination-out"
        ]
      ]
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": "%{BKY_CANVAS_HUE}",
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "canvas_set_stroke_color",
  "message0": "%{BKY_CANVAS_SET_STROKE_COLOR_TITLE}",
  "args0": [
    {
      "type": "input_value",
      "name": "CANVAS"
    },
    {
      "type": "input_value",
      "name": "COLOR"
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": "%{BKY_CANVAS_HUE}",
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "canvas_set_line_width",
  "message0": "%{BKY_CANVAS_SET_LINE_WIDTH_TITLE}",
  "args0": [
    {
      "type": "input_value",
      "name": "CANVAS"
    },
    {
      "type": "input_value",
      "name": "LINE_WIDTH",
      "check": "Number"
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": "%{BKY_CANVAS_HUE}",
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "canvas_get_mouse_pos",
  "message0": "%{BKY_CANVAS_GET_MOUSE_POS_TITLE}",
  "args0": [
    {
      "type": "input_value",
      "name": "CANVAS"
    },
    {
      "type": "input_value",
      "name": "EVENT"
    },
    {
      "type": "field_variable",
      "name": "POS_X",
      "variable": "mousePosX"
    },
    {
      "type": "field_variable",
      "name": "POS_Y",
      "variable": "mousePosY"
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": "%{BKY_CANVAS_HUE}",
  "tooltip": "",
  "helpUrl": ""
}
]);