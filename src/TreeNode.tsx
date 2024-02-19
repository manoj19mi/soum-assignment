import * as React from 'react'
import styles from './styles.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons'
import { TreeViewData } from '.'

interface TreeNodeProps {
  data: TreeViewData
  handleCheckboxClick: any
  checkboxScale?: number
  wrapperClass?: string
  rowClass?: string
  expandIconColor?: string
  collapseIconColor?: string
  selectedItemClass?: string
  itemClass?: string
}

export const TreeNode: React.FC<TreeNodeProps> = ({
  data,
  handleCheckboxClick,
  checkboxScale,
  wrapperClass,
  rowClass,
  expandIconColor,
  collapseIconColor,
  selectedItemClass,
  itemClass
}) => {
  const [expanded, setExpanded] = React.useState(false)

  const handleToggle = () => {
    setExpanded(!expanded)
  }

  return (
    <div className={[styles.commonpadding, wrapperClass].join(' ')}>
      <div
        className={[
          styles.treerow,
          rowClass,
          data.isChecked ? selectedItemClass : itemClass
        ].join(' ')}
      >
        {data.values.length > 0 && (
          <div id={"toggle_"+data.label.replaceAll(" ","_")} onClick={handleToggle}>
            {expanded ? (
              <FontAwesomeIcon icon={faMinusCircle} color={expandIconColor} />
            ) : (
              <FontAwesomeIcon icon={faPlusCircle} color={collapseIconColor} />
            )}
          </div>
        )}
        <div
          className={styles.treerow}
          style={{
            paddingLeft: data.values.length == 0 ? 30 : 10
          }}
        >
          <input
            type='checkbox'
            alt={data.label}
            checked={data.isChecked ?? false}
            style={{ transform: 'scale(' + checkboxScale + ')' }}
            onChange={() => handleCheckboxClick(data.id)}
          />
          <div>{data.label}</div>
        </div>
      </div>
      {expanded && (
        <div>
          {data.values.length > 0 ? (
            data.values.map(
              (child: TreeViewData, index: React.Key | null | undefined) => (
                <TreeNode
                  key={index}
                  data={child}
                  handleCheckboxClick={handleCheckboxClick}
                  checkboxScale={checkboxScale}
                  wrapperClass={wrapperClass}
                  rowClass={rowClass}
                  expandIconColor={expandIconColor}
                  collapseIconColor={collapseIconColor}
                  selectedItemClass={selectedItemClass}
                  itemClass={itemClass}
                />
              )
            )
          ) : (
            <div className={styles.treerow}>
              <input
                type='checkbox'
                alt={data.label}
                style={{ transform: 'scale(' + checkboxScale + ')' }}
                checked={data.isChecked ?? false}
                onChange={() => handleCheckboxClick(data.id)}
              />
              <div>{data.label}</div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
