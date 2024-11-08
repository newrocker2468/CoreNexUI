"use client";

import * as React from "react";
//NOTE - Original import statement: import { addDays, format } from "date-fns";
import {format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FC } from "react";
interface DatePickerWithRangeProps {
  className?: React.HTMLAttributes<HTMLDivElement>;
  date: DateRange | undefined;
  setDate: (date: DateRange | undefined) => void;
}
 const DatePickerWithRange:FC<DatePickerWithRangeProps> = ({
  className,
  date,
  setDate
}) => {

// console.log('date', date)
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id='date'
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className='mr-2 h-4 w-4' />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='start'>
          <Calendar
            initialFocus
            mode='range'
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            disabled={(date) => date < new Date()}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
export default DatePickerWithRange;