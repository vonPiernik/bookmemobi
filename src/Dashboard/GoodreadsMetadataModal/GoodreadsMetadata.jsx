import React from 'react';

export default function GoodreadsMetadata(props) {
  const { title, author, publishingDate } = props.book;
  let pDate = new Date(publishingDate);
  let pYear = pDate.getFullYear();
  return (
    <div className="goodreads-meta">

      <p className="goodreads-meta-author">{author} (<span className="goodreads-meta-publishing-date">{pYear}</span>)</p>
      <p className="goodreads-meta-title">{title}</p>
    </div>
  )

}