import React, { Component } from "react";
import ReactModal from "react-modal";
import { Link } from "react-router-dom";
ReactModal.setAppElement("#root");

export default class Modal extends Component{

  renderRegularModal = () => {
    const { message, closeModal, modalState, clearPage } = this.props;
    return(
      <ReactModal
        isOpen={ modalState }
        onRequestClose={ closeModal }
        shouldCloseOnOverlayClick={ true }
      >
        <p>
          { message }
        </p>
        <button onClick={ clearPage || closeModal }>Stäng</button>
      </ReactModal>
    )
  }

  /** Used for error cases when we don't want the user to be able to close the modal,
   * for e.x on booking page if api can't be reached at all.
   * Then we use the modal to stop the user from trying to book.
  */
  renderNonClosableModal = () => {
    const { message, modalState } = this.props;
    return(
      <ReactModal
        isOpen={ modalState }
        shouldCloseOnOverlayClick={false}
      >
        <p>
          { message }
          <Link to="/contact">Kontakt.</Link>
        </p>
      </ReactModal>
    );
  }

  render(){
    return(
      <React.Fragment>
        {this.props.showRegularModal &&
          <React.Fragment>
            {this.renderRegularModal()}
          </React.Fragment>
        }
        {!this.props.showRegularModal &&
          <React.Fragment>
            {this.renderNonClosableModal()}
          </React.Fragment>
        }
      </React.Fragment>
    );
  }
}
