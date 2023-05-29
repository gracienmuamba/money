
import './Input.css';
import Media from 'react-media';
import { useForm } from 'react-hook-form';

// REturn Input Component 
export default function REturnInput() {
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
 <div className='wrp-input-valided'>
  <FormValid />
 </div>
);
export const ScreenSmall = () => (
 <div className='wrp-input-valided-sm'>
  <FormValid />
 </div>
);
export const FormValid = () => {

 const { register, handleSubmit } = useForm();
 const onSubmit = async (data, event) => {
  event.preventDefault();
  console.log(data);
 };

 return (
  <form onSubmit={handleSubmit(onSubmit)}>
   <label>Nom Compte</label>
   <input type='text' placeholder='' {...register('compte')} name='compte' />
   <label>PIN</label>
   <input type='text' placeholder='••••' {...register('pin')} name='pin' />
   <button className='Btn'>Valider</button>
  </form>
 );
};