import React from 'react';
import classnames from 'classnames';

const TextField = ({ field, id, type, placeholder, value, onChange, error}) => {
  return  (
    <div className={classnames('form-group', { 'has-error': error })}>
      <input 
      id={id}
      type={type} 
      placeholder={placeholder} 
      value={value} 
      onChange={onChange} required/>
      {error && <span className="help-block">{error}</span>}
    </div>
  );
}

TextField.propTypes = {
  id: React.PropTypes.string.isRequired;
  type: React.PropTypes.string.isRequired;
  placeholder: React.PropTypes.string.isRequired;
  value: React.PropTypes.string.isRequired;
  onChange: React.PropTypes.func.isRequired; 
  error: React.PropTypes.string;
}

TextField.defaultProps = {
  type: 'text'
}

export default TextField;