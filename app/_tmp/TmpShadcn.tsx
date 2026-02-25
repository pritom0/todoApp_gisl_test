"use client"

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
      <AlertDemo />
    </div>
  );
}

// property) variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined
//


import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2Icon, InfoIcon } from "lucide-react"

export function AlertDemo() {
  return (
    <div className="grid w-full max-w-md items-start gap-4">
      <Alert>
        <CheckCircle2Icon />
        <AlertTitle>Payment successful</AlertTitle>
        <AlertDescription>
          Your payment of $29.99 has been processed. A receipt has been sent to
          your email address.
        </AlertDescription>
      </Alert>
      <Alert>
        <InfoIcon />
        <AlertTitle>New feature available</AlertTitle>
        <AlertDescription>
          We&apos;ve added dark mode support. You can enable it in your account
          settings.
        </AlertDescription>
      </Alert>
      <SonnerDemo />
      <Notification2 />
      <Notification3 />
    </div>
  )
}

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


// import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export function SonnerDemo() {
  console.log("sonner test")
  return (
    <Button
      variant="outline"
      onClick={() =>
        toast("Event has been created", {
          description: "Sunday, December 03, 2023 at 9:00 AM",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        })
      }
    >
      Show Toast
    </Button>
  )
}

export function Notification2(){
  return (
    <>
      <Button
        onClick={()=> {
          toast("toast at the top", {
            description: "showing a pop up message",
            position: "top-center",

          },
        )
        }}
      > pop up </Button>

    </>
  )
}


export function Notification3(){
  return (
    <>
      <Button
        onClick={()=> {
          toast.promise<{name: string}> ( () => new Promise((resolve => setTimeout(()=>resolve({name: "a new event"}),1000))),
          {
              loading: "Loading...",
              success: (data) => `${data.name} has been created`,
              error: "Error",

          } 
        )
        }}
      > pop up </Button>

    </>
  )
}
