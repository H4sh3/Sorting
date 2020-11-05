import React from 'react'; // we need this to make JSX compile
import { randomArray } from '../lib/etc';

interface IProps {

}

interface IState {
  data: number[]
}

export class DataVis extends React.Component<IProps, IState>{
  constructor(props: IProps) {
    super(props)

    this.state = {
      data: []//randomArray(100, 10)
    }
  }
  
  randomizeData() {
    this.setState({ data: randomArray(100, 10) })
  }
  
  componentDidMount(){
    this.randomizeData()
  }

  render() {
    return <div>
      <div>{this.visualize(this.state.data, this.state.data.length)}</div>
      <button onClick={() => { this.sort() }}>Sort</button>
      <button onClick={() => { this.randomizeData() }}>Randomize Data</button>
    </div>
  }

  visualize(data: number[], l: number) {
    return data.map((d, index) => <div key={index} style={{
      display: "inline-block",
      margin: "2px",
      height: `${d}rem`,
      width: `${50 / l}rem`,
      backgroundColor: "black"
    }}></div>)
  }

  sort() {
    this.setState({ data: this.state.data.sort() })
  }

}