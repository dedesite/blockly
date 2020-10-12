/**
 * @license
 * Copyright 2012 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * This code is heavily based on Blocky Code demo
 * https://github.com/google/blockly/blob/master/demos/code/code.js
 * I just made some small modification to remove other language than french and english
 * I also removed no javascript language tab and add a Project tab
 */

/**
 * @fileoverview JavaScript for Blockly's Code demo.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

/**
 * Create a namespace for the application.
 */
var Code = {};

/**
 * Lookup for names of supported languages.  Keys should be in ISO 639 format.
 */
Code.LANGUAGE_NAME = {
    'en': 'English',
    'fr': 'Français',
};

/**
 * List of RTL languages.
 */
Code.LANGUAGE_RTL = ['ar', 'fa', 'he', 'lki'];

/**
 * Blockly's main workspace.
 * @type {Blockly.WorkspaceSvg}
 */
Code.workspace = null;

Code.projectHtml = "";

/**
 * Extracts a parameter from the URL.
 * If the parameter is absent default_value is returned.
 * @param {string} name The name of the parameter.
 * @param {string} defaultValue Value to return if parameter not found.
 * @return {string} The parameter value or the default value if not found.
 */
Code.getStringParamFromUrl = function(name, defaultValue) {
    var val = location.search.match(new RegExp('[?&]' + name + '=([^&]+)'));
    return val ? decodeURIComponent(val[1].replace(/\+/g, '%20')) : defaultValue;
};

/**
 * Get the language of this user from the URL.
 * @return {string} User's language.
 */
Code.getLang = function() {
    var lang = Code.getStringParamFromUrl('lang', '');
    if (Code.LANGUAGE_NAME[lang] === undefined) {
        // Default to English.
        lang = 'en';
    }
    return lang;
};

/**
 * Is the current language (Code.LANG) an RTL language?
 * @return {boolean} True if RTL, false if LTR.
 */
Code.isRtl = function() {
    return Code.LANGUAGE_RTL.indexOf(Code.LANG) != -1;
};

/**
 * Load blocks saved on App Engine Storage or in session/local storage.
 * @param {string} defaultXml Text representation of default blocks.
 */
Code.loadBlocks = function(defaultXml) {
    try {
        var loadOnce = window.sessionStorage.loadOnceBlocks;
    } catch (e) {
        // Firefox sometimes throws a SecurityError when accessing sessionStorage.
        // Restarting Firefox fixes this, so it looks like a bug.
        var loadOnce = null;
    }
    if ('BlocklyStorage' in window && window.location.hash.length > 1) {
        // An href with #key trigers an AJAX call to retrieve saved blocks.
        BlocklyStorage.retrieveXml(window.location.hash.substring(1));
    } else if (loadOnce) {
        // Language switching stores the blocks during the reload.
        delete window.sessionStorage.loadOnceBlocks;
        var xml = Blockly.Xml.textToDom(loadOnce);
        Blockly.Xml.domToWorkspace(xml, Code.workspace);
    } else if (defaultXml) {
        // Load the editor with default starting blocks.
        var xml = Blockly.Xml.textToDom(defaultXml);
        Blockly.Xml.domToWorkspace(xml, Code.workspace);
    } else if ('BlocklyStorage' in window) {
        // Restore saved blocks in a separate thread so that subsequent
        // initialization is not affected from a failed load.
        window.setTimeout(BlocklyStorage.restoreBlocks, 0);
    }
};

/**
 * Save the blocks and reload with a different language.
 */
Code.changeLanguage = function() {
    // Store the blocks for the duration of the reload.
    // MSIE 11 does not support sessionStorage on file:// URLs.
    if (window.sessionStorage) {
        var xml = Blockly.Xml.workspaceToDom(Code.workspace);
        var text = Blockly.Xml.domToText(xml);
        window.sessionStorage.loadOnceBlocks = text;
    }

    var languageMenu = document.getElementById('languageMenu');
    var newLang = encodeURIComponent(
        languageMenu.options[languageMenu.selectedIndex].value);
    var search = window.location.search;
    if (search.length <= 1) {
        search = '?lang=' + newLang;
    } else if (search.match(/[?&]lang=[^&]*/)) {
        search = search.replace(/([?&]lang=)[^&]*/, '$1' + newLang);
    } else {
        search = search.replace(/\?/, '?lang=' + newLang + '&');
    }

    window.location = window.location.protocol + '//' +
        window.location.host + window.location.pathname + search;
};

/**
 * Changes the output language by clicking the tab matching
 * the selected language in the codeMenu.
 */
Code.changeCodingLanguage = function() {
    var codeMenu = document.getElementById('code_menu');
    Code.tabClick(codeMenu.options[codeMenu.selectedIndex].value);
}

/**
 * Bind a function to a button's click event.
 * On touch enabled browsers, ontouchend is treated as equivalent to onclick.
 * @param {!Element|string} el Button element or ID thereof.
 * @param {!Function} func Event handler to bind.
 */
Code.bindClick = function(el, func) {
    if (typeof el == 'string') {
        el = document.getElementById(el);
    }
    el.addEventListener('click', func, true);
    el.addEventListener('touchend', func, true);
};

/**
 * Load the Prettify CSS and JavaScript.
 */
Code.importPrettify = function() {
    var script = document.createElement('script');
    script.setAttribute('src', 'https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js');
    document.head.appendChild(script);
};

/**
 * Compute the absolute coordinates and dimensions of an HTML element.
 * @param {!Element} element Element to match.
 * @return {!Object} Contains height, width, x, and y properties.
 * @private
 */
Code.getBBox_ = function(element) {
    var height = element.offsetHeight;
    var width = element.offsetWidth;
    var x = 0;
    var y = 0;
    do {
        x += element.offsetLeft;
        y += element.offsetTop;
        element = element.offsetParent;
    } while (element);
    return {
        height: height,
        width: width,
        x: x,
        y: y
    };
};

/**
 * User's language (e.g. "en").
 * @type {string}
 */
Code.LANG = Code.getLang();

/**
 * List of tab names.
 * @private
 */
Code.TABS_ = ['blocks', 'javascript', 'project'];

/**
 * List of tab names with casing, for display in the UI.
 * @private
 */
Code.TABS_DISPLAY_ = [
    'Blocks', 'JavaScript', 'Project'
];

Code.selected = 'blocks';

/**
 * Switch the visible pane when a tab is clicked.
 * @param {string} clickedName Name of tab clicked.
 */
Code.tabClick = function(clickedName) {
    if (document.getElementById('tab_blocks').classList.contains('tabon')) {
        Code.workspace.setVisible(false);
    }
    // Deselect all tabs and hide all panes.
    for (var i = 0; i < Code.TABS_.length; i++) {
        var name = Code.TABS_[i];
        var tab = document.getElementById('tab_' + name);
        tab.classList.add('taboff');
        tab.classList.remove('tabon');
        document.getElementById('content_' + name).style.visibility = 'hidden';
    }

    // Select the active tab.
    Code.selected = clickedName;
    var selectedTab = document.getElementById('tab_' + clickedName);
    selectedTab.classList.remove('taboff');
    selectedTab.classList.add('tabon');
    // Show the selected pane.
    document.getElementById('content_' + clickedName).style.visibility =
        'visible';
    Code.renderContent();
    // The code menu tab is on if the blocks tab is off.
    var codeMenuTab = document.getElementById('tab_code');
    if (clickedName == 'blocks') {
        Code.workspace.setVisible(true);
        codeMenuTab.className = 'taboff';
    } else {
        codeMenuTab.className = 'tabon';
    }
    // Sync the menu's value with the clicked tab value if needed.
    var codeMenu = document.getElementById('code_menu');
    for (var i = 0; i < codeMenu.options.length; i++) {
        if (codeMenu.options[i].value == clickedName) {
            codeMenu.selectedIndex = i;
            break;
        }
    }
    Blockly.svgResize(Code.workspace);
};

/**
 * Populate the currently selected pane with content generated from the blocks.
 */
Code.renderContent = function() {
    var content = document.getElementById('content_' + Code.selected);
    // Initialize the pane.
    if (content.id == 'content_javascript') {
        Code.attemptCodeGeneration(Blockly.JavaScript);
    }
    if (typeof PR == 'object') {
        PR.prettyPrint();
    }
};

/**
 * Attempt to generate the code and display it in the UI, pretty printed.
 * @param generator {!Blockly.Generator} The generator to use.
 */
Code.attemptCodeGeneration = function(generator) {
    var content = document.getElementById('content_' + Code.selected);
    content.textContent = '';
    if (Code.checkAllGeneratorFunctionsDefined(generator)) {
        var code = generator.workspaceToCode(Code.workspace);
        content.textContent = code;
        // Remove the 'prettyprinted' class, so that Prettify will recalculate.
        content.className = content.className.replace('prettyprinted', '');
    }
};

/**
 * Check whether all blocks in use have generator functions.
 * @param generator {!Blockly.Generator} The generator to use.
 */
Code.checkAllGeneratorFunctionsDefined = function(generator) {
    var blocks = Code.workspace.getAllBlocks(false);
    var missingBlockGenerators = [];
    for (var i = 0; i < blocks.length; i++) {
        var blockType = blocks[i].type;
        if (!generator[blockType]) {
            if (missingBlockGenerators.indexOf(blockType) == -1) {
                missingBlockGenerators.push(blockType);
            }
        }
    }

    var valid = missingBlockGenerators.length == 0;
    if (!valid) {
        var msg = 'The generator code for the following blocks not specified for ' +
            generator.name_ + ':\n - ' + missingBlockGenerators.join('\n - ');
        Blockly.alert(msg); // Assuming synchronous. No callback.
    }
    return valid;
};

/**
 * Initialize Blockly.  Called on page load.
 */
Code.init = function() {
    Code.initLanguage();

    // Save Project's html to restaure it at each run
    Code.projectHtml = document.getElementById("content_project").innerHTML;

    var rtl = Code.isRtl();
    var container = document.getElementById('content_area');
    var onresize = function(e) {
        var bBox = Code.getBBox_(container);
        for (var i = 0; i < Code.TABS_.length; i++) {
            var el = document.getElementById('content_' + Code.TABS_[i]);
            el.style.top = bBox.y + 'px';
            el.style.left = bBox.x + 'px';
            // Height and width need to be set, read back, then set again to
            // compensate for scrollbars.
            el.style.height = bBox.height + 'px';
            el.style.height = (2 * bBox.height - el.offsetHeight) + 'px';
            el.style.width = bBox.width + 'px';
            el.style.width = (2 * bBox.width - el.offsetWidth) + 'px';
        }
        // Make the 'Blocks' tab line up with the toolbox.
        if (Code.workspace && Code.workspace.getToolbox().width) {
            document.getElementById('tab_blocks').style.minWidth =
                (Code.workspace.getToolbox().width - 38) + 'px';
            // Account for the 19 pixel margin and on each side.
        }
    };
    window.addEventListener('resize', onresize, false);

    // The toolbox XML specifies each category name using Blockly's messaging
    // format (eg. `<category name="%{BKY_CATLOGIC}">`).
    // These message keys need to be defined in `Blockly.Msg` in order to
    // be decoded by the library. Therefore, we'll use the `MSG` dictionary that's
    // been defined for each language to import each category name message
    // into `Blockly.Msg`.
    // TODO: Clean up the message files so this is done explicitly instead of
    // through this for-loop.
    for (var messageKey in MSG) {
        if (messageKey.indexOf('cat') == 0) {
            Blockly.Msg[messageKey.toUpperCase()] = MSG[messageKey];
        }
    }

    // Construct the toolbox XML, replacing translated variable names.
    var toolboxText = document.getElementById('toolbox').outerHTML;
    toolboxText = toolboxText.replace(/(^|[^%]){(\w+)}/g,
        function(m, p1, p2) { return p1 + MSG[p2]; });
    var toolboxXml = Blockly.Xml.textToDom(toolboxText);

    Code.workspace = Blockly.inject('content_blocks', {
        grid: {
            spacing: 25,
            length: 3,
            colour: '#ccc',
            snap: true
        },
        media: 'node_modules/blockly-web/media/',
        rtl: rtl,
        toolbox: toolboxXml,
        zoom: {
            controls: true,
            wheel: true
        }
    });

    // Add to reserved word list: Local variables in execution environment (runJS)
    // and the infinite loop detection function.
    Blockly.JavaScript.addReservedWords('code,timeouts,checkTimeout');

    Code.loadBlocks('');

    if ('BlocklyStorage' in window) {
        // Hook a save function onto unload.
        BlocklyStorage.backupOnUnload(Code.workspace);
    }

    Code.tabClick(Code.selected);

    Code.bindClick('trashButton',
        function() {
            Code.discard();
            Code.renderContent();
        });
    Code.bindClick('runButton', Code.runJS);

    function saveAs(fileName, content) {
        // Taken from https://stackoverflow.com/a/18197341/947242
        const element = document.createElement('a');
        element.setAttribute('href', 'data:application/xml;charset=utf-8,' + encodeURIComponent(content));
        element.setAttribute('download', fileName);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }

    Code.bindClick('exportButton', () => {
        // Taken from https://github.com/google/blockly/blob/096d1c46c5066cfa7e59db3b41405b7e854b95d0/appengine/storage.js#L59
        const xml = Blockly.Xml.workspaceToDom(Code.workspace, true);
        const content = Blockly.Xml.domToText(xml);

        saveAs('project.xml', content);
    });

    // Taken from https://github.com/google/blockly/blob/096d1c46c5066cfa7e59db3b41405b7e854b95d0/appengine/storage.js#L170
    function importXml(file) {
        if (!file) return;
        const reader = new FileReader();

        reader.onload = (e) => {
            let xml = e.target.result;
            try {
                xml = Blockly.Xml.textToDom(xml);
            } catch (e) {
                BlocklyStorage.alert(BlocklyStorage.XML_ERROR + '\nXML: ' + xml);
                return;
            }
            // Clear the workspace to avoid merge.
            Code.workspace.clear();
            Blockly.Xml.domToWorkspace(xml, Code.workspace);
        }
        reader.readAsText(file);
    }

    Code.bindClick('importButton', () => {
        document.getElementById('file-reader').click();
        document.getElementById('file-reader').onchange = (e) => {
            const file = e.target.files[0];
            importXml(file);
        }
    });

    for (var i = 0; i < Code.TABS_.length; i++) {
        var name = Code.TABS_[i];
        Code.bindClick('tab_' + name,
            function(name_) { return function() { Code.tabClick(name_); }; }(name));
    }
    Code.bindClick('tab_code', function(e) {
        if (e.target !== document.getElementById('tab_code')) {
            // Prevent clicks on child codeMenu from triggering a tab click.
            return;
        }
        Code.changeCodingLanguage();
    });

    onresize();
    Blockly.svgResize(Code.workspace);

    // Lazy-load the syntax-highlighting.
    window.setTimeout(Code.importPrettify, 1);
};

/**
 * Initialize the page language.
 */
Code.initLanguage = function() {
    // Set the HTML's language and direction.
    var rtl = Code.isRtl();
    document.dir = rtl ? 'rtl' : 'ltr';
    document.head.parentElement.setAttribute('lang', Code.LANG);

    // Sort languages alphabetically.
    var languages = [];
    for (var lang in Code.LANGUAGE_NAME) {
        languages.push([Code.LANGUAGE_NAME[lang], lang]);
    }
    var comp = function(a, b) {
        // Sort based on first argument ('English', 'Русский', '简体字', etc).
        if (a[0] > b[0]) return 1;
        if (a[0] < b[0]) return -1;
        return 0;
    };
    languages.sort(comp);
    // Populate the language selection menu.
    var languageMenu = document.getElementById('languageMenu');
    languageMenu.options.length = 0;
    for (var i = 0; i < languages.length; i++) {
        var tuple = languages[i];
        var lang = tuple[tuple.length - 1];
        var option = new Option(tuple[0], lang);
        if (lang == Code.LANG) {
            option.selected = true;
        }
        languageMenu.options.add(option);
    }
    languageMenu.addEventListener('change', Code.changeLanguage, true);

    // Populate the coding language selection menu.
    var codeMenu = document.getElementById('code_menu');
    codeMenu.options.length = 0;
    for (var i = 1; i < Code.TABS_.length; i++) {
        codeMenu.options.add(new Option(Code.TABS_DISPLAY_[i], Code.TABS_[i]));
    }
    codeMenu.addEventListener('change', Code.changeCodingLanguage);

    // Inject language strings.
    document.getElementById('tab_blocks').textContent = MSG['blocks'];

    document.getElementById('runButton').title = MSG['runTooltip'];
    document.getElementById('trashButton').title = MSG['trashTooltip'];
};

/**
 * Execute the user's code.
 * Just a quick and dirty eval.  Catch infinite loops.
 */
Code.runJS = function() {
    // Reset tictactor HTML
    document.getElementById("content_project").innerHTML = Code.projectHtml;
    console.clear();
    // Ensure Project tab is open
    Code.tabClick('project');

    Blockly.JavaScript.INFINITE_LOOP_TRAP = 'checkTimeout();\n';
    var timeouts = 0;
    var checkTimeout = function() {
        if (timeouts++ > 1000000) {
            throw MSG['timeout'];
        }
    };
    var code = Blockly.JavaScript.workspaceToCode(Code.workspace);
    Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
    try {
        eval(code);
    } catch (e) {
        console.error(MSG['badCode'].replace('%1', e));
    }
};

/**
 * Discard all blocks from the workspace.
 */
Code.discard = function() {
    var count = Code.workspace.getAllBlocks(false).length;
    if (count < 2 ||
        window.confirm(Blockly.Msg['DELETE_ALL_BLOCKS'].replace('%1', count))) {
        Code.workspace.clear();
        if (window.location.hash) {
            window.location.hash = '';
        }
    }
};

// Load the Code demo's language strings.
document.write('<script src="node_modules/blockly-web/demos/web/msg/' + Code.LANG + '.js"></script>\n');
// Load Blockly's language strings.
document.write('<script src="node_modules/blockly-web/msg/' + Code.LANG + '.js"></script>\n');

window.addEventListener('load', Code.init);