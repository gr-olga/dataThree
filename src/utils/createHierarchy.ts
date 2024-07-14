import type { IHierarchy } from '@/types/dataTypes'

export function createHierarchy(items: ReadonlyArray<IHierarchy>): Array<IHierarchy> {
  const itemMap: Map<string, IHierarchy> = new Map();
  const rootItems: Array<IHierarchy> = [];

  items.forEach((item: IHierarchy) => {
    item.children = [];
    itemMap.set(item.name, item);

    if (!hasParent(item)) {
      rootItems.push(item);
    } else {
      const parentItem: IHierarchy | undefined = itemMap.get(item.parent);
      if (parentItem && parentItem.children) {
        parentItem.children.push(item);
      }
    }
  });

  return rootItems;
}

function hasParent(item: IHierarchy): boolean {
  return item.parent !== '';
}
