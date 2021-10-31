import React, { useEffect, useState } from 'react';
import LikeButton from './LikeButton';

const DogSNS = () => {
  const breeds = ['shiba', 'terrier', 'retriever', 'husky', 'chihuahua', 'beagle'];
  const numOfImages = 5
  const [dogs, setDogs] = useState([]);
  const [breed, setBreed] = useState(breeds[0]);
  const [likes, setLikes] = useState(new Array(numOfImages))
  const [numLikes, setNumLikes] = useState(0);

  useEffect(() => {
    fetch(`https://dog.ceo/api/breed/${breed}/images/random/${numOfImages}`)
      .then(res => res.json())
      .then(result => {
        setDogs(result.message)
        setLikes(_ => _.fill(false))
        setNumLikes(0)
      })
  }, [breed])

  return (
    <div>
      {breeds.map(breed =>
        <button key={breed} onClick={() => setBreed(breed)}>{breed}</button>
      )}
      <div className='number-of-likes'>
        {numLikes}
      </div>
      <div className='dogsns-list'>
        {dogs.length !== 0 &&
          dogs.map((url, idx) =>
            <div className='dogsns-row' key={url}>
              <img src={url} alt="Dog" width="300" />
              <LikeButton isLiked={likes[idx]} onClick={() => 
                { 
                  if (likes[idx] === true) {
                    setLikes(_ => {_[idx] = false; return _})
                    setNumLikes(numLikes - 1)
                  }
                  else {
                    setLikes(_ => {_[idx] = true; return _})
                    setNumLikes(numLikes + 1)
                  }
                } 
              }/>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default DogSNS;
