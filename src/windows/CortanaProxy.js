// Copyright (c) Microsoft Open Technologies, Inc. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License"); you may not use these files except in compliance with the License. You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

module.exports = {
    installVoiceCommandSet: function (success, error, args) {

        var vcdFileUrl = args[0],
            vcdFilePath = new Windows.Foundation.Uri(vcdFileUrl);

        Windows.Storage.StorageFile.getFileFromApplicationUriAsync(vcdFilePath).then(
            // Success function.
            function (vcdStorageFile) {
                Windows.Media.SpeechRecognition.VoiceCommandManager.installCommandSetsFromStorageFileAsync(vcdStorageFile).then(
                    success,
                    function(err) {
                        error(err);
                    });
            },
            // Error function.
            function(err) {
                error(err);
            }
        );
    },

    setPhraseList: function (success, error, args) {

        var vcdSetId = args[0],
            vcdListId = args[1];
            vcdListValues = args[2];

        commandSet = Windows.Media.SpeechRecognition.VoiceCommandManager.installedCommandSets.lookup(vcdSetId);
        commandSet.setPhraseListAsync(vcdListId, vcdListValues).then(
            success,
            function(err) {
                error(err);
            }
        );
    },

    registerVoiceCommandCallback: function (callback) {
        WinJS.Application.addEventListener('activated', function (args) {
            if (args.detail.kind === activation.ActivationKind.voiceCommand) {
                callback(args.detail.result, { keepCallback: true });
            }
        });
    }
};

require("cordova/exec/proxy").add("Cortana", module.exports);
