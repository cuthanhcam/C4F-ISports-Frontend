type ConfirmDialogProps = {
  isOpen: boolean;
  title: string;
  description?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmDialog({
  isOpen,
  title,
  description,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-surface-1 dark:bg-dark-surface-1 rounded-xl p-6 max-w-sm w-full shadow-navigation dark:shadow-navigation-dark border border-outline-variant dark:border-dark-outline-variant">
        <h2 className="text-lg font-semibold text-surface-on dark:text-dark-surface-on mb-2">{title}</h2>
        {description && (
          <p className="text-surface-onVariant dark:text-dark-surface-onVariant mb-4">{description}</p>
        )}
        <div className="flex justify-end space-x-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-md border border-outline-variant dark:border-dark-outline-variant text-surface-on dark:text-dark-surface-on hover:bg-surface-3 dark:hover:bg-dark-surface-3 transition-colors duration-200"
          >
            Hủy
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-md bg-primary dark:bg-dark-primary text-primary-on dark:text-dark-primary-on hover:bg-primary-shade dark:hover:bg-dark-primary-shade transition-colors duration-200"
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
}