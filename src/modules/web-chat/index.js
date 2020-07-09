function createWebChat(element) {
    const chatIframe = element;
    console.log({chatIframe});
    if (chatIframe) {
        const queryStringParameters = window.location.search;
        console.log({chatIframe, queryStringParameters});
        chatIframe.src += queryStringParameters;
    }
}

export default createWebChat;
