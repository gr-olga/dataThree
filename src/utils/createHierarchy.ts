import type {IHierarchy} from "@/types/dataTypes";


export function createHierarchy(items: Array<IHierarchy>) {
    const itemMap = new Map();

    items.forEach(item => {
        item.children = [];
        itemMap.set(item.name, item);
    });
    const rootItems: Array<IHierarchy> = [];

    items.forEach(item => {
        if (item.parent === "") {
            rootItems.push(item);
        } else {
            const parentItem = itemMap.get(item.parent);
            if (parentItem) {
                parentItem.children.push(item);
            }
        }
    });

    return rootItems;
}