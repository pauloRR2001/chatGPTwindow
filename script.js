function applyCustomStyles() {
  const iframe = document.getElementById('chat-iframe');
  const background = document.getElementById('background-image');

  iframe.onload = function() {
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

    function updateBackground(imageUrl) {
      background.style.backgroundImage = `url(${imageUrl})`;
      console.log(`Background updated to: ${imageUrl}`);
    }

    function updateMessages() {
      const messages = iframeDoc.querySelectorAll('.group\\.conversation-turn\\.relative\\.flex\\.w-full\\.min-w-0\\.flex-col\\.agent-turn');
      messages.forEach((msg, index) => {
        if (index < messages.length - 1) {
          msg.style.display = 'none';
        } else {
          msg.style.display = 'block';
          const imgTag = msg.querySelector('img');
          if (imgTag) {
            updateBackground(imgTag.src);
          }
        }
      });
    }

    const observer = new MutationObserver(updateMessages);
    observer.observe(iframeDoc.body, { childList: true, subtree: true });

    updateMessages();
  };
}
