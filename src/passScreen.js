function showPassScreen(message, onReady) {
    const passScreen = document.querySelector('#pass-screen');
    const passMessage = document.querySelector('#pass-message');
    const readyBtn = document.querySelector('#ready-btn');

    passMessage.textContent = message;
    passScreen.classList.remove('hidden');

    const handler = () => {
        passScreen.classList.add('hidden');
        readyBtn.removeEventListener('click', handler);
        onReady();
    };

    readyBtn.addEventListener('click', handler);
}

export { showPassScreen };