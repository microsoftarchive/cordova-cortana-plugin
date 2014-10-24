// Copyright (c) Microsoft Open Technologies, Inc. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License"); you may not use these files except in compliance with the License. You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

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
