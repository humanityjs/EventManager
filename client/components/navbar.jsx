import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../actions/signInActions';

//create components
class NavBar extends React.Component {
  logout(e) {
    e.preventDefault();
    this.props.logout();
  }

  renderLinks() {
    const { path } = this.props;
    if (path === "/" || path === '/about') {
      return (
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link"><span className="nav-link-text">Home</span></Link>
            </li>
            <li className="nav-item">
              <Link to="/centers" className="nav-link"><span className="nav-link-text">centers</span></Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link"><span className="nav-link-text">about us</span></Link>
            </li>
          </ul>
        </div>
      );
    } else if(path === '/centers') {
      return (
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link"><span className="nav-link-text">Home</span></Link>
            </li>
            <li className="nav-item">
              <Link to="/centers" className="nav-link"><span className="nav-link-text">centers</span></Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link"><span className="nav-link-text">about us</span></Link>
            </li>
          </ul>
          <form className="navbar-form navbar-right" role="search">
            <div className="form-group">
              <input type="text" placeholder="Search"/><i className="fa fa-search"></i>
            </div>
          </form>
        </div> 
      );
    } else if(path === '/user/admin_panel') {
      return (
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/admin_panel" className="nav-link"><span className="nav-link-text"><i className="fa fa-dashboard"></i> Dashboard</span></Link>
            </li>
            <li className="nav-item">
              <Link to="/add_center" className="nav-link"><span className="nav-link-text"><i className="fa fa-plus-square"></i> add center</span></Link>
            </li>
            <li className="nav-item">
              <Link to="/user/profile" className="nav-link"><span className="nav-link-text"><i className="fa fa-user-circle"></i> profile</span></Link>
            </li>
            <li className="nav-item">
              <Link to="/" className="nav-link"><span className="nav-link-text">logout <i className="fa fa-sign-out"></i></span></Link>
            </li>
          </ul>
          <form className="navbar-form navbar-right" role="search">
            <div className="form-group">
              <input type="text" placeholder="Search"/><i className="fa fa-search"></i>
            </div>
          </form>
        </div>
      );
    } else if(path === '/add_center' || path === '/api/vi/event_status' || path === '/view_center_event') {
      return (
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/admin_panel" className="nav-link"><span className="nav-link-text"><i className="fa fa-dashboard"></i> Dashboard</span></Link>
            </li>
            <li className="nav-item">
              <Link to="/add_center" className="nav-link"><span className="nav-link-text"><i className="fa fa-plus-square"></i> add center</span></Link>
            </li>
            <li className="nav-item">
              <Link to="/user/profile" className="nav-link"><span className="nav-link-text"><i className="fa fa-user-circle"></i> profile</span></Link>
            </li>
            <li className="nav-item">
              <Link to="/" className="nav-link"><span className="nav-link-text">logout <i className="fa fa-sign-out"></i></span></Link>
            </li>
          </ul>
        </div>
      );
    } else if(path === '/user/user_panel') {
      return (
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/user_panel"  className="nav-link"><span className="nav-link-text"><i className="fa fa-dashboard"></i> Dashboard</span></Link>
            </li>
            <li className="nav-item">
              <Link to="/add_event"  className="nav-link"><span className="nav-link-text"><i className="fa fa-plus-square"></i> add center</span></Link>
            </li>
            <li className="nav-item">
              <Link to="/user/profile"  className="nav-link"><span className="nav-link-text"><i className="fa fa-user-circle"></i> profile</span></Link>
            </li>
            <li className="nav-item">
              <Link to="/"  className="nav-link"><span className="nav-link-text">logout <i className="fa fa-sign-out"></i></span></Link>
            </li>
          </ul>
          <form className="navbar-form navbar-right" role="search">
            <div className="form-group">
              <input type="text" placeholder="Search"/><i className="fa fa-search"></i>
            </div>
          </form>
        </div>
      );
    } else if(path === '/add_event') {
      return (
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/user_panel"  className="nav-link"><span className="nav-link-text"><i className="fa fa-dashboard"></i> Dashboard</span></Link>
            </li>
            <li className="nav-item">
              <Link to="/add_event"  className="nav-link"><span className="nav-link-text"><i className="fa fa-plus-square"></i> add center</span></Link>
            </li>
            <li className="nav-item">
              <Link to="/user/profile"  className="nav-link"><span className="nav-link-text"><i className="fa fa-user-circle"></i> profile</span></Link>
            </li>
            <li className="nav-item">
              <Link to="/"  className="nav-link"><span className="nav-link-text">logout <i className="fa fa-sign-out"></i></span></Link>
            </li>
          </ul>
        </div>
      );
    } 
  }

  render() {
    const { isAuth } = this.props.auth;
    return (
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">
        <Link to="/" className="navbar-brand"><h1>event <strong className="text-primary">center </strong></h1></Link>
        <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        {this.renderLinks()}
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