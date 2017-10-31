import React from 'react';
import { Memo } from 'components';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class MemoList extends React.Component {

    shouldComponentUpdate(nextProps, nextState) {
        let update = JSON.stringify(this.props) !== JSON.stringify(nextProps);
        return update;
    }
    //commentadd isLoggedIn memo로 보내줘야됨
    render() {
        const mapToComponents = data => {
            return data.map((memo, i) => {
                if( memo.writer !== this.props.currentUser && memo.is_private ) return;
                return (
                    <Memo
                        data={memo}
                        commentUpdateData={this.props.commentUpdateData}
                        ownership={ memo.writer===this.props.currentUser }
                        key={memo._id}
                        onEdit={this.props.onEdit}
                        onRemove={this.props.onRemove}
                        onStar={this.props.onStar}
                        onCommentPost = {this.props.onCommentPost}
                        onCommentEdit = {this.props.onCommentEdit}
                        onCommentRemove = {this.props.onCommentRemove}
                        index={i}
                        currentUser={this.props.currentUser}
                        isLoggedIn={this.props.isLoggedIn}
                    />
                );
            });
        };

        return(
            <div>

                <ReactCSSTransitionGroup
                    transitionName="memo"
                    transitionEnterTimeout={2000}
                    transitionLeaveTimeout={1000}>
                    {mapToComponents(this.props.data)}
                </ReactCSSTransitionGroup>

            </div>
        );
    }
}

MemoList.propTypes = {
    data: React.PropTypes.array,
    currentUser: React.PropTypes.string,
    onEdit: React.PropTypes.func,
    onRemove: React.PropTypes.func,
    onStar: React.PropTypes.func,
    onCommentPost: React.PropTypes.func,
    commentUpdateData:React.PropTypes.object
};

MemoList.defaultProps = {
    data: [],
    commentUpdateData: {
        _id: 'id12367890',
        writer: 'Writer',
        contents: 'Contents',
        comments: [],
        is_edited: false,
        is_private: false,
        date: { edited: new Date(), created: new Date() },
        starred: []
    },
    currentUser: '',
    onEdit: (id, index, contents) => {
        console.error('onEdit not defined');
    },
    onRemove: (id, index) => {
        console.error('onRemove not defined');
    },
    onStar: (id, index) => {
        console.error('onStar not defined');
    },
    onCommentPost: (mId) => {
        console.error('onCommentPost not defined');
    }
};

export default MemoList;
