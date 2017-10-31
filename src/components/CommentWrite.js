import React from 'react';
import Avatar from 'material-ui/Avatar';

class CommentWrite extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            contents: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handlePost = this.handlePost.bind(this);
    }
    handleChange(e) {
        this.setState({
            contents: e.target.value
        });
    }

    handlePost() {
        let mId = this.props.mId;
        let contents = this.state.contents;


        this.props.onCommentPost(mId,contents).then(
            () => {
                this.setState({
                    contents: ""
                });
            }
        )
    }

    render() {
        var writerString = this.props.currentUser;
        var avatarFilePath = "http://www.material-ui.com/images/jsa-128.jpg";
        if(typeof writerString != "undefined" && writerString.length >= 1) {
            var firstAlpha = writerString.toLowerCase()[0];
            if(firstAlpha >= 'a' && firstAlpha <= 'z')
                avatarFilePath = "/avatar/" + firstAlpha + ".jpg";
        }

        return (
            <div className="comment_layout comment_table">
              <div className="comment_row">
                <div className="comment_cell comment_avatar">
                    <Avatar src={avatarFilePath} />
                </div>
                <div className="input-field comment_cell comment_input_content">
                    <label >Comment</label>
                    <input type="text" className="validate"
                                       value={this.state.contents}
                                       onChange={this.handleChange}/>
                </div>
                <div className="input-field comment_cell comment_btn">
                    <a onClick={this.handlePost}>POST</a>
                </div>
              </div>
            </div>
        );
    }
}

CommentWrite.propTypes = {
    currentUser : React.PropTypes.string,
    onCommentPost: React.PropTypes.func
};

CommentWrite.defaultProps = {
    onCommentPost: (mId) => {
        console.error('onCommentPost not defined');
    }
}

export default CommentWrite;
