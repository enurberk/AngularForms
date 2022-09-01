import { isAfter, isBefore, isDisabledDay, isSameDay, isSameMonth, shiftDate } from 'ngx-bootstrap/chronos';
import { isMonthDisabled, isDisabledDate, isEnabledDate } from '../utils/bs-calendar-utils';
export function flagDaysCalendar(formattedMonth, options) {
    formattedMonth.weeks.forEach((week) => {
        week.days.forEach((day, dayIndex) => {
            // datepicker
            const isOtherMonth = !isSameMonth(day.date, formattedMonth.month);
            const isHovered = !isOtherMonth && isSameDay(day.date, options.hoveredDate);
            // date range picker
            const isSelectionStart = !isOtherMonth &&
                options.selectedRange &&
                isSameDay(day.date, options.selectedRange[0]);
            const isSelectionEnd = !isOtherMonth &&
                options.selectedRange &&
                isSameDay(day.date, options.selectedRange[1]);
            const isSelected = (!isOtherMonth && isSameDay(day.date, options.selectedDate)) ||
                isSelectionStart ||
                isSelectionEnd;
            const isInRange = !isOtherMonth &&
                options.selectedRange &&
                isDateInRange(day.date, options.selectedRange, options.hoveredDate);
            const isDisabled = options.isDisabled ||
                isBefore(day.date, options.minDate, 'day') ||
                isAfter(day.date, options.maxDate, 'day') ||
                isDisabledDay(day.date, options.daysDisabled) ||
                isDisabledDate(day.date, options.datesDisabled) ||
                isEnabledDate(day.date, options.datesEnabled);
            const currentDate = new Date();
            const isToday = !isOtherMonth && isSameDay(day.date, currentDate);
            const customClasses = options.dateCustomClasses && options.dateCustomClasses
                .map(dcc => isSameDay(day.date, dcc.date) ? dcc.classes : [])
                .reduce((previousValue, currentValue) => previousValue.concat(currentValue), [])
                .join(' ')
                || '';
            const tooltipText = options.dateTooltipTexts && options.dateTooltipTexts
                .map(tt => isSameDay(day.date, tt.date) ? tt.tooltipText : '')
                .reduce((previousValue, currentValue) => {
                previousValue.push(currentValue);
                return previousValue;
            }, [])
                .join(' ')
                || '';
            // decide update or not
            const newDay = Object.assign({}, day, {
                isOtherMonth,
                isHovered,
                isSelected,
                isSelectionStart,
                isSelectionEnd,
                isInRange,
                isDisabled,
                isToday,
                customClasses,
                tooltipText
            });
            if (day.isOtherMonth !== newDay.isOtherMonth ||
                day.isHovered !== newDay.isHovered ||
                day.isSelected !== newDay.isSelected ||
                day.isSelectionStart !== newDay.isSelectionStart ||
                day.isSelectionEnd !== newDay.isSelectionEnd ||
                day.isDisabled !== newDay.isDisabled ||
                day.isInRange !== newDay.isInRange ||
                day.customClasses !== newDay.customClasses ||
                day.tooltipText !== newDay.tooltipText) {
                week.days[dayIndex] = newDay;
            }
        });
    });
    // todo: add check for linked calendars
    formattedMonth.hideLeftArrow =
        options.isDisabled ||
            (!!options.monthIndex && options.monthIndex > 0 && options.monthIndex !== options.displayMonths);
    formattedMonth.hideRightArrow =
        options.isDisabled ||
            ((!!options.monthIndex || options.monthIndex === 0) && !!options.displayMonths && options.monthIndex < options.displayMonths &&
                options.monthIndex + 1 !== options.displayMonths);
    formattedMonth.disableLeftArrow = isMonthDisabled(shiftDate(formattedMonth.month, { month: -1 }), options.minDate, options.maxDate);
    formattedMonth.disableRightArrow = isMonthDisabled(shiftDate(formattedMonth.month, { month: 1 }), options.minDate, options.maxDate);
    return formattedMonth;
}
function isDateInRange(date, selectedRange, hoveredDate) {
    if (!date || !selectedRange || !selectedRange[0]) {
        return false;
    }
    if (selectedRange[1]) {
        return date > selectedRange[0] && date <= selectedRange[1];
    }
    if (hoveredDate) {
        return date > selectedRange[0] && date <= hoveredDate;
    }
    return false;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxhZy1kYXlzLWNhbGVuZGFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2RhdGVwaWNrZXIvZW5naW5lL2ZsYWctZGF5cy1jYWxlbmRhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFRQSxPQUFPLEVBQ0wsT0FBTyxFQUNQLFFBQVEsRUFDUixhQUFhLEVBQ2IsU0FBUyxFQUNULFdBQVcsRUFDWCxTQUFTLEVBQ1YsTUFBTSx1QkFBdUIsQ0FBQztBQUUvQixPQUFPLEVBQUUsZUFBZSxFQUFFLGNBQWMsRUFBRSxhQUFhLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQWtCNUYsTUFBTSxVQUFVLGdCQUFnQixDQUM5QixjQUFxQyxFQUNyQyxPQUF5QztJQUV6QyxjQUFjLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQW1CLEVBQUUsRUFBRTtRQUMvQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQWlCLEVBQUUsUUFBZ0IsRUFBRSxFQUFFO1lBQzVELGFBQWE7WUFDYixNQUFNLFlBQVksR0FBRyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUVsRSxNQUFNLFNBQVMsR0FDYixDQUFDLFlBQVksSUFBSSxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDNUQsb0JBQW9CO1lBQ3BCLE1BQU0sZ0JBQWdCLEdBQ3BCLENBQUMsWUFBWTtnQkFDYixPQUFPLENBQUMsYUFBYTtnQkFDckIsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hELE1BQU0sY0FBYyxHQUNsQixDQUFDLFlBQVk7Z0JBQ2IsT0FBTyxDQUFDLGFBQWE7Z0JBQ3JCLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFF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RSxDQUFDLEVBQzlDLE9BQU8sQ0FBQyxPQUFPLEVBQ2YsT0FBTyxDQUFDLE9BQU8sQ0FDaEIsQ0FBQztJQUNGLGNBQWMsQ0FBQyxpQkFBaUIsR0FBRyxlQUFlLENBQ2hELFNBQVMsQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQzdDLE9BQU8sQ0FBQyxPQUFPLEVBQ2YsT0FBTyxDQUFDLE9BQU8sQ0FDaEIsQ0FBQztJQUNGLE9BQU8sY0FBYyxDQUFDO0FBQ3hCLENBQUM7QUFFRCxTQUFTLGFBQWEsQ0FDcEIsSUFBVSxFQUNWLGFBQXNCLEVBQ3RCLFdBQWtCO0lBRWxCLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxhQUFhLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFDaEQsT0FBTyxLQUFLLENBQUM7S0FDZDtJQUVELElBQUksYUFBYSxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBQ3BCLE9BQU8sSUFBSSxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQzVEO0lBRUQsSUFBSSxXQUFXLEVBQUU7UUFDZixPQUFPLElBQUksR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLFdBQVcsQ0FBQztLQUN2RDtJQUVELE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIERheXNDYWxlbmRhclZpZXdNb2RlbCxcbiAgRGF5Vmlld01vZGVsLFxuICBXZWVrVmlld01vZGVsLFxuICBEYXRlcGlja2VyRGF0ZUN1c3RvbUNsYXNzZXMsXG4gIERhdGVwaWNrZXJEYXRlVG9vbHRpcFRleHRcbn0gZnJvbSAnLi4vbW9kZWxzJztcblxuaW1wb3J0IHtcbiAgaXNBZnRlcixcbiAgaXNCZWZvcmUsXG4gIGlzRGlzYWJsZWREYXksXG4gIGlzU2FtZURheSxcbiAgaXNTYW1lTW9udGgsXG4gIHNoaWZ0RGF0ZVxufSBmcm9tICduZ3gtYm9vdHN0cmFwL2Nocm9ub3MnO1xuXG5pbXBvcnQgeyBpc01vbnRoRGlzYWJsZWQsIGlzRGlzYWJsZWREYXRlLCBpc0VuYWJsZWREYXRlIH0gZnJvbSAnLi4vdXRpbHMvYnMtY2FsZW5kYXItdXRpbHMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEZsYWdEYXlzQ2FsZW5kYXJPcHRpb25zIHtcbiAgaXNEaXNhYmxlZDogYm9vbGVhbjtcbiAgbWluRGF0ZTogRGF0ZTtcbiAgbWF4RGF0ZTogRGF0ZTtcbiAgZGF5c0Rpc2FibGVkOiBudW1iZXJbXTtcbiAgZGF0ZXNEaXNhYmxlZDogRGF0ZVtdO1xuICBkYXRlc0VuYWJsZWQ6IERhdGVbXTtcbiAgaG92ZXJlZERhdGU6IERhdGU7XG4gIHNlbGVjdGVkRGF0ZTogRGF0ZTtcbiAgc2VsZWN0ZWRSYW5nZTogRGF0ZVtdO1xuICBkaXNwbGF5TW9udGhzOiBudW1iZXI7XG4gIG1vbnRoSW5kZXg6IG51bWJlcjtcbiAgZGF0ZUN1c3RvbUNsYXNzZXM6IERhdGVwaWNrZXJEYXRlQ3VzdG9tQ2xhc3Nlc1tdO1xuICBkYXRlVG9vbHRpcFRleHRzOiBEYXRlcGlja2VyRGF0ZVRvb2x0aXBUZXh0W107XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmbGFnRGF5c0NhbGVuZGFyKFxuICBmb3JtYXR0ZWRNb250aDogRGF5c0NhbGVuZGFyVmlld01vZGVsLFxuICBvcHRpb25zOiBQYXJ0aWFsPEZsYWdEYXlzQ2FsZW5kYXJPcHRpb25zPlxuKTogRGF5c0NhbGVuZGFyVmlld01vZGVsIHtcbiAgZm9ybWF0dGVkTW9udGgud2Vla3MuZm9yRWFjaCgod2VlazogV2Vla1ZpZXdNb2RlbCkgPT4ge1xuICAgICAgICB3ZWVrLmRheXMuZm9yRWFjaCgoZGF5OiBEYXlWaWV3TW9kZWwsIGRheUluZGV4OiBudW1iZXIpID0+IHtcbiAgICAgIC8vIGRhdGVwaWNrZXJcbiAgICAgIGNvbnN0IGlzT3RoZXJNb250aCA9ICFpc1NhbWVNb250aChkYXkuZGF0ZSwgZm9ybWF0dGVkTW9udGgubW9udGgpO1xuXG4gICAgICBjb25zdCBpc0hvdmVyZWQgPVxuICAgICAgICAhaXNPdGhlck1vbnRoICYmIGlzU2FtZURheShkYXkuZGF0ZSwgb3B0aW9ucy5ob3ZlcmVkRGF0ZSk7XG4gICAgICAvLyBkYXRlIHJhbmdlIHBpY2tlclxuICAgICAgY29uc3QgaXNTZWxlY3Rpb25TdGFydCA9XG4gICAgICAgICFpc090aGVyTW9udGggJiZcbiAgICAgICAgb3B0aW9ucy5zZWxlY3RlZFJhbmdlICYmXG4gICAgICAgIGlzU2FtZURheShkYXkuZGF0ZSwgb3B0aW9ucy5zZWxlY3RlZFJhbmdlWzBdKTtcbiAgICAgIGNvbnN0IGlzU2VsZWN0aW9uRW5kID1cbiAgICAgICAgIWlzT3RoZXJNb250aCAmJlxuICAgICAgICBvcHRpb25zLnNlbGVjdGVkUmFuZ2UgJiZcbiAgICAgICAgaXNTYW1lRGF5KGRheS5kYXRlLCBvcHRpb25zLnNlbGVjdGVkUmFuZ2VbMV0pO1xuXG4gICAgICBjb25zdCBpc1NlbGVjdGVkID1cbiAgICAgICAgKCFpc090aGVyTW9udGggJiYgaXNTYW1lRGF5KGRheS5kYXRlLCBvcHRpb25zLnNlbGVjdGVkRGF0ZSkpIHx8XG4gICAgICAgIGlzU2VsZWN0aW9uU3RhcnQgfHxcbiAgICAgICAgaXNTZWxlY3Rpb25FbmQ7XG5cbiAgICAgIGNvbnN0IGlzSW5SYW5nZSA9XG4gICAgICAgICFpc090aGVyTW9udGggJiZcbiAgICAgICAgb3B0aW9ucy5zZWxlY3RlZFJhbmdlICYmXG4gICAgICAgIGlzRGF0ZUluUmFuZ2UoZGF5LmRhdGUsIG9wdGlvbnMuc2VsZWN0ZWRSYW5nZSwgb3B0aW9ucy5ob3ZlcmVkRGF0ZSk7XG5cbiAgICAgIGNvbnN0IGlzRGlzYWJsZWQgPVxuICAgICAgICBvcHRpb25zLmlzRGlzYWJsZWQgfHxcbiAgICAgICAgaXNCZWZvcmUoZGF5LmRhdGUsIG9wdGlvbnMubWluRGF0ZSwgJ2RheScpIHx8XG4gICAgICAgIGlzQWZ0ZXIoZGF5LmRhdGUsIG9wdGlvbnMubWF4RGF0ZSwgJ2RheScpIHx8XG4gICAgICAgIGlzRGlzYWJsZWREYXkoZGF5LmRhdGUsIG9wdGlvbnMuZGF5c0Rpc2FibGVkKSB8fFxuICAgICAgICBpc0Rpc2FibGVkRGF0ZShkYXkuZGF0ZSwgb3B0aW9ucy5kYXRlc0Rpc2FibGVkKSB8fFxuICAgICAgICBpc0VuYWJsZWREYXRlKGRheS5kYXRlLCBvcHRpb25zLmRhdGVzRW5hYmxlZCk7XG5cbiAgICAgIGNvbnN0IGN1cnJlbnREYXRlID0gbmV3IERhdGUoKTtcbiAgICAgIGNvbnN0IGlzVG9kYXkgPSAhaXNPdGhlck1vbnRoICYmIGlzU2FtZURheShkYXkuZGF0ZSwgY3VycmVudERhdGUpO1xuXG4gICAgICBjb25zdCBjdXN0b21DbGFzc2VzID0gb3B0aW9ucy5kYXRlQ3VzdG9tQ2xhc3NlcyAmJiBvcHRpb25zLmRhdGVDdXN0b21DbGFzc2VzXG4gICAgICAgIC5tYXAoZGNjID0+IGlzU2FtZURheShkYXkuZGF0ZSwgZGNjLmRhdGUpID8gZGNjLmNsYXNzZXMgOiBbXSlcbiAgICAgICAgLnJlZHVjZSgocHJldmlvdXNWYWx1ZSwgY3VycmVudFZhbHVlKSA9PiBwcmV2aW91c1ZhbHVlLmNvbmNhdChjdXJyZW50VmFsdWUpLCBbXSlcbiAgICAgICAgLmpvaW4oJyAnKVxuICAgICAgICB8fCAnJztcblxuICAgICAgY29uc3QgdG9vbHRpcFRleHQgPSBvcHRpb25zLmRhdGVUb29sdGlwVGV4dHMgJiYgb3B0aW9ucy5kYXRlVG9vbHRpcFRleHRzXG4gICAgICAgICAgLm1hcCh0dCA9PiBpc1NhbWVEYXkoZGF5LmRhdGUsIHR0LmRhdGUpID8gdHQudG9vbHRpcFRleHQgOiAnJylcbiAgICAgICAgICAucmVkdWNlKChwcmV2aW91c1ZhbHVlLCBjdXJyZW50VmFsdWUpID0+IHtcbiAgICAgICAgICAgIHByZXZpb3VzVmFsdWUucHVzaChjdXJyZW50VmFsdWUpO1xuICAgICAgICAgICAgcmV0dXJuIHByZXZpb3VzVmFsdWU7XG4gICAgICAgICAgfSwgW10gYXMgc3RyaW5nW10pXG4gICAgICAgICAgLmpvaW4oJyAnKVxuICAgICAgICB8fCAnJztcblxuICAgICAgLy8gZGVjaWRlIHVwZGF0ZSBvciBub3RcbiAgICAgIGNvbnN0IG5ld0RheSA9IE9iamVjdC5hc3NpZ24oe30sIGRheSwge1xuICAgICAgICBpc090aGVyTW9udGgsXG4gICAgICAgIGlzSG92ZXJlZCxcbiAgICAgICAgaXNTZWxlY3RlZCxcbiAgICAgICAgaXNTZWxlY3Rpb25TdGFydCxcbiAgICAgICAgaXNTZWxlY3Rpb25FbmQsXG4gICAgICAgIGlzSW5SYW5nZSxcbiAgICAgICAgaXNEaXNhYmxlZCxcbiAgICAgICAgaXNUb2RheSxcbiAgICAgICAgY3VzdG9tQ2xhc3NlcyxcbiAgICAgICAgdG9vbHRpcFRleHRcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoXG4gICAgICAgIGRheS5pc090aGVyTW9udGggIT09IG5ld0RheS5pc090aGVyTW9udGggfHxcbiAgICAgICAgZGF5LmlzSG92ZXJlZCAhPT0gbmV3RGF5LmlzSG92ZXJlZCB8fFxuICAgICAgICBkYXkuaXNTZWxlY3RlZCAhPT0gbmV3RGF5LmlzU2VsZWN0ZWQgfHxcbiAgICAgICAgZGF5LmlzU2VsZWN0aW9uU3RhcnQgIT09IG5ld0RheS5pc1NlbGVjdGlvblN0YXJ0IHx8XG4gICAgICAgIGRheS5pc1NlbGVjdGlvbkVuZCAhPT0gbmV3RGF5LmlzU2VsZWN0aW9uRW5kIHx8XG4gICAgICAgIGRheS5pc0Rpc2FibGVkICE9PSBuZXdEYXkuaXNEaXNhYmxlZCB8fFxuICAgICAgICBkYXkuaXNJblJhbmdlICE9PSBuZXdEYXkuaXNJblJhbmdlIHx8XG4gICAgICAgIGRheS5jdXN0b21DbGFzc2VzICE9PSBuZXdEYXkuY3VzdG9tQ2xhc3NlcyB8fFxuICAgICAgICBkYXkudG9vbHRpcFRleHQgIT09IG5ld0RheS50b29sdGlwVGV4dFxuICAgICAgKSB7XG4gICAgICAgIHdlZWsuZGF5c1tkYXlJbmRleF0gPSBuZXdEYXk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xuXG4gIC8vIHRvZG86IGFkZCBjaGVjayBmb3IgbGlua2VkIGNhbGVuZGFyc1xuICBmb3JtYXR0ZWRNb250aC5oaWRlTGVmdEFycm93ID1cbiAgICBvcHRpb25zLmlzRGlzYWJsZWQgfHxcbiAgICAoISFvcHRpb25zLm1vbnRoSW5kZXggJiYgb3B0aW9ucy5tb250aEluZGV4ID4gMCAmJiBvcHRpb25zLm1vbnRoSW5kZXggIT09IG9wdGlvbnMuZGlzcGxheU1vbnRocyk7XG4gIGZvcm1hdHRlZE1vbnRoLmhpZGVSaWdodEFycm93ID1cbiAgICBvcHRpb25zLmlzRGlzYWJsZWQgfHxcbiAgICAoKCEhb3B0aW9ucy5tb250aEluZGV4IHx8IG9wdGlvbnMubW9udGhJbmRleCA9PT0gMCkgJiYgISFvcHRpb25zLmRpc3BsYXlNb250aHMgJiYgb3B0aW9ucy5tb250aEluZGV4IDwgb3B0aW9ucy5kaXNwbGF5TW9udGhzICYmXG4gICAgICBvcHRpb25zLm1vbnRoSW5kZXggKyAxICE9PSBvcHRpb25zLmRpc3BsYXlNb250aHMpO1xuXG4gIGZvcm1hdHRlZE1vbnRoLmRpc2FibGVMZWZ0QXJyb3cgPSBpc01vbnRoRGlzYWJsZWQoXG4gICAgc2hpZnREYXRlKGZvcm1hdHRlZE1vbnRoLm1vbnRoLCB7IG1vbnRoOiAtMSB9KSxcbiAgICBvcHRpb25zLm1pbkRhdGUsXG4gICAgb3B0aW9ucy5tYXhEYXRlXG4gICk7XG4gIGZvcm1hdHRlZE1vbnRoLmRpc2FibGVSaWdodEFycm93ID0gaXNNb250aERpc2FibGVkKFxuICAgIHNoaWZ0RGF0ZShmb3JtYXR0ZWRNb250aC5tb250aCwgeyBtb250aDogMSB9KSxcbiAgICBvcHRpb25zLm1pbkRhdGUsXG4gICAgb3B0aW9ucy5tYXhEYXRlXG4gICk7XG4gIHJldHVybiBmb3JtYXR0ZWRNb250aDtcbn1cblxuZnVuY3Rpb24gaXNEYXRlSW5SYW5nZShcbiAgZGF0ZTogRGF0ZSxcbiAgc2VsZWN0ZWRSYW5nZT86IERhdGVbXSxcbiAgaG92ZXJlZERhdGU/OiBEYXRlXG4pOiBib29sZWFuIHtcbiAgaWYgKCFkYXRlIHx8ICFzZWxlY3RlZFJhbmdlIHx8ICFzZWxlY3RlZFJhbmdlWzBdKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKHNlbGVjdGVkUmFuZ2VbMV0pIHtcbiAgICByZXR1cm4gZGF0ZSA+IHNlbGVjdGVkUmFuZ2VbMF0gJiYgZGF0ZSA8PSBzZWxlY3RlZFJhbmdlWzFdO1xuICB9XG5cbiAgaWYgKGhvdmVyZWREYXRlKSB7XG4gICAgcmV0dXJuIGRhdGUgPiBzZWxlY3RlZFJhbmdlWzBdICYmIGRhdGUgPD0gaG92ZXJlZERhdGU7XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG4iXX0=