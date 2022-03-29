import React, { createRef, PureComponent, RefObject } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { select } from 'd3';

type dataPoint = {
  x: number,
  y: number
};

const exampleData: dataPoint[] = [
  { x: 100, y: 50 },
  { x: 200, y: 100 },
  { x: 300, y: 150 },
  { x: 400, y: 200 },
  { x: 500, y: 250 }
];

class Kana extends PureComponent {

  private readonly svgRef: RefObject<SVGSVGElement> = createRef();

  componentDidMount() {
    this.drawChart();
  }

  drawChart = () => {
    select(this.svgRef.current)
      .selectAll('circle')
      .data(exampleData)
      .enter()
      .append('circle')
      .attr('r', 5)
      .attr('fill', 'red')
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
  };

  render() {
    return (
      <svg
        ref={this.svgRef}
        height={600}
        width={600}
        style={{
          background: 'lightgrey'
        }}
      />
    )
  }
}

export default {
  title: 'D3 examples/First try',
  component: Kana,
  argTypes: {
  },
} as ComponentMeta<typeof Kana>;

const Template: ComponentStory<typeof Kana> = (args) => <Kana {...args} />;

export const Primary = Template.bind({});
Primary.args = {

};
