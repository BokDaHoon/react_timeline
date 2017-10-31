import React from 'react';
import TimeAgo from 'react-timeago';
import { Link } from 'react-router-dom';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {CommentList} from 'components';

class Memo extends React.Component {
    //commentadd
    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            value: props.data.contents,
            isPrivate: props.data.is_private,
            commentExtensionMode: false
        };
        this.toggleCommenet = this.toggleCommenet.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleStar = this.handleStar.bind(this);
        this.handleCheckBtnChange = this.handleCheckBtnChange.bind(this);
    }

    componentDidMount() {
        // WHEN COMPONENT MOUNTS, INITIALIZE DROPDOWN
        // (TRIGGERED WHEN REFRESHED)
        $('#dropdown-button-'+this.props.data._id).dropdown({
            belowOrigin: true // Displays dropdown below the button
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        let current = {
            props: this.props,
            state: this.state
        };

        let next = {
            props: nextProps,
            state: nextState
        };

        let update = JSON.stringify(current) !== JSON.stringify(next);
        return update;
    }

    componentDidUpdate(prevProps, prveState) {
        // WHEN COMPONENT UPDATES, INITIALIZE DROPDOWN
        // (TRIGGERED WHEN LOGGED IN)
        $('#dropdown-button-'+this.props.data._id).dropdown({
            belowOrigin: true // Displays dropdown below the button
        });

        if(this.state.editMode) {
            // Trigger key up event to the edit input so that it auto-resizes (Materializecss Feature)
            $(this.input).keyup();
        }
    }

    toggleCommenet(){
        if(this.state.commentExtensionMode)
        {
            this.setState({
                commentExtensionMode: !this.state.commentExtensionMode
            });
        } else {
            this.setState({
                commentExtensionMode: !this.state.commentExtensionMode
            });
        }
    }

    toggleEdit() {
        if(this.state.editMode) {
            let id = this.props.data._id;
            let index = this.props.index;
            let contents = this.state.value;
            let isPrivate = this.state.isPrivate;

            this.props.onEdit(id, index, contents, isPrivate).then(() => {
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
        const id = this.props.data._id;
        const index = this.props.index;

        this.props.onRemove(id, index);
    }

    handleStar() {
        const id = this.props.data._id;
        const index = this.props.index;

        this.props.onStar(id, index);
    }

    handleCheckBtnChange() {
        this.setState({
            isPrivate: !this.state.isPrivate
        });
    }

    render() {
        var { data, ownership } = this.props;

        const dropDownMenu = (
            <div className="option-button">
                <a className='dropdown-button'
                     id={`dropdown-button-${data._id}`}
                     data-activates={`dropdown-${data._id}`}>
                    <i className="material-icons icon-button">more_vert</i>
                </a>
                <ul id={`dropdown-${data._id}`} className='dropdown-content'>
                    <li><a onClick={this.toggleEdit}>Edit</a></li>
                    <li><a onClick={this.handleRemove}>Remove</a></li>
                </ul>
            </div>
        );

        // EDITED info
        const editedInfo = (
            <span style={{color: '#AAB5BC'}}> · Edited <TimeAgo date={this.props.data.date.edited} live={true}/></span>
        );

        const favoriteStyle = (this.props.data.starred.indexOf(this.props.currentUser) > -1) ? { color: '#ED0000' } : { };

        const imageView = (<CardMedia actAsExpander={true} mediaStyle={{width:`90%`, margin:'0 auto'}}>
                               <img src={this.props.data.img} alt="" />
                           </CardMedia>
        );

        const isPrivateView = (<div className="right" style={{'position': 'relative', 'top': '11px', 'color': '#747474'}}>
                                  [비공개]
                               </div>
        );

        //commentadd info
        var commentUpdateFlag = this.props.commentUpdateData._id === this.props.data._id? true : false
        const extensionStyle = this.state.commentExtensionMode ? {color : '#00FFFF'} : { };
        const commentList = <CommentList isLoggedIn={this.props.isLoggedIn}
                                         currentUser={this.props.currentUser}
                                         data={this.props.data}
                                         commentUpdateFlag={commentUpdateFlag}
                                         commentUpdateData={this.props.commentUpdateData}
                                         onCommentEdit = {this.props.onCommentEdit}
                                         onCommentRemove = {this.props.onCommentRemove}
                                         onCommentPost={this.props.onCommentPost}/>
            /*
            <div className="card">
                <div className="info">
                    <Link to={`/wall/${this.props.data.writer}`} className="username">{data.writer}</Link> wrote a log · <TimeAgo date={data.date.created}/>
                    { this.props.data.is_edited ? editedInfo : undefined }
                    { ownership ? dropDownMenu : undefined }
                </div>
                <div className="card-content">
                    {data.contents}
                </div>
                <div className="footer">
                    <i className="material-icons log-footer-icon favorite icon-button" style={favoriteStyle} onClick={this.handleStar}>favorite</i>
                    <span className="favorite-count">{data.starred.length}</span>
                </div>
            </div>
            */
        var writerString = data.writer;
        var avatarFilePath = "http://www.material-ui.com/images/jsa-128.jpg";
        if(typeof writerString != "undefined" && writerString.length >= 1) {
            var firstAlpha = writerString.toLowerCase()[0];
            if(firstAlpha >= 'a' && firstAlpha <= 'z')
                avatarFilePath = "/avatar/" + firstAlpha + ".jpg";
        }
        
        const memoView = (
            <div className="card" style={{width:700, margin:`0 auto`}}>
                <Card style={{margin:'0 0 15px 0'}}>
                    <CardHeader
                      title={<Link to={`/wall/${data.writer}`} className="username">{data.writer}</Link>}
                      subtitle={<TimeAgo date={data.date.created}/>}
                      avatar={avatarFilePath}
                    >
                        { ownership ? dropDownMenu : undefined }
                    </CardHeader>
                    { (data.img != '') ? imageView : undefined }
                    <CardText style={{width:`100%`, margin:'0 auto', fontSize:'17px'}}>
                        {data.contents}
                    </CardText>
                    <CardActions>
                        <div className="footer">
                            <i className="material-icons log-footer-icon favorite icon-button" style={favoriteStyle} onClick={this.handleStar}>favorite</i>
                            <span className="favorite-count">{data.starred.length}</span>
                            { data.is_private ? isPrivateView : undefined }

                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <i className="material-icons log-footer-icon comment icon-button" style={extensionStyle} onClick={this.toggleCommenet}>comment</i>
                            <span className="comment-count">{commentUpdateFlag? this.props.commentUpdateData.comments.length : data.comments.length }</span>
                        </div>
                    </CardActions>
                    <div className="comment-list">
                        {this.state.commentExtensionMode ? commentList : undefined}
                    </div>
                </Card>
            </div>

        );

        const editView = (
            <div className="write" style={{width:'700px', margin:`0 auto`}}>
                <div className="card">
                    <div className="card-content">
                        <textarea
                            ref={ ref => { this.input = ref; } }
                            className="materialize-textarea"
                            value={this.state.value}
                            onChange={this.handleChange}></textarea>
                    </div>
                    <div className="card-action" style={{display:'flex', 'justifyContent':'flex-end', 'alignItems':'center'}}>
                        <div style={{marginRight: '20px'}}>
                          <input type="checkbox" className="filled-in" id="filled-in-edit" onChange={this.handleCheckBtnChange} checked={this.state.isPrivate} />
                          <label htmlFor="filled-in-edit">비공개</label>
                        </div>
                        <a onClick={this.toggleEdit}>OK</a>
                    </div>
                </div>
            </div>
        );

        return(
            <div className="container memo">
               { this.state.editMode ? editView : memoView }
           </div>
        );
    }
}

Memo.propTypes = {
    data: React.PropTypes.object,
    ownership: React.PropTypes.bool,
    onEdit: React.PropTypes.func,
    onRemove: React.PropTypes.func,
    onStar: React.PropTypes.func,
    currentUser: React.PropTypes.string,
    isLoggedIn: React.PropTypes.bool,
    onCommentPost: React.PropTypes.func,
    commentUpdateData:React.PropTypes.object
};

Memo.defaultProps = {
    data: {
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
    ownership: true,
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
    },
    currentUser: ''
};

export default Memo;
