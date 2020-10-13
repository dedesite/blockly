'use strict';

goog.provide('Blockly.JavaScript.web');

goog.require('Blockly.JavaScript');

Blockly.JavaScript['web_set_inner_html'] = function(block) {
  var value_htlm_element = Blockly.JavaScript.valueToCode(block, 'HTLM_ELEMENT', Blockly.JavaScript.ORDER_ATOMIC);
  var value_html_new_value = Blockly.JavaScript.valueToCode(block, 'HTML_NEW_VALUE', Blockly.JavaScript.ORDER_ATOMIC);
  var code = `
    if(typeof ${value_htlm_element} === 'string') {
      document.getElementById(${value_htlm_element}).innerHTML = ${value_html_new_value};
    } else {
      ${value_htlm_element}.innerHTML = ${value_html_new_value};
    }
  `;

  return code;
};

Blockly.JavaScript['web_get_inner_html'] = function(block) {
  var value_htlm_element = Blockly.JavaScript.valueToCode(block, 'HTLM_ELEMENT', Blockly.JavaScript.ORDER_ATOMIC);
  var code = `
    (typeof ${value_htlm_element} === 'string' ?
      document.getElementById(${value_htlm_element}).innerHTML :
      ${value_htlm_element}.innerHTML)
  `;

  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['web_get_input_value'] = function(block) {
  var value_input_element = Blockly.JavaScript.valueToCode(block, 'INPUT_ELEMENT', Blockly.JavaScript.ORDER_ATOMIC);
  var code = `
    (typeof ${value_input_element} === 'string' ?
      document.getElementById(${value_input_element}).value :
      ${value_input_element}.value)
  `;

  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['web_on_click'] = function(block) {
  var value_htlm_element = Blockly.JavaScript.valueToCode(block, 'HTLM_ELEMENT', Blockly.JavaScript.ORDER_ATOMIC);
  var variable_event_var = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('EVENT_VAR'), Blockly.Variables.NAME_TYPE);
  var statements_callback = Blockly.JavaScript.statementToCode(block, 'CALLBACK');

  var code = `
  if(typeof ${value_htlm_element} === 'string') {
    document.getElementById(${value_htlm_element}).onclick = (evt) => {
      ${variable_event_var} = evt.target.id;
      ${statements_callback}
    }
  } else {
    ${value_htlm_element}.onclick = (evt) => {
      ${variable_event_var} = evt.target.id;
      ${statements_callback}
    }
  }
  `;

  return code;
};

Blockly.JavaScript['web_on_event'] = function(block) {
  var dropdown_event_type = block.getFieldValue('EVENT_TYPE');
  var value_htlm_element = Blockly.JavaScript.valueToCode(block, 'HTLM_ELEMENT', Blockly.JavaScript.ORDER_ATOMIC);
  var variable_event_var = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('EVENT_VAR'), Blockly.Variables.NAME_TYPE);
  var variable_target_var = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('TARGET_VAR'), Blockly.Variables.NAME_TYPE);
  var statements_callback = Blockly.JavaScript.statementToCode(block, 'CALLBACK');

  var code = `
  var element = (typeof ${value_htlm_element} === 'string' ?
    document.getElementById(${value_htlm_element}) :
    ${value_htlm_element});
  element.on${dropdown_event_type} = (evt) => {
    ${variable_event_var} = evt;
    ${variable_target_var} = evt.target.id;
    ${statements_callback}
  }
  `;

  return code;
};

Blockly.JavaScript['web_toggle_class'] = function(block) {
  var value_css_class = Blockly.JavaScript.valueToCode(block, 'CSS_CLASS', Blockly.JavaScript.ORDER_ATOMIC);
  var value_htlm_element = Blockly.JavaScript.valueToCode(block, 'HTLM_ELEMENT', Blockly.JavaScript.ORDER_ATOMIC);
  var code = `
    if(typeof ${value_htlm_element} === 'string') {
      document.getElementById(${value_htlm_element}).classList.toggle(${value_css_class});
    } else {
      ${value_htlm_element}.classList.toggle(${value_css_class});
    }
  `;

  return code;
};

Blockly.JavaScript['web_add_class'] = function(block) {
  var value_css_class = Blockly.JavaScript.valueToCode(block, 'CSS_CLASS', Blockly.JavaScript.ORDER_ATOMIC);
  var value_htlm_element = Blockly.JavaScript.valueToCode(block, 'HTLM_ELEMENT', Blockly.JavaScript.ORDER_ATOMIC);
  var code = `
    if(typeof ${value_htlm_element} === 'string') {
      document.getElementById(${value_htlm_element}).classList.add(${value_css_class});
    } else {
      ${value_htlm_element}.classList.add(${value_css_class});
    }
  `;

  return code;
};

Blockly.JavaScript['web_remove_class'] = function(block) {
  var value_css_class = Blockly.JavaScript.valueToCode(block, 'CSS_CLASS', Blockly.JavaScript.ORDER_ATOMIC);
  var value_htlm_element = Blockly.JavaScript.valueToCode(block, 'HTLM_ELEMENT', Blockly.JavaScript.ORDER_ATOMIC);
  var code = `
    if(typeof ${value_htlm_element} === 'string') {
      document.getElementById(${value_htlm_element}).classList.remove(${value_css_class});
    } else {
      ${value_htlm_element}.classList.remove(${value_css_class});
    }
  `;

  return code;
};

Blockly.JavaScript['web_has_class'] = function(block) {
  var value_css_class = Blockly.JavaScript.valueToCode(block, 'CSS_CLASS', Blockly.JavaScript.ORDER_ATOMIC);
  var value_htlm_element = Blockly.JavaScript.valueToCode(block, 'HTLM_ELEMENT', Blockly.JavaScript.ORDER_ATOMIC);
  var code = `
    (typeof ${value_htlm_element} === 'string' ?
      document.getElementById(${value_htlm_element}).classList.contains(${value_css_class}) :
      ${value_htlm_element}.classList.contains(${value_css_class}))
  `;

  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};


Blockly.JavaScript['web_query_selector_all'] = function(block) {
  var value_css_selector = Blockly.JavaScript.valueToCode(block, 'css_selector', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 'document.querySelectorAll(' + value_css_selector + ')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_MEMBER];
};