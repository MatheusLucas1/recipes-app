import PropTypes from 'prop-types';

import './css/Toast.css';

export default function ToastContainer({ visible }) {
  if (visible) {
    return <span className="taost">Link copied!</span>;
  }
}

ToastContainer.propTypes = {
  visible: PropTypes.bool.isRequired,
};
