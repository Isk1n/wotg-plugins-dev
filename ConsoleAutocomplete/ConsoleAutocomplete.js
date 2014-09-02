new Wotg.Plugins.Simple({
    title: 'ConsoleAutocomplete',
    version: '0.2.4'
}, function(plugin, events) {
    var pluginPath = 'https://' + (plugin.repository || 'wotg-plugins-dev') + '.github.io/wotg-plugins-dev/' + plugin.title + '/';
    var consoleCommands = [];
    var pluginsCommands = [];


    /*==================================================================================
	=            JQuery Textcomplete http://yuku-t.com/jquery-textcomplete/            =
	==================================================================================*/

    function JQTxtCmpltInit() {
        var JQTxtCmplt = document.createElement('script');
        JQTxtCmplt.src = pluginPath + 'jquery.textcomplete.js';
        document.body.appendChild(JQTxtCmplt);
    }

    events.add('initialize', function() {
        var css = document.createElement('link');
        css.rel = 'stylesheet';
        css.href = pluginPath + 'ConsoleAutocomplete.css';
        document.head.appendChild(css);
        console.log(plugin.title + ' version ' + plugin.version + ' from ' + plugin.repository + ' initialized');
    });

    events.add('afterLaunch', function() {
        JQTxtCmpltInit();
        var command;
        // Array of game console commands
        var commandsObj = Wotg.Utils.Console();
        for (command in commandsObj) {
            if (!commandsObj.hasOwnProperty(command)) continue;
            consoleCommands.push(command);
        }
        // Array of plugins commands
        for (command in Wotg.Plugins.Console()) {
            if (command.indexOf('command_') === 0) pluginsCommands.push(command.slice(8))
        }
    });

    atom.Keyboard().events.add('gravis', function() {
        $('.console-input').textcomplete([{
            match: /^(\w{1,})$/,
            search: function(term, callback) {
                callback($.map(consoleCommands, function(word) {
                    return word.indexOf(term) === 0 ? word : null;
                }));
            },
            index: 1,
            replace: function(word) {
                return word + ' ';
            }
        }]);

        $('.console-input').textcomplete([{
            match: /^man (\w{1,})$/,
            search: function(term, callback) {
                callback($.map(consoleCommands, function(word) {
                    return word.indexOf(term) === 0 ? word : null;
                }));
            },
            index: 1,
            replace: function(word) {
                return 'man ' + word;
            }
        }]);

        $('.console-input').textcomplete([{
            match: /^plugins (\w{1,})$/,
            search: function(term, callback) {
                callback($.map(pluginsCommands, function(word) {
                    return word.indexOf(term) === 0 ? word : null;
                }));
            },
            index: 1,
            replace: function(word) {
                return 'plugins ' + word + ' ';
            }
        }]);
    });
});