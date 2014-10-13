
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

    registerVoiceCommandCallback: function (callback) {
        WinJS.Application.addEventListener('activated', function (args) {
            if (args.detail.kind === activation.ActivationKind.voiceCommand) {
                callback(args.detail.result);
            }
        });
    }
};

require("cordova/exec/proxy").add("Cortana", module.exports);
