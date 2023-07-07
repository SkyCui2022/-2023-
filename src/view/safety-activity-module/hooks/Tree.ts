import { ref, onMounted } from 'vue'
import { OrgsApi } from '@yakj/sdk/sdk/sdk'

export default function useTree () {
  interface Tree {
    id: number
    label: string
    children?: Tree[]
  }

  const props = {
    value: 'id',
    label: 'label',
    children: 'children'
  }
  const TreeData = ref([] as Tree[])
  const expanedKeys: number[] = []
  for (const datum of TreeData.value) {
    const children = datum.children
    if (children) {
      expanedKeys.push(datum.id)
      break
    }
  }
  const DefaultExpandedKeys = ref(expanedKeys)

  return { props, TreeData, DefaultExpandedKeys }
}
