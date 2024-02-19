import * as React from 'react';
import { TreeViewData } from '.';
interface TreeNodeProps {
    data: TreeViewData;
    handleCheckboxClick: any;
    checkboxScale?: number;
    wrapperClass?: string;
    rowClass?: string;
    expandIconColor?: string;
    collapseIconColor?: string;
    selectedItemClass?: string;
    itemClass?: string;
}
export declare const TreeNode: React.FC<TreeNodeProps>;
export {};
