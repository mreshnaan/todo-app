import { cn } from "../lib/utils";
import { forwardRef } from "react";

export const Menu = forwardRef(({ open, loading, ...other }, ref) => {
  if (loading) {
    return (
      <div
        ref={ref}
        className="m-0 mt-2 min-w-[8rem] overflow-hidden rounded-md border bg-black p-2.5 text-sm text-white shadow-md"
      >
        Loading...
      </div>
    );
  }
  return (
    <ul
      ref={ref}
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
      className="absolute top-2 m-0 min-w-[8rem] overflow-hidden rounded-md border bg-black p-1 text-white shadow-md"
      {...other}
    />
  );
});
Menu.displayName = "Menu";

/**
 * MenuItem component for the BeautifulMentionsPlugin.
 */
export const MenuItem = forwardRef(
  ({ selected, itemValue, label, ...props }, ref) => (
    <li
      ref={ref}
      className={cn(
        "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none",
        selected && "bg-slate-500 text-white"
      )}
      {...props}
    />
  )
);
MenuItem.displayName = "MenuItem";
