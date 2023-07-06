import * as React from 'react';
import './Head.css';
import moment from 'moment';
import { VscCheck, VscCheckAll } from "react-icons/vsc";
import ReturnProfil from './Profil';
import { useNavigate } from 'react-router-dom';
import { HiArrowLeft } from 'react-icons/hi';
import secureLocalStorage from "react-secure-storage";


let Acces = true;


function DrawerAppBar() {

  const pushDocs = secureLocalStorage.getItem("%%docs&&col**unite");

  if (Array.isArray(pushDocs) && pushDocs.length) {
    Acces = true;
  } else {
    Acces = false;
  }

  const navigation = useNavigate();
  const handlepath = (event) => {
    event.preventDefault();
    navigation(-1);

  }

  return (
    <div className='flex-head-list-cmds'>

      <header>
        <div className='container'>
          <nav className='navbar'>

            <HiArrowLeft onClick={handlepath} size={'1.6em'} color={'white'}
              className={'array-static-navbar'}
            />
            <ReturnProfil />

          </nav>
        </div>
      </header>

      <section>

        {
          Acces ?
            <ul>
              {
                [...Array(pushDocs.length).keys()].map(index => {
                  return (
                    <li key={index}>

                      <div className='box-data-cmd-list'>
                        <div></div>
                        <div>
                          <h2>{moment(pushDocs[index].date).format('L')}</h2>
                          <h2>{moment(pushDocs[index].date).format('LTS')}</h2>

                        </div>
                      </div>

                      <div className='cmd-operator-title'>


                        <div className='cmd-operator-sub-title'>
                          <h3>Téléphone</h3>
                          {[...Array(pushDocs[index].data.length).keys()].map(item => {

                            let symbolOk = pushDocs[index].data[item].status ? <VscCheckAll size={'1.3em'} color='white' /> : <VscCheck size={'1.3em'} color='white' />;

                            return (
                              <div className='flex-row-cmd'>
                                <p key={item}>{pushDocs[index].data[item].phone}</p>
                                <p style={{ color: 'transparent' }}>{symbolOk}</p>
                              </div>
                            )
                          })}
                        </div>
                        <div className='cmd-operator-sub-title'>
                          <h3>Unite</h3>
                          {[...Array(pushDocs[index].data.length).keys()].map(item => {

                            let symbolOk = pushDocs[index].data[item].status ? <VscCheckAll size={'1.3em'} color='white' /> : <VscCheck size={'1.3em'} color='white' />;

                            return (
                              <div className='flex-row-cmd'>
                                <p key={item}>{pushDocs[index].data[item].unite}</p>
                                <p style={{ color: 'transparent' }}>{symbolOk}</p>
                              </div>
                            )
                          })}
                        </div>

                        <div className='cmd-operator-sub-title'>
                          <h3>Prix</h3>
                          {[...Array(pushDocs[index].data.length).keys()].map(item => {

                            let symbol = pushDocs[index].data[item].devise === 'USD' ? '$' : 'F';
                            let symbolOk = pushDocs[index].data[item].status ? <VscCheckAll size={'1.3em'} color='green' /> : <VscCheck size={'1.3em'} color='green' />;

                            return (
                              <div className='flex-row-cmd'>
                                <p key={item}>{pushDocs[index].data[item].money} {symbol}</p>
                                <p>{symbolOk}</p>
                              </div>
                            )
                          })}
                        </div>


                      </div>

                    </li>
                  )
                })}
            </ul>

            : <div></div>
        }

      </section>
    </div>
  );
}

export default DrawerAppBar;