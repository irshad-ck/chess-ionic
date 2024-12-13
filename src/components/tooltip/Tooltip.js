import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
//Tooltip.js
import { useState } from "react";
export default function Tooltip({ content, children }) {
    const [showTooltip, setShowTooltip] = useState(false);
    return (_jsxs("div", { className: "relative", children: [_jsx("div", { className: "flex cursor-pointer items-center", onClick: () => setShowTooltip(!showTooltip), onMouseEnter: () => setShowTooltip(true), onMouseLeave: () => setShowTooltip(false), children: children }), showTooltip && (_jsx("div", { className: "absolute top-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white rounded-md py-1 px-2 pointer-events-none transition-all duration-300 z-50 w-48 text-center", children: content }))] }));
}
