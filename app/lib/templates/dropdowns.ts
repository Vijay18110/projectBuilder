// Shared by the studio and generated applications. Native select semantics preserve
// keyboard navigation, form validation, and React Hook Form integration.
export const dropdownCSS=String.raw`
/* Thin theme-aware scrollbars for pages, sidebars, tables, menus, and pickers. */
html,
* {
  scrollbar-width: thin;
  scrollbar-color: color-mix(in srgb, var(--secondary) 25%, var(--border)) color-mix(in srgb, var(--surface) 72%, transparent);
}
*::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
*::-webkit-scrollbar-track {
  background: color-mix(in srgb, var(--surface) 72%, transparent);
  border-radius: 999px;
}
*::-webkit-scrollbar-thumb {
  min-height: 36px;
  border: 2px solid transparent;
  border-radius: 999px;
  background: color-mix(in srgb, var(--secondary) 25%, var(--border)) border-box;
  background-clip: padding-box;
}
*::-webkit-scrollbar-thumb:hover {
  background: color-mix(in srgb, var(--secondary) 60%, var(--border)) border-box;
}
*::-webkit-scrollbar-corner {
  background: transparent;
}
select:not([multiple]):not([size]) {
  min-height: 42px;
  max-width: 100%;
  padding: 10px 14px;
  border: 1px solid color-mix(in srgb, var(--primary) 22%, var(--border));
  border-radius: max(10px, var(--radius));
  background: var(--surface);
  color: var(--text);
  box-shadow: var(--design-input-shadow,none);
  font: inherit;
  font-weight: 500;
  cursor: pointer;
  transition: border-color var(--duration, 180ms), box-shadow var(--duration, 180ms);
}
select:not([multiple]):not([size]):hover:not(:disabled) {
  border-color: color-mix(in srgb, var(--primary) 58%, var(--border));
  box-shadow: var(--design-input-shadow,none);
}
select:not([multiple]):not([size]):focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 3px;
}
select:not([multiple]):not([size]):disabled {
  opacity: .55;
  cursor: not-allowed;
}
select option {
  background-color: var(--surface);
  color: var(--text);
}
@supports (appearance: base-select) {
  select:not([multiple]):not([size]),
  select:not([multiple]):not([size])::picker(select) {
    appearance: base-select;
  }
  select:not([multiple]):not([size]) {
    align-items: center;
    gap: 24px;
  }
  select:not([multiple]):not([size])::picker-icon {
    color: var(--primary);
    transition: rotate var(--duration, 180ms);
  }
  select:not([multiple]):not([size]):open {
    border-color: var(--primary);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--primary) 12%, transparent);
  }
  select:not([multiple]):not([size]):open::picker-icon {
    rotate: 180deg;
  }
  select:not([multiple]):not([size])::picker(select) {
    padding: 6px;
    margin-block: 7px;
    border: 1px solid color-mix(in srgb, var(--primary) 25%, var(--border));
    border-radius: max(12px, var(--radius));
    background: var(--surface);
    color: var(--text);
    box-shadow: 0 14px 40px color-mix(in srgb, var(--text) 14%, transparent), 0 3px 10px color-mix(in srgb, var(--primary) 10%, transparent);
    max-height: min(340px, 60dvh);
    max-width: calc(100vw - 24px);
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: color-mix(in srgb, var(--primary) 35%, var(--border)) transparent;
  }
  select:not([multiple]):not([size]) option {
    display: flex;
    align-items: center;
    gap: 12px;
    min-height: 40px;
    padding: 10px 12px;
    margin: 2px 0;
    border: 1px solid transparent;
    border-radius: max(7px, calc(var(--radius) - 4px));
    background: transparent;
    color: var(--text);
    font-weight: 400;
    cursor: pointer;
    white-space: normal;
    overflow-wrap: anywhere;
  }
  select:not([multiple]):not([size]) option:hover,
  select:not([multiple]):not([size]) option:focus-visible {
    background: var(--muted);
    outline: none;
    border-color: color-mix(in srgb, var(--primary) 25%, transparent);
  }
  select:not([multiple]):not([size]) option:checked {
    background: color-mix(in srgb, var(--primary) 9%, var(--surface));
    border-color: color-mix(in srgb, var(--primary) 32%, var(--border));
    font-weight: 600;
  }
  select:not([multiple]):not([size]) option::checkmark {
    order: 1;
    margin-inline-start: auto;
    color: var(--text);
  }
  select:not([multiple]):not([size]) option:disabled {
    opacity: .45;
    cursor: not-allowed;
  }
}
@media (prefers-reduced-motion: reduce) {
  select:not([multiple]):not([size]),
  select:not([multiple]):not([size])::picker-icon { transition: none; }
}
@media (forced-colors: active) {
  select:not([multiple]):not([size]) { border: 1px solid ButtonText; }
  select:not([multiple]):not([size]) option:checked { border: 2px solid Highlight; }
}
`;
