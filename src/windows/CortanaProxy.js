
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
