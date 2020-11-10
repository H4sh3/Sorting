import React from 'react'; // we need this to make JSX compile
import { randomArray, isSorted } from '../lib/etc';
import { bubbleSort, BUBBLE_SORT } from '../lib/bubbleSort';
import { quickSort, QUICK_SORT } from '../lib/quickSort';
import Button from 'react-bootstrap/Button';
import { Container, Row, Col } from 'react-bootstrap';
import { SELECTION_SORT, selectionSort } from '../lib/selectionSort';
import { STOOGE_SORT, stoogeSort } from '../lib/stoogeSort';

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
      <h1>Sorting Algorithms</h1>
      <Container style={{ backgroundColor: "grey", paddingTop: "4rem", paddingBottom: "4rem" }}>
        {this.visualize(this.state.data, this.state.data.length)}
      </Container>
      <this.Menu></this.Menu>
    </div>
  }

  Menu() {
    return <Container>
      <Row>
        <Col>
          <Button disabled={this.state.sorting || this.state.sorted} variant="primary" style={{ margin: "1rem" }} onClick={() => { this.sort(QUICK_SORT) }}>{QUICK_SORT}</Button>
        </Col>
        <Col>
          <Button disabled={this.state.sorting || this.state.sorted} variant="primary" style={{ margin: "1rem" }} onClick={() => { this.sort(BUBBLE_SORT) }}>{BUBBLE_SORT}</Button>
        </Col>
        <Col>
          <Button disabled={this.state.sorting || this.state.sorted} variant="primary" style={{ margin: "1rem" }} onClick={() => { this.sort(SELECTION_SORT) }}>{SELECTION_SORT}</Button>
        </Col>
        <Col>
          <Button disabled={this.state.sorting || this.state.sorted} variant="primary" style={{ margin: "1rem" }} onClick={() => { this.sort(STOOGE_SORT) }}>{STOOGE_SORT}</Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button disabled={this.state.sorting} variant="danger" style={{ margin: "1rem" }} onClick={() => { this.randomizeData() }}>Randomize</Button>
        </Col>
      </Row>
    </Container>
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
    this.setState({ sorting: false, sorted: isSorted(this.state.data), active: () => { return false } })
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
      case SELECTION_SORT: {
        const updateState = (arr: number[], low: number, high: number) => {
          const active = (i: number) => {
            return i >= low && i <= high;
          }
          this.setState({ data: arr, active })
        }
        await selectionSort(this.state.data, updateState)
        break;
      }
      case STOOGE_SORT: {
        const updateState = (arr: number[], low: number, high: number) => {
          const active = (i: number) => {
            return i >= low && i <= high;
          }
          this.setState({ data: arr, active })
        }
        await stoogeSort(this.state.data, 0, this.state.data.length, updateState)
        break;
      }
      default: {
      }
    }
  }

}