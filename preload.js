const { webFrame } = require('electron');

// Wait until the document is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Function to update chat background with the last image
    function updateChatBackground() {
        const chatImages = document.querySelectorAll('.chat img');
        if (chatImages.length > 0) {
            const lastImage = chatImages[chatImages.length - 1];
            const chatContainer = document.querySelector('.chat-container');
            if (chatContainer && lastImage) {
                chatContainer.style.backgroundImage = `url(${lastImage.src})`;
                chatContainer.style.backgroundSize = 'cover';
                chatContainer.style.backgroundRepeat = 'no-repeat';
                console.log('Chat background updated to the last image:', lastImage.src);
            }
        }
    }

    // Observe changes in the chat container
    const chatObserver = new MutationObserver(updateChatBackground);
    const chatContainer = document.querySelector('.chat-container');
    if (chatContainer) {
        chatObserver.observe(chatContainer, { childList: true, subtree: true });
        console.log('MutationObserver set up to monitor chat changes.');
    } else {
        console.error('Chat container not found.');
    }

    // Initial background update
    updateChatBackground();
});
