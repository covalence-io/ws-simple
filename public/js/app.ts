(function () {
    let ws: WebSocket;
    const messages = <HTMLElement>document.getElementById('messages');
    const wsOpen = <HTMLButtonElement>document.getElementById('ws-open');
    const wsClose = <HTMLButtonElement>document.getElementById('ws-close');
    const wsSend = <HTMLButtonElement>document.getElementById('ws-send');
    const wsInput = <HTMLInputElement>document.getElementById('ws-input');

    function showMessage(message: string) {
        if (!messages) {
            return;
        }

        messages.textContent += `\n${message}`;
        messages.scrollTop = messages?.scrollHeight;
    }

    function closeConnection() {
        if (!!ws) {
            ws.close();
        }
    }

    wsOpen.addEventListener('click', () => {
        closeConnection();

        ws = new WebSocket('ws://localhost:3000');

        ws.addEventListener('error', () => {
            showMessage('WebSocket error');
        });

        ws.addEventListener('open', () => {
            showMessage('WebSocket connection established');
        });

        ws.addEventListener('close', () => {
            showMessage('WebSocket connection closed');
        });

        ws.addEventListener('message', (msg: MessageEvent<string>) => {
            showMessage(`Received message: ${msg.data}`);
        });
    });

    wsClose.addEventListener('click', closeConnection);

    wsSend.addEventListener('click', () => {
        const val = wsInput?.value;

        if (!val) {
            return;
        } else if (!ws) {
            showMessage('No WebSocket connection');
            return;
        }

        ws.send(val);
        showMessage(`Sent "${val}"`);
        wsInput.value = '';
    });
})();