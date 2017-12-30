import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../actions/signInActions';

//create components
class NavBar extends React.Component {
  logout(e) {
    this.props.logout();
  }

  guestLinks() {
    return (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link to="/" className="nav-link"><span className="nav-link-text">Home</span></Link>
        </li>
        <li className="nav-item">
          <Link to="/view-centers" className="nav-link"><span className="nav-link-text">centers</span></Link>
        </li>
        <li className="nav-item">
          <Link to="/about" className="nav-link"><span className="nav-link-text">about us</span></Link>
        </li>
      </ul>
    );
  };

  userLinks() {
    if (this.props.auth.user.isAdmin) {
      return (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to="/dashboard" className="nav-link"><span className="nav-link-text"><i className="fa fa-dashboard"></i> Dashboard</span></Link>
          </li>
          <li className="nav-item">
            <Link to="/admin-centers" className="nav-link"><span className="nav-link-text"><i className="fa fa-dashboard"></i> centers</span></Link>
          </li>
          <li className="nav-item">
            <Link to="/add-center" className="nav-link"><span className="nav-link-text"><i className="fa fa-plus-square"></i> add center</span></Link>
          </li>
          <li className="nav-item">
            <Link to="/user/profile" className="nav-link"><span className="nav-link-text"><i className="fa fa-user-circle"></i> profile</span></Link>
          </li>
          <li className="nav-item">
            <Link to="/" onClick={this.logout.bind(this)} className="nav-link"><span className="nav-link-text">logout <i className="fa fa-sign-out"></i></span></Link>
          </li>
        </ul>
      );
    }
    return (
      <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link to="/dashboard" className="nav-link"><span className="nav-link-text"><i className="fa fa-dashboard"></i> Dashboard</span></Link>
      </li>
      <li className="nav-item">
        <Link to="/add-event" className="nav-link"><span className="nav-link-text"><i className="fa fa-plus-square"></i> add event</span></Link>
      </li>
      <li className="nav-item">
        <Link to="/user/profile" className="nav-link"><span className="nav-link-text"><i className="fa fa-user-circle"></i> profile</span></Link>
      </li>
      <li className="nav-item">
        <Link to="/" onClick={this.logout.bind(this)} className="nav-link"><span className="nav-link-text">logout <i className="fa fa-sign-out"></i></span></Link>
      </li>
    </ul>
    );
    
  }

  render() {
    const { isAuth } = this.props.auth;
    return (
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">
        <Link to="/" className="navbar-brand"><h1>event <strong className="text-primary">center </strong></h1></Link>
        <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          
          { isAuth ? this.userLinks() : this.guestLinks() }
          
        </div>
      </nav>
    );
  }
}

NavBar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, { logout })(NavBar);