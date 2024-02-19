import * as React from 'react'
import { v4 as uuidv4 } from 'uuid'
import { TreeNode } from './TreeNode'

export type TreeViewData = {
  id?: string | ''
  isChecked?: boolean | false
  label: string
  values: TreeViewData[]
}

interface TreeProps {
  /** The data for the tree view generation.
   *  @example
   * {
   *  label: 'Mobile Phones',
   *  values: [
   *    {
   *      label: 'Apple',
   *      values: [
   *         {
   *          label: 'iPhone 12',
   *          values: [
   *              { label: '128 GB', values: [] },
   *              { label: '256 GB', values: [] },
   *              { label: '512 GB', values: [] }
   *          ]
   *        }
   *      ]
   *    }
   *  ]
   * }
   */
  data: TreeViewData
  /**
   * Specifies whether the selection should be displayed as a list below the tree view.
   * @param {boolean} showSelection - Indicates whether the selection list should be displayed (`true`) or hidden (`false`).
   */
  showSelection: boolean
  /**
   * Specifies the scale of the checkbox.
   * @param {number} checkboxScale - This applies to CSS transform scale.
   *  When `checkboxScale` is `1`, the checkbox remains its original size. When `checkboxScale` is `2`, it doubles in size, and so on.
   */
  checkboxScale?: number
  /**
   * Specifies the class name of the tree wrapper element.
   * @param {string} [wrapperClass] - The CSS class name for the tree wrapper element.
   */
  wrapperClass?: string
  /**
   * Specifies the class name of the tree item row element.
   * @param {string} [rowClass] - The CSS class name for the tree row element.
   */
  rowClass?: string
  /**
   * Specifies the color of the tree expand icon.
   * @param {string} [expandIconColor] - The hexa color of expand icon.
   */
  expandIconColor?: string
  /**
   * Specifies the color of the tree collapse icon.
   * @param {string} [collapseIconColor] - The hexa color of collapse icon.
   */
  collapseIconColor?: string
  /**
   * Specifies the class name of the tree selected element.
   * @param {string} [selectedItemClass] - The CSS class name for the tree selected element.
   */
  selectedItemClass?: string
  /**
   * Specifies the class name of the tree item element.
   * @param {string} [itemClass] - The CSS class name for the tree item element.
   */
  itemClass?: string
  /**
   * Specifies the function to execute when data is updated.
   * @param {any} [onDataUpdated] - The function to call when data is updated.
   */
  onDataUpdated: any
}

export const TreeView: React.FC<TreeProps> = ({
  data,
  showSelection,
  checkboxScale,
  wrapperClass,
  rowClass,
  expandIconColor,
  collapseIconColor,
  selectedItemClass,
  itemClass,
  onDataUpdated
}) => {
  const [treeData, setTreeData] = React.useState({ ...data, isChecked: false })

  React.useEffect(() => {
    onDataUpdated(treeData)
  }, [treeData])

  React.useEffect(() => {
    const addDefaultProperties = (node: TreeViewData) => {
      node.isChecked = false
      node.id = uuidv4()
      node.values.forEach((childNode) => addDefaultProperties(childNode))
    }
    addDefaultProperties(treeData)
  }, [])

  const handleCheckboxClick = (nodeId: string) => {
    const updateCheckedState = (node: TreeViewData) => {
      if (node.id === nodeId) {
        node.isChecked = !node.isChecked
        node.values.forEach((childNode) =>
          updateChildState(childNode, node.isChecked ?? false)
        )
      }

      node.values.forEach((childNode) => updateCheckedState(childNode))
    }

    const updateChildState = (node: TreeViewData, state: boolean) => {
      node.isChecked = state
      node.values.forEach((childNode) => updateChildState(childNode, state))
    }

    const correctParents = (nodeId: string, node: TreeViewData) => {
      let parentNode = getParentNode(node, nodeId)
      while (parentNode !== null) {
        parentNode.isChecked = allChildrenChecked(parentNode)
        parentNode = getParentNode(node, parentNode.id ?? '')
      }
    }

    const allChildrenChecked = (node: TreeViewData): boolean => {
      for (const child of node.values) {
        if (!child.isChecked) {
          return false
        }
      }
      return true
    }

    const getParentNode = (
      node: TreeViewData,
      childNodeId: string
    ): TreeViewData | null => {
      if (node.id === childNodeId) {
        return null
      }

      for (const child of node.values) {
        if (child.id === childNodeId) {
          return node
        }
        const parentOfChild = getParentNode(child, childNodeId)
        if (parentOfChild !== null) {
          return parentOfChild
        }
      }
      return null
    }

    const updatedTreeData = { ...treeData }
    updateCheckedState(updatedTreeData)
    correctParents(nodeId, updatedTreeData)
    setTreeData(updatedTreeData)
  }

  const getSelectedItems = (
    node: TreeViewData,
    parentLabel: string,
    selectedItems: string[]
  ): string[] => {
    if (node.isChecked) {
      if (node.values.length > 0) {
        selectedItems.push('All ' + node.label)
      } else {
        selectedItems.push(
          (parentLabel != '' ? parentLabel + ' / ' : '') + node.label
        )
      }
    } else {
      node.values.forEach((child) => {
        selectedItems = getSelectedItems(
          child,
          (parentLabel != '' ? parentLabel + ' / ' : '') + node.label,
          selectedItems
        )
      })
    }

    return selectedItems
  }

  return (
    <div>
      <TreeNode
        key={-1}
        data={treeData}
        handleCheckboxClick={handleCheckboxClick}
        checkboxScale={checkboxScale}
        wrapperClass={wrapperClass}
        rowClass={rowClass}
        expandIconColor={expandIconColor}
        collapseIconColor={collapseIconColor}
        selectedItemClass={selectedItemClass}
        itemClass={itemClass}
      />
      {showSelection && (
        <div>
          <ul>
            {getSelectedItems(treeData, '', []).map((selectedItem, index) => (
              <li key={index}>{selectedItem}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
