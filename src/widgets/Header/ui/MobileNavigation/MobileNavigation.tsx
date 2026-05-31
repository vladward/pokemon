'use client';

import { useState } from 'react';

import { ThemeSwitcher } from '@/features/ThemeSwitcher';

import { NavLinks } from '@/entities/NavLinks';

import { BurgerButton } from '@/shared/ui';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/shared/ui/shadcn/sheet';

export const MobileNavigation = () => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet
      open={open}
      onOpenChange={setOpen}
    >
      <SheetTrigger asChild>
        <BurgerButton isActive={open} />
      </SheetTrigger>
      <SheetContent
        data-testid="mobile-drawer"
        onOverlayClick={() => setOpen(false)}
        className="py-[80px] px-[40px]"
      >
        <SheetTitle>Навигация</SheetTitle>
        <nav className="flex flex-col gap-10">
          <NavLinks
            isVertical
            callback={() => setOpen(false)}
          />
          <ThemeSwitcher />
        </nav>
      </SheetContent>
    </Sheet>
  );
};
