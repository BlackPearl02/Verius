const once = false;
const name = 'messageCreate';
const messageCache = new Map();
async function invoke(message) {
  messageCache.set(message.id, message.content);
}

export { once, name, invoke, messageCache };
