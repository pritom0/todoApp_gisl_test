import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

// export interface ISVGProps extends React.ComponentPropsWithoutRef<'svg'> {}
// Use a type alias instead of an empty interface
type SpinnerProps = React.ComponentPropsWithoutRef<"svg">;

export const Spinner = ({ className, ...props }: SpinnerProps) => {
  return (
    <Loader2 className={cn("h-4 w-4 animate-spin", className)} {...props} />
  );
};
