import * as types from 'actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
    post: {
        status: 'INIT',
        error: -1
    },
    list: {
        status: 'INIT',
        data: {
            _id: 'id12367890',
            writer: 'Writer',
            contents: 'Contents',
            comments: [],
            is_edited: false,
            is_private: false,
            date: { edited: new Date(), created: new Date() },
            starred: []
        }
    },
    edit: {
        status: 'INIT',
        error: -1
    },
    remove: {
        status: 'INIT',
        error: -1
    }
};

export default function comment(state, action) {
    if(typeof state === "undefined") {
        state = initialState;
    }
    switch(action.type) {
        case types.COMMENT_POST:
            return update(state, {
                post: {
                    status: { $set: 'WAITING' },
                    error: { $set: -1 }
                }
            });
        case types.COMMENT_POST_SUCCESS:
            return update(state, {
                post: {
                    status: { $set: 'SUCCESS' }
                }
            });
        case types.COMMENT_POST_FAILURE:
            return update(state, {
                post: {
                    status: { $set: 'FAILURE' },
                    error: { $set: action.error }
                }
            });
        case types.COMMENT_LIST:
            return update(state, {
                list: {
                    status: { $set: 'WAITING' }
                }
            });
        case types.COMMENT_LIST_SUCCESS:
            return update(state, {
                list: {
                    status: { $set: 'SUCCESS' },
                    data: { $set: action.commentData }
                }
            });
        /* COMMENT EDIT */
        case types.COMMENT_EDIT:
            return update(state, {
                edit: {
                    status: { $set: 'WAITING ' },
                    error: { $set: -1 }
                }
            });
        case types.COMMENT_EDIT_SUCCESS:
            return update(state, {
                edit: {
                    status: { $set: 'SUCCESS' }
                }
            });
        case types.COMMENT_EDIT_FAILURE:
            return update(state, {
                edit: {
                    status: { $set: 'FAILURE' },
                    error: { $set: action.error }
                }
            });
        /* COMMENT REMOVE */
        case types.COMMENT_REMOVE:
            return update(state, {
                remove: {
                    status: { $set: 'WAITING' },
                    error: { $set: -1 }
                }
            });
        case types.COMMENT_REMOVE_SUCCESS:
            return update(state, {
                remove:{
                    status: { $set: 'SUCCESS' }
                }
            });
        case types.COMMENT_REMOVE_FAILURE:
            return update(state, {
                remove: {
                    status: { $set: 'FAILURE' },
                    error: { $set: action.error }
                }
            });
        default:
            return state;
    }
}
