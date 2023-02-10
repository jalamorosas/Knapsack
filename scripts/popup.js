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
        // create comment div for popup
        const commentDiv = document.createElement('div');
        commentDiv.classList.add("comment");
        commentList.appendChild(commentDiv);

        const commentContainer = document.createElement('div');
        commentContainer.classList.add("container");
        commentDiv.appendChild(commentContainer);

        // adds clickable link to video comment was pulled from
        const videoLink = document.createElement('a');
        videoLink.setAttribute('href', comment.url);
        videoLink.setAttribute('target', "_blank");
        commentContainer.appendChild(videoLink);

        // display author of comment
        const commentAuthor = document.createElement('h5');
        commentAuthor.innerHTML = comment.author;
        videoLink.appendChild(commentAuthor);

        // display text of the comment
        const commentText = document.createElement('p');
        commentText.title = comment.text;
        commentText.innerHTML = comment.text;
        commentContainer.appendChild(commentText);

    })
}