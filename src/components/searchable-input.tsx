"use client";

import { Button } from "@/src/components/ui/button";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/src/components/ui/command";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/src/components/ui/popover";
import { cn } from "@/src/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import React, { useEffect, useState } from "react";

// for merging classNames

export interface SelectItem {
  id: string;
  name: string;
}

interface SearchableSelectProps {
  fetchItems: () => Promise<SelectItem[]>;
  onSelect: (item: SelectItem) => void;
  placeholder?: string;
  className?: string;
  value?: string;
}

export default function SearchableSelect({
  fetchItems,
  onSelect,
  placeholder = "Select item...",
  className = "",
  value = "",
}: SearchableSelectProps) {
  const [items, setItems] = useState<SelectItem[]>([]);
  const [selected, setSelected] = useState<SelectItem | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchItems().then(setItems);
  }, [fetchItems]);

  useEffect(() => {
    if (!value) {
      setSelected(null);
    } else {
      const matchingItem = items.find((item) => item.name === value);
      if (matchingItem) {
        setSelected(matchingItem);
      }
    }
  }, [value, items]);

  const handleSelect = (item: SelectItem) => {
    setSelected(item);
    setOpen(false);
    onSelect(item);
  };

  return (
    <div className={cn("w-full ", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between  border-zinc-700"
          >
            {selected ? selected.name : placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-full p-0  border-zinc-700">
          <Command>
            <CommandInput placeholder="Search..." className="bg-background  " />
            <CommandList>
              {items.map((item) => (
                <CommandItem
                  key={item.id}
                  value={item.name}
                  onSelect={() => handleSelect(item)}
                  className=""
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selected?.id === item.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {item.name}
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
