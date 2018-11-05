import React from 'react';
import Search from './components/Search';
import ViewBuilding from './components/ViewBuilding';
import BuildingList from './components/BuildingList';
import Credit from './components/Credit';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      filterText: '',
      selectedBuilding: 0,
      newBuilding: '',
      data: this.props.data
    };
  }

  filterUpdate(value) {
    //Here you will need to set the filterText property of state to the value passed into this function
    this.setState({
      filterText: value
    })
  }

  selectedUpdate(id) {
    //Here you will need to update the selectedBuilding property of state to the id passed into this function
    this.setState({
      selectedBuilding: id
    })
  }

  selectedDelete(index) {
    //Here you will need to update the selectedBuilding property of state to the id passed into this function
    const d = [...this.state.data]
    d.splice(index, 1);
    this.setState({
      data: d
    })
  }

    handleSubmit(event) {
      console.log('A new building was submitted: ' + this.state.newBuilding);
      event.preventDefault();
      const building = {
        id: this.state.data[this.state.data.length - 1].id + 1, name: this.state.newBuilding
      }

      const d = [...this.state.data, building]
      this.setState({
        data: d,
        newBuilding: ''
      })
    }

    handleChange(event) {
      // if event.target.name == 'id'
      // {id: event.target.value}
      // console.log(event.target.name)

      this.setState({newBuilding: event.target.value});
      
    }

  render() {

    console.log('filterText state from parent component', this.state.filterText)
    
    return (
      <div className="bg">
        <div className="row">
          <h1>UF Directory App</h1>
        </div>

        <Search 
          filterText={this.state.filterText}
          filterUpdate={this.filterUpdate.bind(this)}
          />

        <main>
          <div className="row">
            <div className="column1">
              <div className="tableWrapper">
                <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Code</th> 
                    <th>Building</th>
                  </tr>
                  </thead>
                  <BuildingList
                    data={this.state.data}
                    filterText={this.state.filterText}
                    selectedUpdate={this.selectedUpdate.bind(this)}
                    />
                </table>
              </div>
            </div>
            <div className="column2">
              <ViewBuilding 
                selectedBuilding={this.state.selectedBuilding}
                data={this.state.data}
                selectedDelete={this.selectedDelete.bind(this)}
              />
            </div>
          </div>
          <div>
            <form onSubmit={this.handleSubmit}>
              <label>
                Add New Building:
                <input type="text" name="buildingName" value={this.state.newBuilding} onChange={this.handleChange}/>
              </label>
                <input type="submit" value="Submit" />
            </form>
          </div>
          <Credit />
        </main>
      </div>
    );
  }
}

export default App;
