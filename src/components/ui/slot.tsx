import * as React from "react"

export interface SlotProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode
}

export const Slot = React.forwardRef<HTMLElement, SlotProps>((props, ref) => {
  const { children, ...slotProps } = props

  if (React.isValidElement(children)) {
    return React.cloneElement(children, {
      ...slotProps,
      ...(children.props as any),
      ref: (node: any) => {
        if (typeof ref === "function") {
          ref(node)
        } else if (ref) {
          (ref as any).current = node
        }
        if ((children as any).ref) {
          if (typeof (children as any).ref === "function") {
            (children as any).ref(node)
          } else {
            (children as any).ref.current = node
          }
        }
      },
    } as any)
  }

  return React.Children.count(children) > 1 ? React.Children.only(null) : null
})

Slot.displayName = "Slot"
