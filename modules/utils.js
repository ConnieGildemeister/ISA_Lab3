// Note: ChatGPT helped in the making of this code

function getDate(name) {
    const date = new Date();
    return `Hello ${name}, What a beautiful day. Server current date and time is ${date}`;
}

module.exports = { getDate };
