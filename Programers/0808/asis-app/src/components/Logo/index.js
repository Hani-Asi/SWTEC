import logo from './logo.svg';
import PropTypes from 'prop-types'

export default function Logo({ size = 200 }) {
   return (
      <img 
         src={logo} 
         className="App-logo" 
         alt="logo" 
         style={{width: size, height: size}}
      />
   )
}

Logo.propTypes = {
   size: PropTypes.number
}