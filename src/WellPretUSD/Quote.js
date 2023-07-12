
import React from 'react';
import Media from 'react-media';
import './Quote.css';

// View Quote Component 
export default function ReturnQuote() {
  return (
    <Media
      queries={{
        small: '(max-width: 599px)',
        medium: '(min-width: 600px) and (max-width:1199px)',
        large: '(min-width: 1200px)',
      }}>
      {matches => (
        <>
          {matches.small && <ScreenSmall />}
          {matches.medium && <ScreenLarge />}
          {matches.large && <ScreenLarge />}
        </>
      )}
    </Media>
  );
};


export const ScreenLarge = () => (
  <div className='wrp-quote-withdraw-pret-success'>
    <ViewText />
  </div>
);
export const ScreenSmall = () => (
  <div className='wrp-quote-withdraw-pret-success-sm'>
    <ViewText />
  </div>
);
export const ViewText = () => {
  return (
    <p>
      Remboursement du prêt client effectué par un mandataire
    </p>
  );
};


