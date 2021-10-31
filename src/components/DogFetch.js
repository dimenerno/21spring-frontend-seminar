import React, { useState, useEffect } from 'react';

const DogFetch = () => {
  const [imageURL, setImageURL] = useState('');

  useEffect(() => {
    fetch('https://dog.ceo/api/breeds/image/random')
      .then(data => data.json())
      .then(result => {
        if (result.status === 'success')
          setImageURL(result.message);
      });
  }, [])

  return (
    <div>
      {imageURL !== "" && <img src={imageURL} alt="Dog" />}
    </div>
  )
}

export default DogFetch;
