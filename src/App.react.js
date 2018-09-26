import React, {Component}  from 'react'
import ReactDOM from 'react-dom'

import StoreDashboard from './components/StoreDashboard.react'
import STORE_DATA from './data/store_items.json'

import './globalStyles.scss'


export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      storeData: [],
      loading: true
    }
  }

  componentDidMount() {
    this.setState({
      storeData: STORE_DATA,
      loading: false
    })
  }

  render() { return <StoreDashboard {...this.state} /> }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
