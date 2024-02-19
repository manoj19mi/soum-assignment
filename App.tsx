import React, { useState } from 'react'
import 'soum-tree-view/dist/index.css'

import { TreeView, TreeViewData } from 'soum-tree-view'

const products: TreeViewData = {
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
        },
        {
          label: 'iPhone 12 Pro Max',
          values: [
            { label: '128 GB', values: [] },
            { label: '256 GB', values: [] },
            { label: '512 GB', values: [] }
          ]
        }
      ]
    },
    {
      label: 'Samsung',
      values: [
        {
          label: 'Galaxy A8',
          values: [
            { label: '128 GB Storage 4GB RAM', values: [] },
            { label: '128 GB Storage 6GB RAM', values: [] },
            { label: '512 GB Storage 6GB RAM', values: [] }
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
