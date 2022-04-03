import React, { createRef, PureComponent, RefObject } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { extent, line, ScaleLinear, scaleLinear, select } from 'd3';

type dataPoint = {
  x: number,
  y1: number,
  y2: number
};

/// TODO: use .tsv
const exampleData: dataPoint[] = [
  { x: 1.0, y1: 0.001, y2: 0.63 },
  { x: 2.0, y1: 0.003, y2: 0.84 },
  { x: 3.0, y1: 0.024, y2: 0.56 },
  { x: 4.0, y1: 0.054, y2: 0.22 },
  { x: 5.0, y1: 0.062, y2: 0.15 },
  { x: 6.0, y1: 0.100, y2: 0.08 },
  { x: 7.0, y1: 0.176, y2: 0.20 },
  { x: 8.0, y1: 0.198, y2: 0.71 },
  { x: 9.0, y1: 0.199, y2: 0.65 }
];

const chartWidth = 600;
const chartHeight = 300;

class TestB extends PureComponent{

  private readonly svgRef: RefObject<SVGSVGElement> = createRef();

  componentDidMount() {
    //this.setScales();
    this.drawChart();
  }

  drawChart = () => {
    
    const xExtent = extent(exampleData, d => d['x']);
    const y1Extent = extent(exampleData, d => d['y1']);
    const y2Extent = extent(exampleData, d => d['y2']);

    const scaleX = scaleLinear()
      .domain( xExtent as [number, number] )
      .range([0, chartWidth]);

    const scaleY1 = scaleLinear()
      .domain(y1Extent as [number, number])
      .range([chartHeight, 0]);

    const scaleY2 = scaleLinear()
      .domain(y2Extent as [number, number])
      .range([chartHeight, 0]);


    select(this.svgRef.current)
      .append('g')
      .attr('id', 'ds1')
      .attr('fill', 'green')
      .selectAll('circle')
      .data(exampleData)
      .enter()
      .append('circle')
      .attr('r', 5)
      .attr('cx', d => scaleX(d.x))
      .attr('cy', d => scaleY1(d.y1))

    select(this.svgRef.current)
      .append('g')
      .attr('id', 'ds2')
      .attr('fill', 'blue')
      .selectAll('circle')
      .data(exampleData)
      .enter()
      .append('circle')
      .attr('r', 5)
      .attr('cx', d => scaleX(d.x))
      .attr('cy', d => scaleY2(d.y2))

    const lineMaker = line()
      .x((d: any) => scaleX(d['x']))
      .y((d: any) => scaleY1(d['y1']))

    select('#ds1')
      .append('path')
      .attr('fill', 'none')
      .attr('stroke', 'red')
      .attr('d', lineMaker(exampleData as any))

    lineMaker.y((d: any) => scaleY2(d['y2']));

    select('#ds2')
      .append('path')
      .attr('fill', 'none')
      .attr('stroke', 'cyan')
      .attr('d', lineMaker(exampleData as any))
  };

  render() {
    return (
      <svg
        ref={this.svgRef}
        height={chartHeight}
        width={chartWidth}
        style={{
          background: 'lightgrey'
        }}
      />
    )
  }
}

export default {
  title: 'Dot chart/Second try',
  component: TestB,
  argTypes: {
  },
} as ComponentMeta<typeof TestB>;

const Template: ComponentStory<typeof TestB> = (args) => <TestB {...args} />;

export const Primary = Template.bind({});
Primary.args = {

};
