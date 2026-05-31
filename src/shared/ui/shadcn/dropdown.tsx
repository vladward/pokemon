'use client';

import { ChevronDown } from 'lucide-react';

import { cn } from '@/shared/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/ui/shadcn/dropdown-menu';

export interface DropdownItem {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}

export interface DropdownGroup {
  label?: string;
  items: DropdownItem[];
}

interface DropdownMenuBasicProps {
  trigger?: React.ReactNode;
  groups: DropdownGroup[];
  className?: string;
}

export function DropdownMenuBasic({ trigger = 'Open', groups, className }: DropdownMenuBasicProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            'flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold uppercase',
            'border-2 border-lightBlue text-lightBlue bg-transparent',
            'hover:bg-lightBlue/10 transition-colors duration-150 cursor-pointer',
            'focus:outline-none data-[state=open]:bg-lightBlue/10',
            className,
          )}
        >
          {trigger}
          <ChevronDown className="w-3 h-3 opacity-60 transition-transform duration-200 [[data-state=open]_&]:rotate-180" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="z-[1005] min-w-[80px] p-1 rounded-xl border-2 border-lightBlue/20 bg-white dark:bg-[var(--bg-primary)] shadow-lg"
      >
        {groups.map((group, gi) => (
          <div key={gi}>
            {gi > 0 && <DropdownMenuSeparator className="bg-lightBlue/10" />}
            <DropdownMenuGroup>
              {group.label && (
                <DropdownMenuLabel className="text-xs text-lightBlue/60 px-2">
                  {group.label}
                </DropdownMenuLabel>
              )}
              {group.items.map((item, ii) => (
                <DropdownMenuItem
                  key={ii}
                  disabled={item.disabled}
                  onClick={item.onClick}
                  className="text-xs font-bold uppercase text-lightBlue rounded-lg px-3 py-1.5 cursor-pointer focus:bg-yellow focus:text-lightBlue"
                >
                  {item.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
