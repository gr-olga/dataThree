import type { IHierarchy } from '@/types/dataTypes';
import type { HierarchyPointNode } from 'd3';
import * as d3 from 'd3';

export function treeChart(
  container: HTMLElement,
  rootElement: IHierarchy,
  onClick: (name: string, description: string) => void
) {
  const width: number = 600;
  const height: number = 400;

  const treeLayout = d3.tree<IHierarchy>().size([height, width - 160]);

  const root: HierarchyPointNode<IHierarchy> = treeLayout(d3.hierarchy<IHierarchy>(rootElement));

  const svg = d3.select(container).append('svg').attr('width', width).attr('height', height);

  const g = svg.append('g').attr('transform', 'translate(80,0)');

  g.selectAll('.link')
    .data(root.descendants().slice(1))
    .enter()
    .append('path')
    .attr('class', 'link')
    .attr(
      'd',
      (d: HierarchyPointNode<IHierarchy>) => `
      M${d.y},${d.x}
      C${d.parent!.y + 100},${d.x}
      ${d.parent!.y + 100},${d.parent!.x}
      ${d.parent!.y},${d.parent!.x}
    `
    );

  const node = g
    .selectAll('.node')
    .data(root.descendants())
    .enter()
    .append('g')
    .attr(
      'class',
      (d: HierarchyPointNode<IHierarchy>) =>
        'node' + (d.children ? ' node--internal' : ' node--leaf')
    )
    .attr('transform', (d: HierarchyPointNode<IHierarchy>) => `translate(${d.y},${d.x})`)
    .on('click', (event: MouseEvent, d: HierarchyPointNode<IHierarchy>) =>
      onClick(d.data.name, d.data.description)
    );

  node
    .append('rect')
    .attr('width', 80)
    .attr('height', 30)
    .attr('x', -40)
    .attr('y', -15)
    .style('fill', 'white')
    .style('stroke', 'black');

  node
    .append('text')
    .attr('dy', 3)
    .attr('x', 0)
    .attr('text-anchor', 'middle')
    .text((d: HierarchyPointNode<IHierarchy>) => d.data.name);
}
