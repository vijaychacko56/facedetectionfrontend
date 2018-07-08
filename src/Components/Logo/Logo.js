import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import image from './Logo.jpg'



const Logo = () => {

	return (
			<div className = 'ma4 mt0'>
				<Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
 					<div className="Tilt-inner"> <img alt = 'pic shown here' src ={image} /> </div>
				</Tilt>
			</div>
		);
}

export default Logo;