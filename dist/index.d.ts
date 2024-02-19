import * as React from 'react';
export declare type TreeViewData = {
    id?: string | '';
    isChecked?: boolean | false;
    label: string;
    values: TreeViewData[];
};
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
    data: TreeViewData;
    /**
     * Specifies whether the selection should be displayed as a list below the tree view.
     * @param {boolean} showSelection - Indicates whether the selection list should be displayed (`true`) or hidden (`false`).
     */
    showSelection: boolean;
    /**
     * Specifies the scale of the checkbox.
     * @param {number} checkboxScale - This applies to CSS transform scale.
     *  When `checkboxScale` is `1`, the checkbox remains its original size. When `checkboxScale` is `2`, it doubles in size, and so on.
     */
    checkboxScale?: number;
    /**
     * Specifies the class name of the tree wrapper element.
     * @param {string} [wrapperClass] - The CSS class name for the tree wrapper element.
     */
    wrapperClass?: string;
    /**
     * Specifies the class name of the tree item row element.
     * @param {string} [rowClass] - The CSS class name for the tree row element.
     */
    rowClass?: string;
    /**
     * Specifies the color of the tree expand icon.
     * @param {string} [expandIconColor] - The hexa color of expand icon.
     */
    expandIconColor?: string;
    /**
     * Specifies the color of the tree collapse icon.
     * @param {string} [collapseIconColor] - The hexa color of collapse icon.
     */
    collapseIconColor?: string;
    /**
     * Specifies the class name of the tree selected element.
     * @param {string} [selectedItemClass] - The CSS class name for the tree selected element.
     */
    selectedItemClass?: string;
    /**
     * Specifies the class name of the tree item element.
     * @param {string} [itemClass] - The CSS class name for the tree item element.
     */
    itemClass?: string;
    /**
     * Specifies the function to execute when data is updated.
     * @param {any} [onDataUpdated] - The function to call when data is updated.
     */
    onDataUpdated: any;
}
export declare const TreeView: React.FC<TreeProps>;
export {};
