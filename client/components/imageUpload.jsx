import React from 'react';
import { connect } from 'react-redux';
import { uploadImage } from '../actions/centerActions';

@connect((store) => {
  return {
    center: store.center,
  }
})
export default class UploadImage extends React.Component {

  componentDidMount() {
    let imgup = document.getElementById("upload");
    $(document).ready(() => {
      imgup.addEventListener("click", () => {
        cloudinary.openUploadWidget({ cloud_name: 'kalel', upload_preset: 'u8asaoka'}, 
        (error, result) => { 
          console.log(error, result) 
        })
      }, false)
    })
  }
  submit(e) {
    // let imgup = document.getElementById(e.target.id);
    // imgup.addEventListener("click", function() {
    //   console.log('done');
    //   cloudinary.openUploadWidget({ cloud_name: 'kalel', 
    //   upload_preset: 'u8asaoka'}, 
    //     function(error, result) { console.log(error, result) });
    // }, false);

  }
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
              Browse <input type="file" id="upload" hidden/>
            </label>
            
        </div>
      </div>
          
    )
  }
}