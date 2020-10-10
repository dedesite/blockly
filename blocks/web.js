'use strict';

goog.provide('Blockly.Constants.Web');

goog.require('Blockly');
goog.require('Blockly.Blocks');
goog.require('Blockly.FieldDropdown');
goog.require('Blockly.FieldLabel');


Blockly.defineBlocksWithJsonArray([
{
  "type": "web_set_inner_html",
  "message0": "%{BKY_WEB_SET_INNER_HTML_TITLE}",
  "args0": [
    {
      "type": "input_value",
      "name": "HTLM_ELEMENT",
      "check": ["String", "object"]
    },
    {
      "type": "input_value",
      "name": "HTML_NEW_VALUE",
      "check": "String"
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": "%{BKY_WEB_HUE}",
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "web_get_inner_html",
  "message0": "%{BKY_WEB_GET_INNER_HTML_TITLE}",
  "args0": [
    {
      "type": "input_value",
      "name": "HTLM_ELEMENT",
      "check": "String"
    }
  ],
  "inputsInline": true,
  "output": "String",
  "colour": "%{BKY_WEB_HUE}",
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "web_on_click",
  "message0": "%{BKY_WEB_ON_CLICK_TITLE}",
  "args0": [
    {
      "type": "input_value",
      "name": "HTLM_ELEMENT",
      "check": "String"
    },
    {
      "type": "field_variable",
      "name": "EVENT_VAR",
      "variable": "target"
    },
    {
      "type": "input_statement",
      "name": "CALLBACK",
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": "%{BKY_WEB_HUE}",
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "web_toggle_class",
  "message0": "%{BKY_WEB_TOGGLE_CLASS_TITLE}",
  "args0": [
    {
      "type": "input_value",
      "name": "CSS_CLASS",
      "check": "String"
    },
    {
      "type": "input_value",
      "name": "HTLM_ELEMENT",
      "check": "String"
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": "%{BKY_WEB_HUE}",
  "tooltip": "",
  "helpUrl": "https://developer.mozilla.org/fr/docs/Web/API/Element/classList"
},
{
  "type": "web_add_class",
  "message0": "%{BKY_WEB_ADD_CLASS_TITLE}",
  "args0": [
    {
      "type": "input_value",
      "name": "CSS_CLASS",
      "check": "String"
    },
    {
      "type": "input_value",
      "name": "HTLM_ELEMENT",
      "check": "String"
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": "%{BKY_WEB_HUE}",
  "tooltip": "",
  "helpUrl": "https://developer.mozilla.org/fr/docs/Web/API/Element/classList"
},
{
  "type": "web_remove_class",
  "message0": "%{BKY_WEB_REMOVE_CLASS_TITLE}",
  "args0": [
    {
      "type": "input_value",
      "name": "CSS_CLASS",
      "check": "String"
    },
    {
      "type": "input_value",
      "name": "HTLM_ELEMENT",
      "check": "String"
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": "%{BKY_WEB_HUE}",
  "tooltip": "",
  "helpUrl": "https://developer.mozilla.org/fr/docs/Web/API/Element/classList"
},
{
  "type": "web_has_class",
  "message0": "%{BKY_WEB_HAS_CLASS_TITLE}",
  "args0": [
    {
      "type": "input_value",
      "name": "HTLM_ELEMENT",
      "check": "String"
    },
    {
      "type": "input_value",
      "name": "CSS_CLASS",
      "check": "String"
    },
  ],
  "inputsInline": true,
  "output": "Boolean",
  "colour": "%{BKY_WEB_HUE}",
  "tooltip": "",
  "helpUrl": "https://developer.mozilla.org/fr/docs/Web/API/Element/classList"
},
{
  "type": "web_on_event",
  "message0": "%{BKY_WEB_ON_EVENT_TITLE}",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "EVENT_TYPE",
      "options": [
        [
          "click",
          "click"
        ],
        [
          "change",
          "change"
        ],
        [
          "focus",
          "focus"
        ],
        [
          "blur",
          "blur"
        ],
        [
          "mouseup",
          "mouseup"
        ],
        [
          "mousedown",
          "mousedown"
        ],
        [
          "mousemove",
          "mousemove"
        ],
        [
          "keyup",
          "keyup"
        ],
        [
          "keydown",
          "keydown"
        ],
        [
          "key_press",
          "keypress"
        ]
      ]
    },
    {
      "type": "input_value",
      "name": "HTLM_ELEMENT",
      "check": "String"
    },
    {
      "type": "field_variable",
      "name": "EVENT_VAR",
      "variable": "target"
    },
    {
      "type": "input_statement",
      "name": "CALLBACK"
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": "%{BKY_WEB_HUE}",
  "tooltip": "",
  "helpUrl": "https://developer.mozilla.org/fr/docs/Web/API/GlobalEventHandlers"
},
{
  "type": "web_query_selector_all",
  "message0": "%{BKY_WEB_QUERY_SELECTOR_ALL_TITLE}",
  "args0": [
    {
      "type": "input_value",
      "name": "css_selector",
      "check": "String"
    }
  ],
  "output": "Array",
  "colour": "%{BKY_WEB_HUE}",
  "tooltip": "",
  "helpUrl": "https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll"
}
]);