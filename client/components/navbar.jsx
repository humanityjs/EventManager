import React from 'react';
import {Link} from 'react-router-dom';

//create components
export default class NavBar extends React.Component {
  // renderLinks() {
  //   // const pathname = this.props.path;
  //   // if(pathname === '/' || pathname === '/api/v1/about') {
  //     return (
  //       <div className="collapse navbar-collapse" id="navbarResponsive">
  //         <ul className="navbar-nav ml-auto">
  //           <li className="nav-item">
  //             <Link to="/" className="nav-link"><span className="nav-link-text">Home</span></Link>
  //           </li>
  //           <li className="nav-item">
  //             <Link to="/api/v1/centers" className="nav-link"><span className="nav-link-text">centers</span></Link>
  //           </li>
  //           <li className="nav-item">
  //             <Link to="/api/v1/about" className="nav-link"><span className="nav-link-text">about us</span></Link>
  //           </li>
  //         </ul>
  //       </div>
  //     );
  //   // } else if(pathname === '/api/v1/centers') {
  //   //   return (
  //   //     <div className="collapse navbar-collapse" id="navbarResponsive">
  //   //       <ul className="navbar-nav ml-auto">
  //   //         <li className="nav-item">
  //   //           <Link to="/" className="nav-link"><span className="nav-link-text">Home</span></Link>
  //   //         </li>
  //   //         <li className="nav-item">
  //   //           <Link to="/api/v1/centers" className="nav-link"><span className="nav-link-text">centers</span></Link>
  //   //         </li>
  //   //         <li className="nav-item">
  //   //           <Link to="/api/v1/about" className="nav-link"><span className="nav-link-text">about us</span></Link>
  //   //         </li>
  //   //       </ul>
  //   //       <form className="navbar-form navbar-right" role="search">
  //   //         <div className="form-group">
  //   //           <input type="text" placeholder="Search"/><i className="fa fa-search"></i>
  //   //         </div>
  //   //       </form>
  //   //     </div> 
  //   //   );
  //   // } else if(pathname === '/api/v1/user/admin_panel') {
  //   //   return (
  //   //     <div className="collapse navbar-collapse" id="navbarResponsive">
  //   //       <ul className="navbar-nav ml-auto">
  //   //         <li className="nav-item">
  //   //           <Link to="/api/v1/admin_panel" className="nav-link"><span className="nav-link-text"><i className="fa fa-dashboard"></i> Dashboard</span></Link>
  //   //         </li>
  //   //         <li className="nav-item">
  //   //           <Link to="/api/v1/add_center" className="nav-link"><span className="nav-link-text"><i className="fa fa-plus-square"></i> add center</span></Link>
  //   //         </li>
  //   //         <li className="nav-item">
  //   //           <Link to="/api/v1/user/profile" className="nav-link"><span className="nav-link-text"><i className="fa fa-user-circle"></i> profile</span></Link>
  //   //         </li>
  //   //         <li className="nav-item">
  //   //           <Link to="/" className="nav-link"><span className="nav-link-text">logout <i className="fa fa-sign-out"></i></span></Link>
  //   //         </li>
  //   //       </ul>
  //   //       <form className="navbar-form navbar-right" role="search">
  //   //         <div className="form-group">
  //   //           <input type="text" placeholder="Search"/><i className="fa fa-search"></i>
  //   //         </div>
  //   //       </form>
  //   //     </div>
  //   //   );
  //   // } else if(pathname === '/api/v1/add_center' || pathname === '/api/vi/event_status' || pathname === '/api/v1/view_center_event') {
  //   //   return (
  //   //     <div className="collapse navbar-collapse" id="navbarResponsive">
  //   //       <ul className="navbar-nav ml-auto">
  //   //         <li className="nav-item">
  //   //           <Link to="/api/v1/admin_panel" className="nav-link"><span className="nav-link-text"><i className="fa fa-dashboard"></i> Dashboard</span></Link>
  //   //         </li>
  //   //         <li className="nav-item">
  //   //           <Link to="/api/v1/add_center" className="nav-link"><span className="nav-link-text"><i className="fa fa-plus-square"></i> add center</span></Link>
  //   //         </li>
  //   //         <li className="nav-item">
  //   //           <Link to="/api/v1/user/profile" className="nav-link"><span className="nav-link-text"><i className="fa fa-user-circle"></i> profile</span></Link>
  //   //         </li>
  //   //         <li className="nav-item">
  //   //           <Link to="/" className="nav-link"><span className="nav-link-text">logout <i className="fa fa-sign-out"></i></span></Link>
  //   //         </li>
  //   //       </ul>
  //   //     </div>
  //   //   );
  //   // } else if(pathname === '/api/v1/user/user_panel') {
  //   //   return (
  //   //     <div className="collapse navbar-collapse" id="navbarResponsive">
  //   //       <ul className="navbar-nav ml-auto">
  //   //         <li className="nav-item">
  //   //           <Link to="/api/v1/user_panel"  className="nav-link"><span className="nav-link-text"><i className="fa fa-dashboard"></i> Dashboard</span></Link>
  //   //         </li>
  //   //         <li className="nav-item">
  //   //           <Link to="/api/v1/add_event"  className="nav-link"><span className="nav-link-text"><i className="fa fa-plus-square"></i> add center</span></Link>
  //   //         </li>
  //   //         <li className="nav-item">
  //   //           <Link to="/api/v1/user/profile"  className="nav-link"><span className="nav-link-text"><i className="fa fa-user-circle"></i> profile</span></Link>
  //   //         </li>
  //   //         <li className="nav-item">
  //   //           <Link to="/"  className="nav-link"><span className="nav-link-text">logout <i className="fa fa-sign-out"></i></span></Link>
  //   //         </li>
  //   //       </ul>
  //   //       <form className="navbar-form navbar-right" role="search">
  //   //         <div className="form-group">
  //   //           <input type="text" placeholder="Search"/><i className="fa fa-search"></i>
  //   //         </div>
  //   //       </form>
  //   //     </div>
  //   //   );
  //   // } else if(pathname === '/api/v1/add_event') {
  //   //   return (
  //   //     <div className="collapse navbar-collapse" id="navbarResponsive">
  //   //       <ul className="navbar-nav ml-auto">
  //   //         <li className="nav-item">
  //   //           <Link to="/api/v1/user_panel"  className="nav-link"><span className="nav-link-text"><i className="fa fa-dashboard"></i> Dashboard</span></Link>
  //   //         </li>
  //   //         <li className="nav-item">
  //   //           <Link to="/api/v1/add_event"  className="nav-link"><span className="nav-link-text"><i className="fa fa-plus-square"></i> add center</span></Link>
  //   //         </li>
  //   //         <li className="nav-item">
  //   //           <Link to="/api/v1/user/profile"  className="nav-link"><span className="nav-link-text"><i className="fa fa-user-circle"></i> profile</span></Link>
  //   //         </li>
  //   //         <li className="nav-item">
  //   //           <Link to="/"  className="nav-link"><span className="nav-link-text">logout <i className="fa fa-sign-out"></i></span></Link>
  //   //         </li>
  //   //       </ul>
  //   //     </div>
  //   //   );
  //   // } 
  // }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">
        <Link to="/" className="navbar-brand"><h1>event <strong className="text-primary">center </strong></h1></Link>
        <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link"><span className="nav-link-text">Home</span></Link>
            </li>
            <li className="nav-item">
              <Link to="/" className="nav-link"><span className="nav-link-text">centers</span></Link>
            </li>
            <li className="nav-item">
              <Link to="" className="nav-link"><span className="nav-link-text">about us</span></Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}