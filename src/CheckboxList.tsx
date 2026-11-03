import React, { useId, useState, useCallback } from 'react';

export type CheckboxOption = {
  id: string;
  label: string;
  checked?: boolean;
  disabled?: boolean;
};

export type CheckboxListProps = {
  /** Layout variant — maps to Figma Type = Inline | Stacked */
  type?: 'Inline' | 'Stacked';
  /** Group label text */
  label?: string;
  /** Show the group label (Figma Label boolean) */
  showLabel?: boolean;
  /** Marks the group as required (visual * + aria-required) */
  required?: boolean;
  /** Helper / support message */
  helperText?: string;
  /** Show helper text (Figma Support boolean) */
  showHelper?: boolean;
  /** Error message */
  errorMessage?: string;
  /** Show error state (Figma Support Status boolean) */
  showError?: boolean;
  /** Options list — replaces fixed sample instances in Figma */
  options: CheckboxOption[];
  /** Controlled selected ids. If omitted, component is uncontrolled. */
  value?: string[];
  /** Initial selected ids for uncontrolled mode */
  defaultValue?: string[];
  /** Called with the new array of selected option ids */
  onChange?: (ids: string[]) => void;
  className?: string;
  id?: string;
};

/**
 * CheckboxList — form group for multi-select options.
 *
 * 1:1 parity target for Rally Web Library Checkbox List
 * (Inline / Stacked, Label, Required, Helper, Error).
 */
export function CheckboxList({
  type = 'Inline',
  label,
  showLabel = true,
  required = false,
  helperText,
  showHelper = false,
  errorMessage,
  showError = false,
  options,
  value,
  defaultValue,
  onChange,
  className,
  id: externalId,
}: CheckboxListProps) {
  const generatedId = useId();
  const groupId = externalId ?? generatedId;
  const helperId = `${groupId}-helper`;
  const errorId = `${groupId}-error`;

  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<string[]>(defaultValue ?? []);
  const selected = isControlled ? value! : internalValue;

  const handleChange = useCallback(
    (optionId: string, checked: boolean) => {
      const next = checked
        ? [...selected, optionId]
        : selected.filter((id) => id !== optionId);
      if (!isControlled) setInternalValue(next);
      onChange?.(next);
    },
    [selected, isControlled, onChange]
  );

  const describedBy = [
    showHelper && helperText ? helperId : null,
    showError && errorMessage ? errorId : null,
  ]
    .filter(Boolean)
    .join(' ') || undefined;

  const isStacked = type === 'Stacked';

  return (
    <fieldset
      className={[
        'checkbox-list',
        isStacked ? 'checkbox-list--stacked' : 'checkbox-list--inline',
        showError ? 'checkbox-list--error' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      aria-required={required || undefined}
      aria-describedby={describedBy}
      id={groupId}
    >
      {showLabel && label && (
        <legend className="checkbox-list__legend">
          {label}
          {required && (
            <span className="checkbox-list__required" aria-hidden="true">
              {' *'}
            </span>
          )}
        </legend>
      )}

      {showHelper && helperText && (
        <p id={helperId} className="checkbox-list__helper">
          {helperText}
        </p>
      )}

      {showError && errorMessage && (
        <p id={errorId} className="checkbox-list__error" role="alert">
          <span className="checkbox-list__error-icon" aria-hidden="true">
            ⚠
          </span>
          {errorMessage}
        </p>
      )}

      <div
        className={
          isStacked
            ? 'checkbox-list__options checkbox-list__options--stacked'
            : 'checkbox-list__options checkbox-list__options--inline'
        }
        role="group"
      >
        {options.map((option) => {
          const inputId = `${groupId}-option-${option.id}`;
          const isChecked = selected.includes(option.id);

          return (
            <label
              key={option.id}
              htmlFor={inputId}
              className={[
                'checkbox-list__option',
                option.disabled ? 'checkbox-list__option--disabled' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <input
                id={inputId}
                type="checkbox"
                className="checkbox-list__input"
                checked={isChecked}
                disabled={option.disabled}
                onChange={(e) => handleChange(option.id, e.target.checked)}
              />
              <span className="checkbox-list__control" aria-hidden="true" />
              <span className="checkbox-list__label-text">{option.label}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

export default CheckboxList;
