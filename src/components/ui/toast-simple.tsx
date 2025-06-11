import * as React from 'react';

// Types
type ToastVariant = 'default' | 'destructive';

interface ToastProps {
  id: string;
  title: string;
  description?: string;
  variant?: ToastVariant;
}

type ToastContextType = {
  toasts: ToastProps[];
  toast: (props: Omit<ToastProps, 'id'>) => string;
  dismissToast: (id: string) => void;
};

// Create context with undefined as default value
const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

// Toast Provider Component
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastProps[]>([]);

  const dismissToast = React.useCallback((id: string) => {
    setToasts((current) => current.filter((t) => t.id !== id));
  }, []);

  const toast = React.useCallback((props: Omit<ToastProps, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast = { ...props, id };
    
    setToasts((current) => [...current, newToast]);

    // Auto-dismiss after 5 seconds
    setTimeout(() => dismissToast(id), 5000);
    
    return id;
  }, [dismissToast]);

  // Memoize context value
  const contextValue = React.useMemo(() => ({
    toasts,
    toast,
    dismissToast,
  }), [toasts, toast, dismissToast]);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <div 
            key={toast.id}
            className={`p-4 rounded-md shadow-lg ${
              toast.variant === 'destructive' 
                ? 'bg-red-500 text-white' 
                : 'bg-white text-gray-800'
            }`}
          >
            <div className="font-medium">{toast.title}</div>
            {toast.description && (
              <div className="text-sm opacity-90">{toast.description}</div>
            )}
            <button
              onClick={() => dismissToast(toast.id)}
              className="absolute top-2 right-2 opacity-70 hover:opacity-100"
              aria-label="Close"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

// Custom hook to use toast
export function useToast() {
  const context = React.useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

export default {
  Provider: ToastProvider,
  useToast,
};
