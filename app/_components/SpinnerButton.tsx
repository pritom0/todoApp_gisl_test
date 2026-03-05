// import { Button, ButtonProps } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import { ComponentProps, ReactNode } from "react";
import { Spinner } from "@/components/ui/spinner";

type ButtonProps = ComponentProps<typeof Button>;

interface SpinnerButtonProps extends ButtonProps {
  children: ReactNode;
  isLoading?: boolean;
}

export default function SpinnerButton({
  className,
  children,
  isLoading,
  ...rest
}: SpinnerButtonProps) {
  return (
    <div
      className={
        " " + className
      }
    >
          <Button disabled={isLoading} {...rest}>
        {isLoading && (
            <Spinner />
        )}
            {children}
          </Button>
    </div>
  );
}

{/* <Item variant="muted">
  <ItemMedia>
    <Spinner />
  </ItemMedia>
  <ItemContent>
    <ItemTitle className="line-clamp-1">Processing payment...</ItemTitle>
  </ItemContent>
  <ItemContent className="flex-none justify-end">
    <span className="text-sm tabular-nums">$100.00</span>
  </ItemContent>
</Item> */}