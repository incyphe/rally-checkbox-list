# Rally Checkbox List

AI-ready React components with **1:1 parity** to the improved Rally Web Library Checkbox List design system.

This package implements the recommendations from the design-system audit:

- Explicit `options[]` data model (instead of fixed sample instances)
- Clearer prop names (`helperText` / `showHelper`, `errorMessage` / `showError`)
- Full accessibility (fieldset + legend, `aria-required`, `aria-describedby`)
- Inline and Stacked layouts
- Design-token friendly (CSS variables / Tailwind)

## Figma Source

- Original: [Rally Web Library — Test Share](https://www.figma.com/design/qcMnLMNARt0mOtpA29619M) (node `22976:67297`)
- Audit + improved spec: [Checkbox List Audit (Copy)](https://www.figma.com/design/fhTedmGdPI9hkWCwmDnFb8)

## Usage

```tsx
import { CheckboxList } from './src/CheckboxList';

export function Example() {
  return (
    <CheckboxList
      type="Stacked"
      label="Preferred contact methods"
      required
      helperText="Select all that apply"
      options={[
        { id: 'email', label: 'Email' },
        { id: 'sms', label: 'SMS' },
        { id: 'phone', label: 'Phone' },
      ]}
      onChange={(ids) => console.log(ids)}
    />
  );
}
```

## Props (1:1 with improved Figma model)

| Prop | Type | Default | Figma mapping |
|------|------|---------|---------------|
| `type` | `'Inline' \| 'Stacked'` | `'Inline'` | Type variant |
| `label` | `string` | — | Group Label text |
| `showLabel` | `boolean` | `true` | Label boolean |
| `required` | `boolean` | `false` | Required boolean |
| `helperText` | `string` | — | Support message |
| `showHelper` | `boolean` | `false` | Support boolean |
| `errorMessage` | `string` | — | Error message |
| `showError` | `boolean` | `false` | Support Status boolean |
| `options` | `Option[]` | required | Checkmark instances |
| `onChange` | `(ids: string[]) => void` | — | Runtime |
| `className` | `string` | — | — |

```ts
type Option = {
  id: string;
  label: string;
  checked?: boolean;
  disabled?: boolean;
};
```

## Accessibility

- Renders as `<fieldset>` + `<legend>` when a label is shown
- Each option is a native `<input type="checkbox">` with associated label
- `aria-required` when `required`
- Error / helper text linked via `aria-describedby`
- Keyboard: Tab between options, Space to toggle

## Design Tokens

Components use CSS variables that map to the Rally tokens:

- `--spacing-*`
- `--typography-font-family-primary`
- `--global-colors-*`
- `--form-elements-*`

Override them in your theme or Tailwind config.
