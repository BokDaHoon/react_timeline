import React from 'react';
import { CommentWrite, Comment } from 'components';
import { connect } from 'react-redux';


class CommentList extends React.Component {
    constructor(props){
      super(props);
    }



    render() {
        const mapToCommentComponents = (data) => {
            return data.map((comment, i) =>{

                return(
                    <Comment
                        key={comment._id}
                        commentData={comment}
                        ownership={ comment.commentWriter === this.props.currentUser }
                        onCommentEdit={this.props.onCommentEdit}
                        onCommentRemove={this.props.onCommentRemove}
                        mId={this.props.data._id}
                    />
                );
            })
        }

        const loadImag = <div className="loading"><img className="loading-image" src={'/preload.gif'} alt="Loading..."/></div>
        const commentWrite = <CommentWrite currentUser={this.props.currentUser}
                                           mId={this.props.data._id}
                                           onCommentPost={this.props.onCommentPost}/>

        return (
            <div>
                <div className="divider" style={{margin:'0 auto' ,padding:'0'}}></div>
                <div className="comment-list">
                    {this.props.commentListStatus === "WAITING"? loadImag : undefined}
                    {this.props.commentUpdateFlag? mapToCommentComponents(this.props.commentUpdateData.comments) : mapToCommentComponents(this.props.data.comments)}
                </div>
                <div className="comment-writebox">
                    {this.props.isLoggedIn? commentWrite : undefined}
                </div>
            </div>
        );
    }
}

CommentList.propTypes = {
    ownership: React.PropTypes.bool,
    onCommentPost: React.PropTypes.func,
    commentUpdateData:React.PropTypes.object,
    currentUser: React.PropTypes.string,
    data: React.PropTypes.object,
    commentUpdateFlag:React.PropTypes.bool
};
CommentList.defaultValue = {
    ownership: true,
    data:{
        _id: 'id12367890',
        writer: 'Writer',
        contents: 'Contents',
        comments: [],
        is_edited: false,
        is_private: false,
        date: { edited: new Date(), created: new Date() },
        starred: []
    },
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
    onCommentPost: (mId) => {
        console.error('onCommentPost not defined');
    }
}

const mapStateToProps = (state) => {
    return {
        commentListStatus: state.comment.list.status,
    };
};

export default connect(mapStateToProps)(CommentList);
