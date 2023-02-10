/** @private */
const COMMENTS_KEY = 'comments';

/** Shared logic */
var CommentService = class {
    /**
     * 
     * @returns {Promise<Array>}
     */
    static getComments = () => {
        const promise = toPromise((resolve, reject) => {
            chrome.storage.local.get([COMMENTS_KEY], (result) => {
                if (chrome.runtime.lastError)
                    reject(chrome.runtime.lastError);

                const researches = result.comments ?? [];
                resolve(researches);
            });
        });

        return promise;
    }

    static saveComment = async (text, author, url) => {
        const comments = await this.getComments();
        const updatedComments = [...comments, { text, author, url}];

        const promise = toPromise((resolve, reject) => {
            
            chrome.storage.local.set({[COMMENTS_KEY]: updatedComments }, () => {          
                if (chrome.runtime.lastError)
                    reject(chrome.runtime.lastError);
                resolve(updatedComments);
            });
        });

        return promise;
    }

    static clearComments = () => {
        const promise = toPromise((resolve, reject) => {
            chrome.storage.local.remove([COMMENTS_KEY], () => {
                if (chrome.runtime.lastError)
                    reject(chrome.runtime.lastError);

                resolve();
            });
        });

        return promise;
    }
}

/**
 * Promisify a callback.
 * @param {Function} callback 
 * @returns {Promise}
 */
const toPromise = (callback) => {
    const promise = new Promise((resolve, reject) => {
        try {
            callback(resolve, reject);
        }
        catch (err) {
            reject(err);
        }
    });
    return promise;
}