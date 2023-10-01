import { Component } from 'react';
import css from './Modal.module.css'

export default class Modal extends Component {
  componentDidMount = () => {
    const { onClose } = this.props;
    window.addEventListener('keydown', onClose);
  };

  componentWillUnmount = () => {
    const { onClose } = this.props;
    window.removeEventListener('keydown', onClose);
  };

  handleClick = e => {
    const { onClose } = this.props;
    if (e.target.nodeName === 'DIV' || e.code === 'Escape') {
      onClose();
    }
  };

  render() {
    const { largeImage } = this.props;
    return (
      <div  onClick={this.handleClick} className={css.Overlay}>
        <div className={css.Modal}>
          <img  src={largeImage} alt="" />
        </div>
      </div>
    );
  }
}
