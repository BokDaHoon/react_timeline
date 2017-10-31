import React from 'react';
import path from 'path';

class Write extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            contents: '',
            image: '',
            isPrivate: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.handlePost = this.handlePost.bind(this);
        this.handleUploadBtnClick = this.handleUploadBtnClick.bind(this);
        this.handleCheckBtnClick = this.handleCheckBtnClick.bind(this);
    }

    handleChange(e) {
        this.setState({
            contents: e.target.value
        });
    }

    handleImageChange(e) {
        const file = e.target.files[0];
        console.log(file);
        // Imagetype Validation Check
        if (file.type === undefined || file.type == '' || file.type.split("/")[0] != 'image') {
            let $toastContent = $('<span style="color: #FFB4BA">' + 'No image file' + '</span>');
            Materialize.toast($toastContent, 2000);
            return;
        }

        this.setState({
            'image': file
        });

    }

    handlePost() {
        let contents = this.state.contents;
        let file = this.state.image;
        let isPrivate = this.state.isPrivate;

        this.props.onPost({ contents, file, isPrivate }).then(
            () => {
                this.setState({
                    contents: "",
                    image: "",
                    isPrivate: false
                });

                this.inputElement.value = '';
            }
        );

    }

    handleUploadBtnClick(element) {
        this.inputElement.click();
    }

    handleCheckBtnClick(e) {
        this.setState({
            isPrivate: !this.state.isPrivate
        });
    }

    render() {
        return (
            <div className="container write" style={{width:'700px', margin:`0 auto`}}>
                <div className="card">
                    <div className="card-content">
                        <textarea className="materialize-textarea" placeholder="Write down your memo"
                        value={this.state.contents}
                        onChange={this.handleChange}></textarea>
                    </div>
                    <div className="card-action" style={{display:'flex', 'justifyContent':'flex-end', 'alignItems':'center'}}>
                            <div style={{marginRight: '10px'}}>
                              <input type="checkbox" className="filled-in" id="filled-in-box" onClick={this.handleCheckBtnClick} checked={this.state.isPrivate} />
                              <label htmlFor="filled-in-box">비공개</label>
                            </div>
                            <div className="right" style={{'marginRight': 'auto'}}>{this.state.image.name}</div>
                            <a onClick={this.handleUpdate}>
                                <input type="file" ref={input => this.inputElement = input} name="file" onChange={this.handleImageChange} style={{'display':'none'}} />
                                <i className="material-icons" onClick={this.handleUploadBtnClick}>add_a_photo</i>
                            </a>
                            <a onClick={this.handlePost}>POST</a>
                    </div>
                </div>
            </div>
        );
    }
}

Write.propTypes = {
    onPost: React.PropTypes.func,
    onUpload: React.PropTypes.func
};

Write.defaultProps = {
    onPost: (contents) => { console.error('onPost not defined'); },
    onUpload: (contents) => { console.error('onUpload not defined'); }
};

export default Write;
