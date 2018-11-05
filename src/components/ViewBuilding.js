import React from 'react';

class ViewBuilding extends React.Component {
	render() {

	const{ data, selectedBuilding, selectedDelete } = this.props;

	const building = data
			.filter(directory => {
				
				return directory.id === selectedBuilding
			})

			.map((directory, index) => {
				return (
					//<li key={directory.id} className={directory.code}>{directory.name} {directory.code}</li>
				
					// <tr key={directory.id} onClick={e => selectedUpdate(directory.id,e)}>
					// 	<td >{directory.code}</td>
					// 	<td >{directory.name}</td>
					// </tr>
					<p key={directory.id}>
				      <strong>Code: </strong> {directory.code} <br />
				      <strong>Name: </strong> {directory.name} <br />
				      <strong>Coordinates: </strong> 
				      	<i>latitude - </i> {directory.coordinates && directory.coordinates.latitude ? directory.coordinates.latitude : 'Not provided for this building.'} <br />
				      	<i>longitude - </i> {directory.coordinates && directory.coordinates.longitude ? directory.coordinates.longitude : 'Not provided for this building.'} <br />
				      <strong>Address: </strong> {directory.address || 'Not provided for this building.'} <br />
				      <button onClick={e => selectedDelete(index)}> Delete entry </button>
					</p>
				)
		})

		return (
			<div>
				<div>
					{building.length > 0 ? building : <i>Click on a name to view more information</i>}

				</div>
			</div>
		);
	}
}
export default ViewBuilding;
