import React, { Component } from 'react';
import {Data} from './components/Data';

export default class App extends Component {
  constructor(props){
    super(props);
    this.state ={
        movies : Data
    }
  }
  render() {
    let {movies} = this.state;
    return (
      <>
        {
          movies.map(item =>(
            <div key ={item.id}>
              <span>{item.id}</span>
              <span>{item.title}</span>
              <span>{item.body}</span>
              <button>del</button>
            </div>
          ))
          
        }
      </>
    )
  }
}
