import type {IDataType, IHierarchy} from "@/types/dataTypes";
import * as d3 from "d3";
import type {HierarchyNode} from "d3";

export function treeChart(container: HTMLElement, data: ReadonlyArray<IHierarchy>, onClick: (name: string, description: string) => void) {
    const width: number = 600;
    const height : number= 400;

    const treeLayout = d3.tree().size([height, width - 160]);

    const root = d3.hierarchy(data[0]);
    treeLayout(root);

    const svg = d3.select(container)
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    const g = svg.append("g")
        .attr("transform", "translate(80,0)");

    const link = g.selectAll(".link")
        .data(root.descendants().slice(1))
        .enter().append("path")
        .attr("class", "link")
        .attr("d", (d: HierarchyNode<IDataType>) => `
      M${d.y},${d.x}
      C${d.parent.y + 100},${d.x}
      ${d.parent.y + 100},${d.parent.x}
      ${d.parent.y},${d.parent.x}
    `);

    const node = g.selectAll(".node")
        .data(root.descendants())
        .enter().append("g")
        .attr("class", (d: HierarchyNode<IDataType>) => "node" + (d.children ? " node--internal" : " node--leaf"))
        .attr("transform", (d: HierarchyNode<IDataType>) => `translate(${d.y},${d.x})`)
        .on("click", (event: any, d: HierarchyNode<IDataType>) => onClick(d.data.name, d.data.description));

    node.append("rect")
        .attr("width", 80)
        .attr("height", 30)
        .attr("x", -40)
        .attr("y", -15)
        .style("fill", "white")
        .style("stroke", "black");

    node.append("text")
        .attr("dy", 3)
        .attr("x", (d: HierarchyNode<IDataType>) => d.data.children ? -8 : 8)
        .attr("text-anchor", (d: HierarchyNode<IDataType>) => {
            return d.data.children.name ? "end" : "start";
        })
        .text((d: HierarchyNode<IDataType>) => d.data.name)
}