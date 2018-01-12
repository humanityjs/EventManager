import React from 'react';

export default class ModalContent extends React.Component {
  render() {
    const { message } = this.props;
    return (
      <div className="modal fade" id="event">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="form-inner text-center">
                  <div className="form-inner">
                    <p className="text-primary">kj</p>
                    <i id="approve" className="fa fa-thumbs-up green"></i>
                    <i data-toggle-id="disapprove" className="fa fa-thumbs-down red" ></i>
                    <br/>
                    <span><br/>Approve</span>
                    <span><br/>Disapprove</span>
                    <div id="disapprove" hidden>
                  
                      <p> Disapproved event will be deleted. Are you sure you want to disapprove event?</p>
                      <i id="disapprove" className="fa fa-trash red"></i>
                      <i data-toggle-id="disapprove" className="fa fa-close" ></i>
                      <br/>
                      <span><br/>delete</span>
                      <span><br/>cancel</span>
                     
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    );
  }
}