"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"


function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
     className={`shrink-0 bg-border h-px w-max ${className}`}
      {...props}
    />
  )
}

export { Separator }
