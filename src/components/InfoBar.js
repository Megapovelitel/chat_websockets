import React from 'react';
import closeIcon from '.././icons/closeIcon.png'
import onlineIcon from '.././icons/onlineIcon.png'
import './InfoBar.css'

const InfoBar = ({room}) => (
    <div className='infoBar'>
        <div className='leftInnerContainer'>
            <img className='onlineIcon' src={onlineIcon} alt = '' />
            <h3>{room}</h3>
            
        </div>

        <div className='RightInnerCointainer'>
            <a style={{padding: '25px'}}href='/'><img src={closeIcon} alt ='' /></a>
        </div>
    </div>
)

export default InfoBar;