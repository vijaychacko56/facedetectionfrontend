import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onSubmit }) => { //can also do props.imageUrlEntry

	return(
		<div>
			<p className ='f3'> {'Detect Faces. Give it a go.'} 	</p>
			<div className='center'>
				<div className = ' form center pa4 br3 shadow-5'>
					<input className = 'f4 pa2 w-70 center' type ='txt' onChange= {onInputChange} />
					<button className = 'w-30 grow f4 link ph3 pv2  dib white bg-light-red' onClick={onSubmit}> {'Detect'} </button>
			    </div>
			</div>
		</div>
		);
}
export default ImageLinkForm; 