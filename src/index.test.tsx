import {
  fireEvent,
  render,
  screen
} from '@testing-library/react'
import { TreeView } from '.'
import React from 'react'
import '@testing-library/jest-dom/extend-expect'

describe('TreeView', () => {
  it('renders tree view component', () => {
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

    const onDataUpdated = jest.fn()

    render(
      <TreeView
        data={products}
        showSelection={true}
        onDataUpdated={onDataUpdated}
      />
    )

    const checkbox = screen.getByAltText('Mobile Phones')
    expect(checkbox).toBeInTheDocument()
  })

  it('validate initial output of the tree view', () => {
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

    const onDataUpdated = jest.fn()

    render(
      <TreeView
        data={products}
        showSelection={true}
        onDataUpdated={onDataUpdated}
      />
    )

    expect(onDataUpdated).toHaveBeenCalledWith(
      expect.objectContaining({
        label: 'Mobile Phones',
        isChecked: false,
        values: [
          expect.objectContaining({
            label: 'Apple',
            isChecked: false,
            values: [
              expect.objectContaining({
                label: 'iPhone 12',
                isChecked: false,

                values: [
                  expect.objectContaining({ label: '128 GB', values: [], isChecked: false }),
                  expect.objectContaining({ label: '256 GB', values: [], isChecked: false }),
                  expect.objectContaining({ label: '512 GB', values: [], isChecked: false })
                ]
              })
            ]
          })
        ]
      })
    )
  })

  it('checks all child nodes when clicking on parent node', () => {
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

    const onDataUpdated = jest.fn()

    const treeView = render(
      <TreeView
        data={products}
        showSelection={true}
        onDataUpdated={onDataUpdated}
      />
    )

    const checkbox = screen.getByAltText('Mobile Phones')
    fireEvent.click(checkbox)

    const toggleBtn = treeView.container.querySelector('#toggle_Mobile_Phones')

    if (toggleBtn) {
      fireEvent.click(toggleBtn)
    }
    const appleToggleBtn = treeView.container.querySelector('#toggle_Apple')
    if (appleToggleBtn) {
      fireEvent.click(appleToggleBtn)
    }
    const iPhone12ToggleBtn =
      treeView.container.querySelector('#toggle_iPhone_12')
    if (iPhone12ToggleBtn) {
      fireEvent.click(iPhone12ToggleBtn)
    }

    const appleCheckBox = screen.getByAltText('Apple') as HTMLInputElement
    const iPhone12CheckBox = screen.getByAltText(
      'iPhone 12'
    ) as HTMLInputElement
    const i128GBCheckBox = screen.getByAltText('128 GB') as HTMLInputElement
    const i256GBCheckBox = screen.getByAltText('256 GB') as HTMLInputElement
    const i512GBCheckBox = screen.getByAltText('512 GB') as HTMLInputElement

    expect(appleCheckBox.checked).toBe(true)
    expect(iPhone12CheckBox.checked).toBe(true)
    expect(i128GBCheckBox.checked).toBe(true)
    expect(i256GBCheckBox.checked).toBe(true)
    expect(i512GBCheckBox.checked).toBe(true)
  })

  it('validate output of the tree view when clicking on parent node', () => {
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

    const onDataUpdated = jest.fn()

    render(
      <TreeView
        data={products}
        showSelection={true}
        onDataUpdated={onDataUpdated}
      />
    )

    const checkbox = screen.getByAltText('Mobile Phones')
    fireEvent.click(checkbox)

    expect(onDataUpdated).toHaveBeenCalledWith(
      expect.objectContaining({
        label: 'Mobile Phones',
        isChecked: true,
        values: [
          expect.objectContaining({
            label: 'Apple',
            isChecked: true,
            values: [
              expect.objectContaining({
                label: 'iPhone 12',
                isChecked: true,
                values: [
                  expect.objectContaining({ label: '128 GB', values: [], isChecked: true }),
                  expect.objectContaining({ label: '256 GB', values: [], isChecked: true }),
                  expect.objectContaining({ label: '512 GB', values: [], isChecked: true })
                ]
              })
            ]
          })
        ]
      })
    )
  })

  it('unchecks parent nodes if one child node unchecked', () => {
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

    const onDataUpdated = jest.fn()

    const treeView = render(
      <TreeView
        data={products}
        showSelection={true}
        onDataUpdated={onDataUpdated}
      />
    )

    const checkbox = screen.getByAltText('Mobile Phones')
    fireEvent.click(checkbox)

    const toggleBtn = treeView.container.querySelector('#toggle_Mobile_Phones')

    if (toggleBtn) {
      fireEvent.click(toggleBtn)
    }
    const appleToggleBtn = treeView.container.querySelector('#toggle_Apple')
    if (appleToggleBtn) {
      fireEvent.click(appleToggleBtn)
    }
    const iPhone12ToggleBtn =
      treeView.container.querySelector('#toggle_iPhone_12')
    if (iPhone12ToggleBtn) {
      fireEvent.click(iPhone12ToggleBtn)
    }

    const appleCheckBox = screen.getByAltText('Apple') as HTMLInputElement
    const iPhone12CheckBox = screen.getByAltText(
      'iPhone 12'
    ) as HTMLInputElement
    const i128GBCheckBox = screen.getByAltText('128 GB') as HTMLInputElement
    const i256GBCheckBox = screen.getByAltText('256 GB') as HTMLInputElement
    const i512GBCheckBox = screen.getByAltText('512 GB') as HTMLInputElement

    // Uncheck 512 GB phone
    fireEvent.click(i512GBCheckBox)

    expect(appleCheckBox.checked).toBe(false)
    expect(iPhone12CheckBox.checked).toBe(false)
    expect(i128GBCheckBox.checked).toBe(true)
    expect(i256GBCheckBox.checked).toBe(true)
    expect(i512GBCheckBox.checked).toBe(false)
  })

  it('validate output of the tree view if one child node unchecked', () => {
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

    const onDataUpdated = jest.fn()

    const treeView = render(
      <TreeView
        data={products}
        showSelection={true}
        onDataUpdated={onDataUpdated}
      />
    )

    const checkbox = screen.getByAltText('Mobile Phones')
    fireEvent.click(checkbox)

    const toggleBtn = treeView.container.querySelector('#toggle_Mobile_Phones')

    if (toggleBtn) {
      fireEvent.click(toggleBtn)
    }
    const appleToggleBtn = treeView.container.querySelector('#toggle_Apple')
    if (appleToggleBtn) {
      fireEvent.click(appleToggleBtn)
    }
    const iPhone12ToggleBtn =
      treeView.container.querySelector('#toggle_iPhone_12')
    if (iPhone12ToggleBtn) {
      fireEvent.click(iPhone12ToggleBtn)
    }

    const i512GBCheckBox = screen.getByAltText('512 GB') as HTMLInputElement

    // Uncheck 512 GB phone
    fireEvent.click(i512GBCheckBox)

    expect(onDataUpdated).toHaveBeenCalledWith(
      expect.objectContaining({
        label: 'Mobile Phones',
        isChecked: false,
        values: [
          expect.objectContaining({
            label: 'Apple',
            isChecked: false,
            values: [
              expect.objectContaining({
                label: 'iPhone 12',
                isChecked: false,
                values: [
                  expect.objectContaining({ label: '128 GB', values: [], isChecked: true }),
                  expect.objectContaining({ label: '256 GB', values: [], isChecked: true }),
                  expect.objectContaining({ label: '512 GB', values: [], isChecked: false })
                ]
              })
            ]
          })
        ]
      })
    )
  })

  it('check parent nodes when all child nodes are checked', () => {
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

    const onDataUpdated = jest.fn()

    const treeView = render(
      <TreeView
        data={products}
        showSelection={true}
        onDataUpdated={onDataUpdated}
      />
    )

    const toggleBtn = treeView.container.querySelector('#toggle_Mobile_Phones')

    if (toggleBtn) {
      fireEvent.click(toggleBtn)
    }
    const appleToggleBtn = treeView.container.querySelector('#toggle_Apple')
    if (appleToggleBtn) {
      fireEvent.click(appleToggleBtn)
    }
    const iPhone12ToggleBtn =
      treeView.container.querySelector('#toggle_iPhone_12')
    if (iPhone12ToggleBtn) {
      fireEvent.click(iPhone12ToggleBtn)
    }

    const rootCheckBox = screen.getByAltText(
      'Mobile Phones'
    ) as HTMLInputElement
    const appleCheckBox = screen.getByAltText('Apple') as HTMLInputElement
    const iPhone12CheckBox = screen.getByAltText(
      'iPhone 12'
    ) as HTMLInputElement
    const i128GBCheckBox = screen.getByAltText('128 GB') as HTMLInputElement
    const i256GBCheckBox = screen.getByAltText('256 GB') as HTMLInputElement
    const i512GBCheckBox = screen.getByAltText('512 GB') as HTMLInputElement

    // Check 128GB, 256GB,512GB phones
    fireEvent.click(i128GBCheckBox)
    fireEvent.click(i256GBCheckBox)
    fireEvent.click(i512GBCheckBox)

    expect(rootCheckBox.checked).toBe(true)
    expect(appleCheckBox.checked).toBe(true)
    expect(iPhone12CheckBox.checked).toBe(true)
    expect(i128GBCheckBox.checked).toBe(true)
    expect(i256GBCheckBox.checked).toBe(true)
    expect(i512GBCheckBox.checked).toBe(true)
  })

  it('validate output of the tree view when all child nodes are checked', () => {
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

    const onDataUpdated = jest.fn()

    const treeView = render(
      <TreeView
        data={products}
        showSelection={true}
        onDataUpdated={onDataUpdated}
      />
    )

    const toggleBtn = treeView.container.querySelector('#toggle_Mobile_Phones')

    if (toggleBtn) {
      fireEvent.click(toggleBtn)
    }
    const appleToggleBtn = treeView.container.querySelector('#toggle_Apple')
    if (appleToggleBtn) {
      fireEvent.click(appleToggleBtn)
    }
    const iPhone12ToggleBtn =
      treeView.container.querySelector('#toggle_iPhone_12')
    if (iPhone12ToggleBtn) {
      fireEvent.click(iPhone12ToggleBtn)
    }

    const i128GBCheckBox = screen.getByAltText('128 GB') as HTMLInputElement
    const i256GBCheckBox = screen.getByAltText('256 GB') as HTMLInputElement
    const i512GBCheckBox = screen.getByAltText('512 GB') as HTMLInputElement

    // Check 128GB, 256GB,512GB phones
    fireEvent.click(i128GBCheckBox)
    fireEvent.click(i256GBCheckBox)
    fireEvent.click(i512GBCheckBox)

    expect(onDataUpdated).toHaveBeenCalledWith(
      expect.objectContaining({
        label: 'Mobile Phones',
        isChecked: true,
        values: [
          expect.objectContaining({
            label: 'Apple',
            isChecked: true,
            values: [
              expect.objectContaining({
                label: 'iPhone 12',
                isChecked: true,
                values: [
                  expect.objectContaining({ label: '128 GB', values: [], isChecked: true }),
                  expect.objectContaining({ label: '256 GB', values: [], isChecked: true }),
                  expect.objectContaining({ label: '512 GB', values: [], isChecked: true })
                ]
              })
            ]
          })
        ]
      })
    )
  })
})
