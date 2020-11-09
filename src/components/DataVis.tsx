import React from 'react'; // we need this to make JSX compile
import { randomArray } from '../lib/etc';
import { bubbleSort, BUBBLE_SORT } from '../lib/bubbleSorte';
import { quickSort, QUICK_SORT } from '../lib/quickSort';
import Button from 'react-bootstrap/Button';

interface IProps {

}

interface IState {
  data: number[],
  active: Function,
  sorting: boolean,
  sorted: boolean
}

export class DataVis extends React.Component<IProps, IState>{
  constructor(props: IProps) {
    super(props)

    this.state = {
      data: [],
      active: () => { return false },
      sorting: false,
      sorted: false,
    }

    this.Menu = this.Menu.bind(this);
  }

  componentDidMount() {
    this.randomizeData()
  }

  render() {
    return <div >
      <h1>Sorting</h1>
      <div style={{ backgroundColor: "grey", paddingTop: "1rem" }}>
        {this.visualize(this.state.data, this.state.data.length)}
      </div>
      <this.Menu></this.Menu>
    </div>
  }

  Menu() {
    return <span>
      <Button disabled={this.state.sorting || this.state.sorted} variant="primary" style={{ margin: "1rem" }} onClick={() => { this.sort(QUICK_SORT) }}>{QUICK_SORT}</Button>
      <Button disabled={this.state.sorting || this.state.sorted} variant="primary" style={{ margin: "1rem" }} onClick={() => { this.sort(BUBBLE_SORT) }}>{BUBBLE_SORT}</Button>
      <Button disabled={this.state.sorting} variant="primary" style={{ margin: "1rem" }} onClick={() => { this.randomizeData() }}>Randomize Data</Button>
    </span>
  }

  visualize(data: number[], l: number) {
    return data.map((d, index) => <div key={index} style={{
      display: "inline-block",
      height: `${d}rem`,
      margin: '1px',
      width: `${30 / l}rem`,
      backgroundColor: this.state.sorted ? "#00ff00" : this.state.active(index) ? "#0000ff" : "#000000",
    }}></div>)
  }

  randomizeData() {
    this.setState({ data: randomArray(150, 20), sorted: false })
  }

  async sort(algo: string) {
    this.setState({ sorting: true })
    await this.runSortingAlgo(algo)
    this.setState({ sorting: false, sorted: true, active: () => { return false } })
  }

  async runSortingAlgo(algo: string) {
    switch (algo) {
      case QUICK_SORT: {

        const updateState = (arr: number[], low: number, high: number) => {
          const active = (i: number) => {
            return i >= low && i <= high;
          }
          this.setState({ data: arr, active })
        }
        await quickSort(this.state.data, 0, this.state.data.length, updateState)
        break;
      }
      case BUBBLE_SORT: {
        const updateState = (arr: number[], low: number, high: number) => {
          const active = (i: number) => {
            return i >= low && i <= high;
          }
          this.setState({ data: arr, active })
        }
        await bubbleSort(this.state.data, updateState)
        break;
      }
      default: {
      }
    }
  }

}