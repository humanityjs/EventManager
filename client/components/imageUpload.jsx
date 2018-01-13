import React from 'react';
import { connect } from 'react-redux';
import { uploadImage } from '../actions/centerActions';

@connect((store) => {
  return {
    center: store.center,
  }
})
export default class UploadImage extends React.Component {

  fileUpload(e) {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append('image', image);
    formData.append('upload_preset', 'u8asaoka');
    this.props.dispatch(uploadImage(e.target.id, formData));
  }
  render () {
    const { center } = this.props.center;
    return(
      <div class="form-outer text-center">
        <div class="form-inner">
          <img className="img" src={center.image_url}/>
            <label className="btn btn-primary basic">
              Browse <input type="file" id={center.id} onChange={this.fileUpload.bind(this)} hidden/>
            </label>
        </div>
      </div>
          
    )
  }
}