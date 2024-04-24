const searchEmoji = e => {
    e.preventDefault();
    const value = document.getElementById("search_field").value;
    displaySearchResults(value);
    return false;
};

const autoSearch = e => {
    const value = e.target.value;
    displaySearchResults(value);
};

const displaySearchResults = (searchQuery = "", filteredList = emojiList) => {
    const filtered = filteredList.filter(e => {
        if (e.description.indexOf(searchQuery) !== -1) {
            return true;
        }
        if (e.aliases.some(elem => elem.startsWith(searchQuery))) {
            return true;
        }
        if (e.tags.some(elem => elem.startsWith(searchQuery))) {
            return true;
        }
    });

    const parent = document.getElementById("search_result_container");
    parent.innerHTML = "";
    filtered.forEach(e => {
        const emojiDiv = document.createElement('div');
        emojiDiv.classList.add('emoji_item');
        emojiDiv.innerHTML = `<span class="emoji" onclick="copyEmoji('${e.emoji}')">${e.emoji}</span><p>${capitalizeFirstLetter(e.description)}</p>`;
        parent.appendChild(emojiDiv);
    });
};

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

const copyEmoji = (emoji) => {
    navigator.clipboard.writeText(emoji);
    displayCopiedMessage(emoji);
};

const displayCopiedMessage = emoji => {
    const messageBox = document.createElement('div');
    messageBox.classList.add('message_box');
    messageBox.textContent = `Your Emoji ${emoji} is Now Copied`;
    document.body.appendChild(messageBox);

    setTimeout(() => {
        document.body.removeChild(messageBox);
    }, 2000);
};

document.getElementById("search_form").addEventListener('submit', searchEmoji);
document.getElementById("search_field").addEventListener("keyup", autoSearch);

document.querySelector('.clear_icon').addEventListener('click', () => {
    document.getElementById('search_field').value = '';
    displaySearchResults();
});

window.onload = () => {
    displaySearchResults();
};