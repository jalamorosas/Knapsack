document.addEventListener('DOMContentLoaded', async () => {
    displayComments();

    const clearHistoryBtn = document.getElementById('clear-history');
    clearHistoryBtn.onclick = async () => {
        await CommentService.clearComments();
        await displayComments();
    };
});

const displayComments = async () => {
    const savedComments = await CommentService.getComments();
    const commentList = document.getElementById("comment-list")

    commentList.innerHTML = '';

    savedComments.forEach(comment => {
        const commentItem = document.createElement('div');
        commentItem.classList.add("comment");
        commentList.appendChild(commentItem);

        const commentContainer = document.createElement('div');
        commentContainer.classList.add("container");
        commentItem.appendChild(commentContainer);

        const commentAuthor = document.createElement('h5');
        commentAuthor.innerHTML = comment.author;
        commentContainer.appendChild(commentAuthor);
        
        const commentLink = document.createElement('p');
        commentLink.title = comment.text;
        commentLink.innerHTML = comment.text;
        // commentLink.href = comment.url;
        // commentLink.onclick = async (ev) => {
        //     ev.preventDefault();
        //     await chrome.tabs.create({ url: ev.target.href, active: false });
        // };
        commentContainer.appendChild(commentLink);
    })
}