# soum-tree-view

> Common tree view UI

## Props

| Name                | Type           | Description                                                                        |
| ------------------- | -------------- | ---------------------------------------------------------------------------------- |
| `data`              | `TreeViewData` | The data for the tree view generation.                                             |
| `showSelection`     | `boolean`      | Specifies whether the selection should be displayed as a list below the tree view. |
| `checkboxScale`     | `number`       | Specifies the scale of the checkbox.                                               |
| `wrapperClass`      | `string`       | Specifies the class name of the tree wrapper element.                              |
| `rowClass`          | `string`       | Specifies the class name of the tree item row element.                             |
| `expandIconColor`   | `string`       | Specifies the color of the tree expand icon.                                       |
| `collapseIconColor` | `string`       | Specifies the color of the tree collapse icon.                                     |
| `selectedItemClass` | `string`       | Specifies the class name of the tree selected element.                             |
| `itemClass`         | `string`       | Specifies the class name of the tree item element.                                 |
| `onDataUpdated`     | `function`     | Specifies the function to execute when data is updated.                            |

## Usage

```tsx
import React, { Component } from 'react'

import { TreeView, TreeViewData } from 'soum-tree-view'
import 'soum-tree-view/dist/index.css'

const products = {
  label: 'Mobile Phones',
  values: [
    {
      label: 'Apple',
      values: [
        {
          label: 'iPhone 12',
          values: [
            { label: '128 GB', values: [] },
            { label: '256 GB', values: [] },
            { label: '512 GB', values: [] }
          ]
        }
      ]
    }
  ]
}

const App = () => {
  const [updatedData, setUpdatedData] = useState<TreeViewData>()

  React.useEffect(() => {
    console.log(updatedData)
  }, [updatedData])

  const handleDataUpdate = (data: TreeViewData) => {
    setUpdatedData(data)
  }
  return (
    <TreeView
      data={products}
      showSelection={true}
      checkboxScale={1}
      wrapperClass='treeViewWrapper'
      rowClass='treeItem'
      expandIconColor='#50a6c5'
      collapseIconColor='#0f4539'
      selectedItemClass='selectedItem'
      itemClass='item'
      onDataUpdated={handleDataUpdate}
    />
  )
}

export default App
```

## License

MIT © [Manoj Wijesundara](https://github.com/manoj19mi)
