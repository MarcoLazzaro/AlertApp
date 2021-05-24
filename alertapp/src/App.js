import React, {Component} from 'react'
import NavigationBar  from './components/NavigationBar'
import SideMenu from './components/SideMenu'
import Map from './components/Map'


class App extends Component {
  state = { 
    alets: []     //Alerts container
   }


  getAlerts(){
    //setup getData
  }

  render() { 
    return ( 
      <div className='App'>
      <NavigationBar></NavigationBar>
      <div>
        <SideMenu/>
        <Map/>
      </div>
    </div>
     );
  }
}
 
export default App;

