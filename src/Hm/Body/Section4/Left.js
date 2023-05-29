import './Left.css';
import ReturnIMA from './IMA';
import Media from 'react-media';


//  Left Compoent 
export default function ReturnLeft() {
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
          {matches.medium && <ScreenMediam />}
          {matches.large && <ScreenLarge />}
        </>
      )}
    </Media>
  );
};


export const ScreenLarge = () => (
  <div className='left-section-4'>
    <View />
  </div>
);
export const ScreenMediam = () => (
  <div className='left-section-4-md'>
    <View />
  </div>
);
export const ScreenSmall = () => (
  <div className='left-section-4-sm'>
    <View />
  </div>
);
export const View = () => (
  <>
    <h4>
      Sécurité de bout en bout, alertes de dépenses.
</h4>
    <ReturnIMA />
    <div></div>
  </>
)