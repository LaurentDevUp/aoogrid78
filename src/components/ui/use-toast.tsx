import * as React from 'react';

type ToastVariant = 'default' | 'destructive';

interface ToastProps {
  id: string;
  title: string;
  description?: string;
  variant?: ToastVariant;
  action?: React.ReactNode;
}

type ToastContextType = {
  toasts: ToastProps[];
  toast: (props: Omit<ToastProps, 'id'>) => void;
  dismissToast: (id: string) => void;
};

const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastProps[]>([]);

  const dismissToast = React.useCallback((id: string) => {
    setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id));
  }, []);

  const toast = React.useCallback(({ title, description, variant = 'default', action }: Omit<ToastProps, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    
    setToasts((currentToasts) => [...currentToasts, { id, title, description, variant, action }]);

    const timer = setTimeout(() => {
      dismissToast(id);
    }, 5000);

    return () => clearTimeout(timer);
  }, [dismissToast]);

  const contextValue = React.useMemo(() => ({
    toasts,
    toast,
    dismissToast,
  }), [toasts, toast, dismissToast]);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <div className="fixed right-4 top-4 z-50 flex max-h-screen w-full flex-col-reverse gap-2 p-4 sm:bottom-0 sm:right-4 sm:top-auto sm:flex-col md:max-w-[420px]">
        {toasts.map((toastItem) => (
          <div 
            key={toastItem.id} 
            className={`w-full max-w-xs rounded-lg p-4 shadow-lg mb-2 relative ${
              toastItem.variant === 'destructive' ? 'bg-red-500 text-white' : 'bg-white'
            }`}
          >
            <div className="grid gap-1">
              <div className="font-medium">{toastItem.title}</div>
              {toastItem.description && (
                <div className="text-sm opacity-90">{toastItem.description}</div>
              )}
            </div>
            {toastItem.action}
            <button
              type="button"
              onClick={() => dismissToast(toastItem.id)}
              className="absolute right-2 top-2 rounded-md p-1 opacity-70 transition-opacity hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:pointer-events-none"
              aria-label="Close"
            >
              <span className="sr-only">Close</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = React.useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
