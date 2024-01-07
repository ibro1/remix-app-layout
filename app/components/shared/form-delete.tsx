import { useFetcher, useLocation } from "@remix-run/react"
import { useState } from "react"

import { Iconify } from "~/components/libs/icon"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog"
import { Button } from "~/components/ui/button"
import { ButtonLoading } from "~/components/ui/button-loading"

export function FormDelete({
  action,
  intentValue,
  itemText,
  name = "id",
  defaultValue,
  buttonText = "Delete",
  disabled,
  extraComponent,
  className,
}: {
  action: string // Example: /user/posts/delete
  intentValue: string // Example: delete-post-by-id
  itemText: string // Example: post name
  name?: string // Optional because can be with/without input name=id
  defaultValue?: string // Optional because can be with/without id value
  buttonText?: string
  disabled?: boolean
  extraComponent?: React.ReactNode
  className?: string
}) {
  const [open, setOpen] = useState<boolean>()
  const location = useLocation()
  const fetcher = useFetcher()
  const isSubmitting =
    fetcher.state === "submitting" && fetcher.formMethod === "DELETE"

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild className={className}>
        <Button variant="outline" size="xs" disabled={disabled}>
          <Iconify icon="ph:trash-duotone" />
          <span>{buttonText}</span>
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete {itemText}?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete {itemText}. This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <fetcher.Form
            action={action || location.pathname}
            onSubmit={event => {
              fetcher.submit(event.currentTarget.form as FormData, {
                method: "DELETE",
              })
              setOpen(false)
            }}
          >
            {name && defaultValue && (
              <input type="hidden" name={name} defaultValue={defaultValue} />
            )}

            {extraComponent}

            <ButtonLoading
              type="submit"
              size="sm"
              variant="destructive"
              name="intent"
              value={intentValue}
              loadingText="Deleting"
              isLoading={isSubmitting}
            >
              Delete
            </ButtonLoading>
          </fetcher.Form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
