import React from 'react';
import { randomArray, sleep } from '../lib/etc';
import Button from 'react-bootstrap/Button';
import { Container, Row, Col } from 'react-bootstrap';
import './DataVis.css';

// sorting algos
import { quickSort, QUICK_SORT } from '../lib/quickSort';
import { bubbleSort, BUBBLE_SORT } from '../lib/bubbleSort';
import { selectionSort, SELECTION_SORT } from '../lib/selectionSort';
import { stoogeSort, STOOGE_SORT } from '../lib/stoogeSort';
import { mergeSort, MERGE_SORT } from '../lib/mergeSort';

interface IProps {

}

interface IState {
  data: number[],
  active: Function,
  sorting: boolean,
  sorted: boolean,
  comparisonsMap: Map<string, number>,
  algos: { id: string, complexity: string }[]
}

export class DataVis extends React.Component<IProps, IState>{
  constructor(props: IProps) {
    super(props)

    this.state = {
      data: [],
      active: () => { return false },
      sorting: false,
      sorted: false,
      comparisonsMap: new Map(),
      algos: [
        { id: QUICK_SORT, complexity: 'O(n*log(n))' },
        { id: MERGE_SORT, complexity: 'O(n*log(n))' },
        { id: BUBBLE_SORT, complexity: 'O(n²)' },
        { id: SELECTION_SORT, complexity: 'O(n²)' },
        { id: STOOGE_SORT, complexity: 'O(n^2.7095)' },
      ]
    }

    this.Menu = this.Menu.bind(this);
    this.AlgoList = this.AlgoList.bind(this);
    this.AlgoEntry = this.AlgoEntry.bind(this);
  }

  componentDidMount() {
    this.randomizeData()
  }

  render() {
    return <span >
      <h3 style={{ margin: "1rem" }}>Sorting Algorithms</h3>
      <h5 style={{ margin: "1rem" }}>Compare different sorting algorithms and how many comparisons are needed to sort <span style={{ color: "red" }}>200 elements</span></h5>
      <Container style={{ backgroundColor: "grey", paddingTop: "4rem", paddingBottom: "4rem" }}>
        {this.VisualizeData(this.state.data, this.state.data.length)}
      </Container>
      <this.Menu></this.Menu>
    </span>
  }


  VisualizeData(data: number[], l: number) {
    return data.map((d, index) => <div key={index} style={{
      display: "inline-block",
      height: `${d}rem`,
      margin: '1px',
      width: `${35 / l}%`,
      backgroundColor: this.state.sorted ? "#00ff00" : this.state.active(index) ? "#0000ff" : "#000000",
    }}></div>)
  }

  AlgoList() {
    return <>
      {this.state.algos.map(a => {
        return <this.AlgoEntry algoId={a.id} complexity={a.complexity} />
      })}</>
  }

  AlgoEntry(props: { algoId: string, complexity: string }) {
    return (
      <Row >
        <Col >
          <Button disabled={this.state.sorting || this.state.sorted} variant="primary" style={{ margin: "1rem" }} onClick={() => { this.sort(props.algoId) }}>
            {props.algoId}
          </Button>
        </Col>
        <Col className="CenteredText">
          {props.complexity}
        </Col>
        <Col className="CenteredText">
          {this.state.comparisonsMap.get(props.algoId)}
        </Col>
      </Row>
    )
  }

  Menu() {
    return (
      <Container style={{ marginTop: "1rem", width: "40%" }}>
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
        <this.AlgoList />
      </Container>
    )
  }

  randomizeData() {
    this.setState({ data: randomArray(200, 20), sorted: false })
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
      case MERGE_SORT: {
        let comps = 0;
        const updateState = (arr: number[], start: number, end: number, comparisons: number) => {
          comps += comparisons;
          const active = (i: number) => {
            return i >= start && i <= end;
          }
          const stateDataCopy: number[] = []
          this.state.data.forEach(d => {
            stateDataCopy.push(d)
          })
          arr.forEach((d, index) => {
            stateDataCopy[index + start] = d
          })
          this.setState({ data: stateDataCopy, active })
        }
        const sorted = await mergeSort(this.state.data, 0, this.state.data.length - 1, updateState)

        this.setState({ data: sorted })

        this.updateComparison(algo, comps);

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