import React from 'react';

export default function BookRecommendation(props) {
  const { title, coverUrl, author } = props.book;
  return (
    <div className="book-recommendation">
      <div className="book-cover"><img className="book-cover" src={coverUrl} alt={title}/></div>
      <p className="book-recommendation-author">{author}</p>
      <p className="book-recommendation-title">{title}</p>
    </div>
  )

}