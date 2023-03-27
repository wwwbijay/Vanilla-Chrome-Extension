chrome.runtime.onMessage.addListener((message, sender, senderResponse) => {
  if (message.name === "stream" && message.streamId) {
    let track, canvas;
    navigator.mediaDevices
      .getUserMedia({
        video: {
          mandatory: {
            chromeMediaSource: "desktop",
            chromeMediaSourceId: message.streamId,
          },
        },
      })
      .then((stream) => {
        track = stream.getVideoTracks()[0]
        const imageCapture = new ImageCapture(track)
        return imageCapture.grabFrame().then((bitmap) => {
            track.stop();
            canvas = document.createElement('canvas');
            canvas.width = bitmap.width;
            canvas.height = bitmap.height;
            let context = canvas.getContext('2d');
            context.drawImage(bitmap, 0, 0, bitmap.width, bitmap.height);
            return canvas.toDataURL().then((url) => {
                //TODO download the image from the URL
            }).catch((err) => {
                alert("Could not take screenshot")
                senderResponse({success: false, message: err})
            });
        })
      });

      return true;

  }
});
