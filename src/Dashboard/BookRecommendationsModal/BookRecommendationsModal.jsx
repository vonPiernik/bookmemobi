import React from 'react';
import Modal from 'react-modal';

import BookRecommendation from './BookRecommendation';

import './BookRecommendationsModal.css';
export default function BookRecommendationsModal(props) {
  const { bookRecommendationsModalIsOpen, closeBookRecommendationsModal, recommendations } = props;
  console.log(`Modal: ${bookRecommendationsModalIsOpen}, recommendations: ${recommendations}`);
  return (
    <Modal
      isOpen={bookRecommendationsModalIsOpen}
      onRequestClose={closeBookRecommendationsModal}
      contentLabel="TEST"
      className="book-recommendations-modal"
    >
      <div className="book-recommendations-header">
        <h1>Recomendations</h1>
        <button className="side-bar-close-button" onClick={() => closeBookRecommendationsModal()} >
          <span></span><span></span>
        </button>
      </div>
      {
        recommendations &&
          recommendations.map(recommendation => <BookRecommendation book={recommendation} />)
      }

    </Modal>
  )
}