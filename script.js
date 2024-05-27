$(document).ready(function () {
    const messages = $('#messages');

    function appendMessage(name, text, isJamie) {
        const className = isJamie ? 'jamie' : 'you';
        const now = new Date();
        const dateString = now.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
        const timeString = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        const dateTimeString = `${dateString} ${timeString}`;
        const message = `
            <div class="message-container ${className}">
                <div class="name">${name}</div>
                <div class="message ${className}">
                    <div class="text">${text}</div>
                </div>
                <div class="time">${dateTimeString}</div>
            </div>`;
        messages.append(message);
        messages.scrollTop(messages[0].scrollHeight);
    }

    function getResponse(userInput) {
        const isQuestion = userInput.endsWith('?');
        const isYelling = userInput === userInput.toUpperCase() && /[A-Z]/.test(userInput);

        if (isYelling && isQuestion) {
            return "Please give me some time to resolve the issue.";
        } else if (isYelling) {
            return "Please remain calm.";
        } else if (isQuestion) {
            return "Yes";
        } else if (userInput.toLowerCase().includes('jamie')) {
            return "Can I help you?";
        } else {
            return "Sorry, I don’t understand";
        }
    }

    $('#sendBtn').click(function () {
        const userInput = $('#userInput').val().trim();
        if (userInput) {
            appendMessage('You', userInput, false);
            const response = getResponse(userInput);
            appendMessage('Jamie', response, true);
            $('#userInput').val('');
        }
    });

    $('#userInput').keypress(function (e) {
        if (e.which == 13) {
            $('#sendBtn').click();
        }
    });
});
