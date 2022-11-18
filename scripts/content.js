(function main() {
    
    const SAVE_CONTAINER = "#header>#header-author>yt-formatted-string";
    const COMMENT_TEXT = "#expander>#content>#content-text";
    const COMMENT_AUTHOR = "#header>#header-author>.ytd-comment-renderer>#author-text>span";
    function saveButton(main) {
        let sb = document.createElement("a");
        sb.id = "save-button";
        sb.style = "margin-left: 5px";
        sb.classList = "yt-simple-endpoint style-scope yt-formatted-string";
        const comment = main.querySelector(COMMENT_TEXT);
        const commentText = comment.innerText;
        const commentAuthor = main.querySelector(COMMENT_AUTHOR);
        const authorText = commentAuthor.innerText
        sb.innerText = "Save"
        sb.onclick = async () => {
            sb.innerText = "Saved";
            await CommentService.saveComment(commentText, authorText);
            console.log("Saved Comment: " + commentText + " -" + authorText);
        };
        return sb;
    }
    
    inject();
    

    function inject () {
        const observerConfig = {childList: true, subtree: true};
        const commentObserver = new MutationObserver(e => {
            for (let mut of e) {
                if (mut.target.id == "contents") {
                    for (let n of mut.addedNodes) {
                        let main = n.querySelector("#body>#main");
                        if (!main) continue;
                        
                        main.querySelector(SAVE_CONTAINER).appendChild(saveButton(main));
                        
                    }
                }
            }
        });
    
        commentObserver.observe(document, observerConfig);
    }
})();
