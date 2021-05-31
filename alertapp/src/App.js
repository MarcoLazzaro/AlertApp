import React, {Component} from 'react'
import NavigationBar  from './components/NavigationBar'
import SideMenu from './components/SideMenu'
import Map from './components/Map'
import axios from 'axios'


const api = axios.create({
  baseURL: 'http://localhost:4000'
})


class App extends Component {
  state = { 
    alets: []     //Alerts container
   }

  constructor(){
    super();
    this.getAlerts();
  }

  //funcition to get data from DB
  getAlerts = () => {
    api.post('/getAlert')
    .then((response) => {
      console.log(response.data);
    }).catch(err => {
      console.log(err)
    })
  }

  render() { 
    return ( 
      <div className='App'>
      <NavigationBar>
        <SideMenu/>
      </NavigationBar>
      <div>
        <Map/>
      </div>
    </div>
     );
  }
}
 
export default App;

