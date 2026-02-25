import { Button } from "@/components/ui/button";
import { ArrowUpIcon, CircleFadingArrowUpIcon } from "lucide-react";
import { IconGitBranch, IconGitFork } from "@tabler/icons-react";
import { Spinner } from "@/components/ui/spinner";

export default function TmpShadcn() {
  return (
    <div className="h-52 border-2 m-2 bg-blue-300">
      <div className="flex justify-center items-center h-full">
        <Button className="">click</Button>
        <Button className="" variant={"outline"}>
          click
        </Button>
        <Button className="" size={"icon"}>
          click
        </Button>
        <Button className="" aria-label={"submit"}>
          click
        </Button>
        <Button className="" size="xs">
          click
        </Button>
        <Button className="" size="icon-xs">
          click
        </Button>
        <Button className="" size="icon-xs">
          <ArrowUpIcon />
        </Button>
        <Button className="" size="icon-lg">
          <ArrowUpIcon />
        </Button>
        <Button className="" variant={"link"}>
          click
        </Button>
        <Button className="" variant={"default"}>
          click
        </Button>
        <Button className="" variant={"destructive"}>
          click
        </Button>
        <Button className="" variant={"secondary"}>
          click
        </Button>
        <Button className="" variant={"ghost"}>
          click
        </Button>
        <Button className="" variant={null}>
          click
        </Button>
        <Button className="" variant={undefined}>
          click
        </Button>
        <Button className="" variant={undefined}>
          <CircleFadingArrowUpIcon />
        </Button>

        <Button variant="outline">
          <IconGitBranch data-icon="inline-start" /> New Branch
        </Button>
        <Button variant="outline">
          Fork
          <IconGitFork data-icon="inline-end" />
        </Button>
        <Button variant="outline" disabled>
          <Spinner data-icon="inline-start" />
          Generating
        </Button>
        <Button variant="secondary" disabled>
          Downloading
          <Spinner data-icon="inline-start" />
        </Button>
      </div>
      <ButtonDemo />
    </div>
  );
}

// property) variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined
//

export function ButtonDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2 md:flex-row">
      <Button variant="outline">Button</Button>
      <Button variant="outline" size="icon" aria-label="Submit">
        <ArrowUpIcon />
      </Button>
    </div>
  );
}
