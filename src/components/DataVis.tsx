import React from 'react'; // we need this to make JSX compile
import { randomArray } from '../lib/etc';
import bubbleSort from '../lib/bubbleSorte';
import { quickSort } from '../lib/quickSort';

interface IProps {

}

interface IState {
  data: number[]
}

export class DataVis extends React.Component<IProps, IState>{
  constructor(props: IProps) {
    super(props)

    this.state = {
      data: []
    }
  }

  randomizeData() {
    this.setState({ data: randomArray(100, 20) })
  }

  componentDidMount() {
    this.randomizeData()
  }

  render() {
    return <div style={{ backgroundColor: "grey" }}>
      <div>{this.visualize(this.state.data, this.state.data.length)}</div>
      <button onClick={() => { this.sort() }}>Sort</button>
      <button onClick={() => { this.randomizeData() }}>Randomize Data</button>
    </div>
  }

  visualize(data: number[], l: number) {
    return data.map((d, index) => <div key={index} style={{
      display: "inline-block",
      height: `${d}rem`,
      margin: '2px',
      width: `${50 / l}rem`,
      backgroundColor: "#ff5500",
      border: "solid 2px black"
    }}></div>)
  }

  async sort() {
    const updateState = (arr: number[]) => {
      this.setState({ data: arr })
    }
    // bubbleSort(this.state.data, updateState)
    await quickSort(this.state.data, 0, this.state.data.length, updateState)
  }

}