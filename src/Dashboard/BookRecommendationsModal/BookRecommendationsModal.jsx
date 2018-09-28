import React from 'react';
import Modal from 'react-modal';
import { Spinner } from '../../_components';
import BookRecommendation from './BookRecommendation';

import './BookRecommendationsModal.css';

function RecommendationLoadingSpinner(props) {
  console.log('Tworze spinner')
  return (
    <div>
      {props.bookRecommendations && props.bookRecommendations.recommendationsLoading &&
        <Spinner role="book-recommendations"/>
      }
    </div>
  )
}
export default function BookRecommendationsModal(props) {
  const { bookRecommendationsModalIsOpen, closeBookRecommendationsModal, recommendations, bookRecommendations } = props;
  console.log(`Modal: ${bookRecommendationsModalIsOpen}, recommendations: ${recommendations}`);
  return (
    <Modal
      isOpen={bookRecommendationsModalIsOpen}
      onRequestClose={closeBookRecommendationsModal}
      contentLabel="TEST"
      className="book-recommendations-modal"
    >
      <RecommendationLoadingSpinner bookRecommendations={bookRecommendations} />
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