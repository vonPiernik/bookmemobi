import React from 'react';
import Modal from 'react-modal';
import { Spinner } from '../../_components';
import GoodreadsMetadata from './GoodreadsMetadata';

import './GoodreadsMetadataModal.css';

function GoodreadsLoadingSpinner(props) {
  console.log('Tworze spinner')
  return (
    <div>
      {props.goodreadsMetadata && props.goodreadsMetadata.metadataLoading &&
        <Spinner role="goodreads-metadata"/>
      }
    </div>
  )
}
export default function GoodreadsMetadataModal(props) {
  const { GoodreadsMetadataModalIsOpen, closeGoodreadsMetadataModal, metadataList, goodreadsMetadata } = props;
  return (
    <Modal
      isOpen={GoodreadsMetadataModalIsOpen}
      onRequestClose={closeGoodreadsMetadataModal}
      contentLabel="TEST"
      className="goodreads-metadata-modal"
    >
    {
      goodreadsMetadata.metadataListLoading &&
        <GoodreadsLoadingSpinner goodreadsMetadata={goodreadsMetadata} />
    }
      <div className="goodreads-metadata-header">
        <h1>Recomendations</h1>
        <button className="side-bar-close-button" onClick={() => closeGoodreadsMetadataModal()} >
          <span></span><span></span>
        </button>
      </div>
      {
        metadataList && metadataList.items &&
          metadataList.items.map(metadata => <GoodreadsMetadata book={metadata} />)
      }

    </Modal>
  )
}