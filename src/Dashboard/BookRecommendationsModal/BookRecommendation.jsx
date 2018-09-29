import React from 'react';

export default function BookRecommendation(props) {
  const { title, coverUrl, author } = props.book;
  return (
    <div className="book-recommendation">

      <div className="book-cover">
      {
        coverUrl &&
          <img className="book-cover" src={coverUrl} alt={title}/>
      }
      {
        !coverUrl &&
          <span>This book has no cover.</span>
      }
      </div>
      <p className="book-recommendation-author">{author}</p>
      <p className="book-recommendation-title">{title}</p>
    </div>
  )

}