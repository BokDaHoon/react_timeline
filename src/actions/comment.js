import {
    COMMENT_POST,
    COMMENT_POST_SUCCESS,
    COMMENT_POST_FAILURE,
    COMMENT_LIST,
    COMMENT_LIST_SUCCESS,
    COMMENT_LIST_FAILURE,
    COMMENT_EDIT,
    COMMENT_EDIT_SUCCESS,
    COMMENT_EDIT_FAILURE,
    COMMENT_REMOVE,
    COMMENT_REMOVE_SUCCESS,
    COMMENT_REMOVE_FAILURE
} from './ActionTypes';
import axios from 'axios';


//commentadd post
export function commentPostRequest(mId, contents) {
    return (dispatch) => {
        // inform comment POST API is starting
        dispatch(commentPost());

        return axios.post('/api/comment', { mId, contents })
        .then((response) => {
            dispatch(commentPostSuccess());
        }).catch((error) => {
            dispatch(commentPostFailure(error.response.data.code));
        });
    };
}

export function commentPost() {
    return {
        type: COMMENT_POST
    };
}

export function commentPostSuccess() {
    return {
        type: COMMENT_POST_SUCCESS
    };
}

export function commentPostFailure(error) {
    return {
        type: COMMENT_POST_FAILURE,
        error
    };
}

/* CODES */

/* MEMO LIST */

/*
    Parameter:
        - isInitial: whether it is for initial loading
        - listType:  OPTIONAL; loading 'old' memo or 'new' memo
        - id:        OPTIONAL; memo id (one at the bottom or one at the top)
        - username:  OPTIONAL; find memos of following user
*/
export function commentListRequest(isInitial, id) {
    return (dispatch) => {
        // inform comment list API is starting
        dispatch(commentList());

        let url = '/api/comment/';

        // username not given, load public memo
        url = isInitial ? url : `${url}/${id}`;

        return axios.get(url)
        .then((response) => {
            dispatch(commentListSuccess(response.data));
        }).catch((error) => {
            dispatch(commentListFailure());
        });
    }
}

export function commentList() {
    return {
        type: COMMENT_LIST
    };
}

export function commentListSuccess(commentData) {
    return {
        type: COMMENT_LIST_SUCCESS,
        commentData,
    };
}

export function commentListFailure() {
    return {
        type: COMMENT_LIST_FAILURE
    };
}

/* COMMENT EDIT */
export function commentEditRequest(mId, contents) {
    return (dispatch) => {
        dispatch(commentEdit());
        return axios.put('/api/comment/' + mId, { contents })
        .then((response) => {
            dispatch(commentEditSuccess(response.data.comment));
        }).catch((error) => {
            dispatch(commentEditFailure(error.response.data.code));
        });
    };
}

export function commentEdit() {
    return {
        type: COMMENT_EDIT
    };
}

export function commentEditSuccess(comment) {
    return {
        type: COMMENT_EDIT_SUCCESS,
        comment
    };
}

export function commentEditFailure(error) {
    return {
        type: COMMENT_EDIT_FAILURE,
        error
    };
}

/* COMMENT REMOVE */
export function commentRemoveRequest(mId,cId) {
    return (dispatch) => {
        dispatch(commentRemove());
        return axios.delete('/api/comment/' + cId)
        .then((response)=> {
            dispatch(commentRemoveSuccess());
        }).catch((error) => {
            console.log(error);
            dispatch(commentRemoveFailure(error.response.data.code));
        });
    };
}

export function commentRemove() {
    return {
        type: COMMENT_REMOVE
    };
}

export function commentRemoveSuccess() {
    return {
        type: COMMENT_REMOVE_SUCCESS
    };
}

export function commentRemoveFailure(error) {
    return {
        type: COMMENT_REMOVE_FAILURE,
        error
    };
}
