
var exec = require('cordova/exec'),
    argscheck = require('cordova/argscheck');
    cordova = require('cordova'),
    utils = require('cordova/utils'),
    activation = Windows.ApplicationModel.Activation;

var Cortana = function() {
    this._events = {
        onVoiceCommand: cordova.addDocumentEventHandler('onvoicecommand')
    };

    // If we just registered the first handler, make sure native listener is started.
    var voiceCommandEvent = this._events.onVoiceCommand;
    voiceCommandEvent.onHasSubscribersChange = function() {
        if (voiceCommandEvent.numHandlers === 1) {
            exec(cortana._fireVoiceCommandEvent, null, "Cortana", "registerVoiceCommandCallback", []);
        }
    };
};

Cortana.prototype.installVoiceCommandSet = function (vcdUrl, success, error) {

    argscheck.checkArgs("sFF", "installVoiceCommandSet", arguments);

    var win = function () {
        success && typeof success === 'function' && success();
    };

    var fail = function(err) {
        error && typeof error === "function" && error(err);
    };

    exec(win, fail, "Cortana", "installVoiceCommandSet", [vcdUrl]);
};

Cortana.prototype.setPhraseList = function (vcdSetId, vcdListId, vcdListValues, success, error) {

    argscheck.checkArgs("ssaFF", "installVoiceCommandSet", arguments);

    var win = function () {
        success && typeof success === 'function' && success();
    };

    var fail = function(err) {
        error && typeof error === "function" && error(err);
    };

    exec(win, fail, "Cortana", "setPhraseList", [vcdSetId, vcdListId, vcdListValues]);
};

Cortana.prototype._fireVoiceCommandEvent = function(voiceCommand) {
    var res = utils.clone(voiceCommand);
    cordova.fireDocumentEvent('onvoicecommand', res);
};

var cortana = new Cortana();

module.exports = cortana;
