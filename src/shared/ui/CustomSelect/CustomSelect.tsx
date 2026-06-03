'use client';

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/shared/ui/shadcn/select';

type Option = {
  value: string;
  label: string;
};

type Props = {
  id?: string;
  value?: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
};

export function CustomSelect({
  id,
  value,
  onChange,
  options,
  placeholder = 'Select...',
  disabled,
  className,
}: Props) {
  return (
    <Select
      id={id}
      value={value}
      onValueChange={onChange}
      disabled={disabled}
    >
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent
        position="popper"
        className="w-[var(--radix-select-trigger-width)] min-w-0"
      >
        {options.map((opt) => (
          <SelectItem
            key={opt.value}
            value={opt.value}
          >
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
