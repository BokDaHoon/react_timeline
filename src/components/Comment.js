import React from 'react';
import Avatar from 'material-ui/Avatar';
import TimeAgo from 'react-timeago';

// <p>{commentData.commentWriter} | {commentData.commentContents}</p>
class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            value: props.commentData.commentContents
        };
        this.toggleEdit = this.toggleEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }

    toggleEdit() {
        if(this.state.editMode) {
            let mId = this.props.mId;
            let cId = this.props.commentData._id;
            let contents = this.state.value;
            this.props.onCommentEdit(mId, cId, contents).then(() => {
                this.setState({
                    editMode: !this.state.editMode
                });
            });
        } else {
            this.setState({
                editMode: !this.state.editMode
            });
        }

    }

    handleChange(e) {
        this.setState({
            value: e.target.value
        });
    }

    handleRemove() {
        const mId = this.props.mId;
        const cId = this.props.commentData._id;
        this.props.onCommentRemove(mId,cId);
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.state.editMode) {
            // Trigger key up event to the edit input so that it auto-resizes (Materializecss Feature)
            $(this.input).keyup();
        }
        $('#dropdown-button-'+this.props.commentData._id).dropdown({
            belowOrigin: true // Displays dropdown below the button
        });
    }


    componentDidMount() {
        // WHEN COMPONENT MOUNTS, INITIALIZE DROPDOWN
        $('#dropdown-button-'+this.props.commentData._id).dropdown({
            belowOrigin: true // Displays dropdown below the button
        });
    }


    render() {
        var {commentData, ownership} = this.props;
        console.log(commentData);

        const viewMenu = (
            <div className="comment_subcontent">
                <TimeAgo date={commentData.date} live={true}/>
            </div>
        );

        const editMenu = (
          <div className="comment_subcontent">
            <ul className="comment_edit_menu">
              <li><TimeAgo date={commentData.date} live={true}/></li>
              <li><a onClick={this.toggleEdit}>Edit</a></li>
              <li><a onClick={this.handleRemove}>Remove</a></li>
            </ul>
          </div>
        );

        var writerString = commentData.commentWriter;
        var avatarFilePath = "http://www.material-ui.com/images/jsa-128.jpg";
        if(typeof writerString != "undefined" && writerString.length >= 1) {
            var firstAlpha = writerString.toLowerCase()[0];
            if(firstAlpha >= 'a' && firstAlpha <= 'z')
                avatarFilePath = "/avatar/" + firstAlpha + ".jpg";
        }

        const viewComment = (
            <div className="comment_row">
            <div className="comment_cell comment_avatar">
                <Avatar src={avatarFilePath} />
            </div>
                <div className="comment_cell comment_content">
                    <b> {commentData.commentWriter} </b>
                    &nbsp;&nbsp;{commentData.commentContents}
                    { ownership ? editMenu : viewMenu }
                </div>
            </div>
        );

        const editComment = (
            <div className="comment_row">
                <div className="comment_cell comment_avatar">
                    <Avatar src={avatarFilePath} />
                </div>
                <div className="input-field comment_cell comment_input_content">
                    <input type="text"  className="validate"
                            value={this.state.value}
                            onChange={this.handleChange}/>

                </div>
                <div className="input-field comment_cell comment_btn">
                    <a onClick={this.toggleEdit}>OK</a>
                </div>
            </div>
    );

        // const commentDropDownMenu = (
        //     <div className="option-button">
        //         <a className='dropdown-button'
        //              id={`dropdown-button-${commentData._id}`}
        //              data-activates={`dropdown-${commentData._id}`}>
        //             <i className="material-icons icon-button">more_vert</i>
        //         </a>
        //         <ul id={`dropdown-${commentData._id}`} className='dropdown-content'>
        //             <li><a onClick={this.handleCommentRemove}>Remove</a></li>
        //         </ul>
        //     </div>
        // );


        return (
            <div className="comment_layout comment_table">
                  { this.state.editMode ? editComment : viewComment }
            </div>
        );


    }
}

Comment.propTypes = {
    commentData: React.PropTypes.object,
    ownership: React.PropTypes.bool,
    onCommentEdit: React.PropTypes.func,
    onCommentRemove: React.PropTypes.func
};

Comment.defaultProps = {
    ownership: false,
    commentData : {
        "_id" : "id123456789",
        "commentWriter" : "Wrier",
        "commentContents" : "contetns",
        "date" : new Date()
    },
    ownership:true,
    onCommentEdit: (id, contents) => {
        console.error('onEdit not defined');
    },
    onCommentRemove: (id) => {
        console.error('onRemove not defined');
    }
}

export default Comment;
