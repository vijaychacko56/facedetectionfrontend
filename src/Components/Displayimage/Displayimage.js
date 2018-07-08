import React from 'react';
import './Displayimage.css';


const Displayimage = ({imageUrlEntered, faceBoxDimnesions}) => {// props is the object passed to the menthod
				
                const boxes = faceBoxDimnesions.map((boxObject,index) => {
                	
					return <div key={index} className='bounding-box' style={{top:boxObject.topBorder, right:boxObject.rightBorder, left:boxObject.leftBorder, bottom:boxObject.bottomBorder}} > </div>
				})

return(
		<div className='center ma'>
			<div className='absolute mt2'>
				<img id='inputImage' alt ="Entered Image" src={imageUrlEntered} width='500px' height='auto'/>
				{boxes}
			</div>
		</div>

	);
}

export default Displayimage;