import type { IHierarchy } from '@/types/dataTypes'

const hasParent = (item: IHierarchy): boolean => item.parent !== '';
const hasNoParent = (item: IHierarchy): boolean => !hasParent(item);
const findParent = (items: ReadonlyArray<IHierarchy>, parentName: string): IHierarchy | undefined => items.find((item: IHierarchy) => parentName === item.name);


export function createHierarchy(items: ReadonlyArray<IHierarchy>): IHierarchy | never {
  const itemMap: Map<string, IHierarchy> = new Map();
  const rootItem: IHierarchy | undefined = items.find(hasNoParent);
  if (!rootItem) throw new Error('No root item found');

  items.forEach((item: IHierarchy) => {
    item.children = [];
    itemMap.set(item.name, item);

    if (hasParent(item)) {
      const parentItem: IHierarchy | undefined = findParent(items, item.parent);
      if (parentItem && parentItem.children) parentItem.children.push(item);
    }
  });

  return rootItem;
}
