import React from 'react';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import { uploadImage } from '../actions/centerActions';

@connect((store) => {
  return {
    center: store.center.center,
  }
})

export default class ImageUpload extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      uploadedImage: ''
    };
  }
  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0]
    });
    this.sendFile(files[0]);
  }

  sendFile(file) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "u8asaoka");
    this.props.dispatch(uploadImage(this.props.center.id, formData));
  }
  
    render() {
      return (
        <div>
        <div className="FileUpload">
        <Dropzone
          multiple={false}
          accept="image/*"
          onDrop={this.onImageDrop.bind(this)}>
          <p>Drop an image or click to select a file to upload.</p>
        </Dropzone>
        </div>
  
        <div>
          {this.state.uploadedImage === '' ? null :
          <div>
            <p>{this.state.uploadedFile.name}</p>
            <img src={this.state.uploadedImage} />
          </div>}
        </div>
        </div>
      )
      
    }
  }