type ConfirmDialogProps = {
  isOpen: boolean
  title: string
  description?: string
  onConfirm: () => void
  onCancel: () => void
}

export default function ConfirmDialog({
  isOpen,
  title,
  description,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-sm shadow-lg w-full">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        {description && <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>}
        <div className="flex justify-end space-x-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-md border hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Hủy
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  )
}