'use client';

import { ChevronDownIcon } from 'lucide-react';

import { cn } from '@/shared/lib/utils/cn';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/shared/ui/shadcn/dropdown-menu';

import { useMultiSelectDraft } from './useMultiSelectDraft';

type Option = {
  value: string;
  label: string;
};

type Props = {
  values: string[];
  onChange: (values: string[]) => void;
  options: Option[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
};

export function MultiSelect({
  values,
  onChange,
  options,
  placeholder = 'Select...',
  disabled,
  className,
}: Props) {
  const { draft, open, setOpen, toggle } = useMultiSelectDraft(values, onChange);

  const first = draft.length
    ? (options.find((o) => o.value === draft[0])?.label ?? draft[0])
    : null;
  const label = first && (draft.length === 1 ? first : `${first} +${draft.length - 1}`);

  return (
    <DropdownMenu
      open={open}
      onOpenChange={setOpen}
    >
      <DropdownMenuTrigger
        disabled={disabled}
        asChild
      >
        <button
          className={cn(
            'flex w-fit items-center justify-between gap-1.5 rounded-lg border border-input bg-transparent py-2 pr-2 pl-2.5 text-sm whitespace-nowrap',
            'transition-colors outline-none select-none cursor-default',
            'hover:bg-accent hover:text-accent-foreground',
            'focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'data-[state=open]:border-ring data-[state=open]:ring-3 data-[state=open]:ring-ring/50',
            label ? 'text-foreground' : 'text-muted-foreground',
            className,
          )}
        >
          <span className="truncate capitalize">{label ?? placeholder}</span>
          <ChevronDownIcon className="pointer-events-none size-4 shrink-0 text-muted-foreground transition-transform duration-200 [[data-state=open]_&]:rotate-180" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="max-h-[250px] overflow-y-auto"
      >
        {options.map((opt) => (
          <DropdownMenuCheckboxItem
            key={opt.value}
            checked={draft.includes(opt.value)}
            onCheckedChange={() => toggle(opt.value)}
            onSelect={(e) => e.preventDefault()}
            disabled={disabled}
            className="capitalize"
          >
            {opt.label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
