import React from 'react';
import { randomArray, sleep } from '../lib/etc';
import Button from 'react-bootstrap/Button';
import { Container, Row, Col } from 'react-bootstrap';
import './DataVis.css';

// sorting algos
import { quickSort, QUICK_SORT } from '../lib/quickSort';
import { bubbleSort, BUBBLE_SORT } from '../lib/bubbleSort';
import { SELECTION_SORT, selectionSort } from '../lib/selectionSort';
import { STOOGE_SORT, stoogeSort } from '../lib/stoogeSort';
interface IProps {

}

interface IState {
  data: number[],
  active: Function,
  sorting: boolean,
  sorted: boolean,
  comparisonsMap: Map<string, number>,
}

export class DataVis extends React.Component<IProps, IState>{
  constructor(props: IProps) {
    super(props)

    this.state = {
      data: [],
      active: () => { return false },
      sorting: false,
      sorted: false,
      comparisonsMap: new Map()
    }

    this.Menu = this.Menu.bind(this);
  }

  componentDidMount() {
    this.randomizeData()
  }

  render() {
    return <span >
      <h3 style={{ margin: "1rem" }}>Sorting Algorithms</h3>
      <Container style={{ backgroundColor: "grey", paddingTop: "4rem", paddingBottom: "4rem" }}>
        {this.visualize(this.state.data, this.state.data.length)}
      </Container>
      <this.Menu></this.Menu>
    </span>
  }

  Menu() {
    return <Container style={{ marginTop: "1rem", width: "40%" }}>
      <Row>
        <Col >
          Algorithm
        </Col>
        <Col className="CenteredText">
          Complexity
        </Col>
        <Col className="CenteredText">
          Comparisons
        </Col>
      </Row>

      <Row >
        <Col >
          <Button disabled={this.state.sorting || this.state.sorted} variant="primary" style={{ margin: "2rem" }} onClick={() => { this.sort(QUICK_SORT) }}>{QUICK_SORT}</Button>
        </Col>
        <Col className="CenteredText">
          O(n*log(n))
        </Col>
        <Col className="CenteredText">
          {this.state.comparisonsMap.get(QUICK_SORT)}
        </Col>
      </Row>

      <Row >
        <Col >
          <Button disabled={this.state.sorting || this.state.sorted} variant="primary" style={{ margin: "2rem" }} onClick={() => { this.sort(BUBBLE_SORT) }}>{BUBBLE_SORT}</Button>
        </Col>
        <Col className="CenteredText">
          O(n²)
        </Col>
        <Col className="CenteredText">
          {this.state.comparisonsMap.get(BUBBLE_SORT)}
        </Col>
      </Row>

      <Row >
        <Col >
          <Button disabled={this.state.sorting || this.state.sorted} variant="primary" style={{ margin: "2rem" }} onClick={() => { this.sort(SELECTION_SORT) }}>{SELECTION_SORT}</Button>
        </Col>
        <Col className="CenteredText">
          O(n²)
        </Col>
        <Col className="CenteredText">
          {this.state.comparisonsMap.get(SELECTION_SORT)}
        </Col>
      </Row>

      <Row >
        <Col >
          <Button disabled={this.state.sorting || this.state.sorted} variant="primary" style={{ margin: "2rem" }} onClick={() => { this.sort(STOOGE_SORT) }}>{STOOGE_SORT}</Button>
        </Col>
        <Col className="CenteredText">
          O(n^2.7095)
        </Col>
        <Col className="CenteredText">
          {this.state.comparisonsMap.get(STOOGE_SORT)}
        </Col>
      </Row>
    </Container>
  }

  visualize(data: number[], l: number) {
    return data.map((d, index) => <div key={index} style={{
      display: "inline-block",
      height: `${d}rem`,
      margin: '1px',
      width: `${35 / l}%`,
      backgroundColor: this.state.sorted ? "#00ff00" : this.state.active(index) ? "#0000ff" : "#000000",
    }}></div>)
  }

  randomizeData() {
    this.setState({ data: randomArray(100, 20), sorted: false })
  }

  async sort(algo: string) {
    this.randomizeData()
    this.setState({ sorting: true })
    await sleep(15)
    await this.runSortingAlgo(algo)
    this.setState({ sorting: false, sorted: false, active: () => { return false } })
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
        const comparisons = await quickSort(this.state.data, 0, this.state.data.length - 1, updateState)
        this.updateComparison(algo, comparisons);
        break;
      }
      case BUBBLE_SORT: {
        const updateState = (arr: number[], low: number, high: number) => {
          const active = (i: number) => {
            return i >= low && i <= high;
          }
          this.setState({ data: arr, active })
        }
        const comparisons = await bubbleSort(this.state.data, updateState)
        this.updateComparison(algo, comparisons);
        break;
      }
      case SELECTION_SORT: {
        const updateState = (arr: number[], low: number, high: number) => {
          const active = (i: number) => {
            return i >= low && i <= high;
          }
          this.setState({ data: arr, active })
        }
        const comparisons = await selectionSort(this.state.data, updateState)
        this.updateComparison(algo, comparisons);
        break;
      }
      case STOOGE_SORT: {
        const updateState = (arr: number[], low: number, high: number) => {
          const active = (i: number) => {
            return i >= low && i <= high;
          }
          this.setState({ data: arr, active })
        }
        const comparisons = await stoogeSort(this.state.data, 0, this.state.data.length, updateState)
        this.updateComparison(algo, comparisons);

        break;
      }
      default: {
      }
    }
  }

  updateComparison(algo: string, comparisons: number) {
    const comparisonsMap = new Map(this.state.comparisonsMap)
    comparisonsMap.set(algo, comparisons)
    this.setState({ comparisonsMap })
  }

}