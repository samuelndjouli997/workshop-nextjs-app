import { useKBar } from 'kbar'
import React from 'react'
import { Button } from './ui/button';
import { Search } from 'lucide-react';

export function SearchInput() {
    const { query }: any = useKBar;
  return (
    <div className="w-full space-y-2">
      <Button
        variant="outline"
        className="relative h-9 w-full justify-start rounded-[0.5rem] bg-gray-100 border border-primary-blue text-sm font-normal text-primary-blue/50 shadow-none sm:pr-12 md:w-40 lg:w-64"
        // onClick={query.toggle}
      >
        <Search className="mr-2 h-4 w-4" />
        Recherche...
        <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-6 select-none items-center gap-1 rounded border bg-muted dark:bg-gray-100 dark:border-gray-300 px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
    </div>
  )
}
