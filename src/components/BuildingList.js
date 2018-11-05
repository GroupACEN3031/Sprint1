import React from 'react';

class BuilingList extends React.Component {
	// selectedUpdate(e) {
	// 	//Here you will need to update the value of the filter with the value from the textbox
	// 	//const val = this.myValue.value
	// 	//this.props.filterUpdate(val)
	// 	console.log(this);
	// }
	render() {
		//console.log('This is my directory file', this.props.data);
		const{ data, filterText, selectedUpdate } = this.props;

		const buildingList = data
			.filter(directory => {
				console.log('in building, ', filterText)
				return directory.name.toLowerCase().indexOf(filterText.toLowerCase()) >= 0  || directory.code.toLowerCase().indexOf(filterText.toLowerCase()) >= 0
			})

			.map(directory => {
				return (
					//<li key={directory.id} className={directory.code}>{directory.name} {directory.code}</li>
				
					<tr key={directory.id} onClick={e => selectedUpdate(directory.id,e)}>
						<td >{directory.code}</td>
						<td >{directory.name}</td>
					</tr>
				)
		})

		return ( 
			<tbody>
					{buildingList}
			</tbody>
		);
	}
}
export default BuilingList;
