import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import _ from 'lodash';
import './center.css';



class displayCenters extends React.Component {
  constructor() {
    super();
    this.state = {}
  }

  componentWillMount() {
    axios.get('api/v1/centers').then((response) => {
      this.setState({
        centers: response.data.centers
      })
    });
  }

  render() {
    const centers = _.map(this.state.centers, (center) => {
      return (
        <div className="row" id={center.id} key={center.id}>
          <div class="col-lg-3">
            <div class="media">
              <img class="img" src="images/image2.jpg"/>
            </div>
          </div>
          <div class="col-lg-9">
            <div class="media-body">
              <h2 class="media-heading">{center.centerName}</h2>
              <div class="col-lg-9">
                <h3><span>Location: </span> {center.location}</h3>
              </div>
              <div class="col-lg-9">
                <h3><span>facilities: </span> {center.facilities}</h3>
              </div>
              <div class="col-lg-9">
                <h3><span>description: </span> {center.description}</h3>
              </div>
            </div>
          </div>
        </div>
      )
    });

    return (
      <div class="container">
        {centers}
      </div>
    );
  }
}

export default displayCenters;