import type { IHierarchy } from '@/types/dataTypes'

export function createHierarchy(items: ReadonlyArray<IHierarchy>) {
  const itemMap: Map<string, IHierarchy> = new Map()

  items.forEach((item: IHierarchy) => {
    item.children = []
    itemMap.set(item.name, item)
  })

  const rootItems: Array<IHierarchy> = []

  items.forEach((item: IHierarchy) => {
    if (item.parent === '') {
      rootItems.push(item)
    } else {
      const parentItem: IHierarchy | undefined = itemMap.get(item.parent)
      if (parentItem && parentItem.children) parentItem.children.push(item)
    }
  })

  return rootItems
}
