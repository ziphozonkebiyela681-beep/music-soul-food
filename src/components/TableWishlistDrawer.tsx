import React from 'react';
import { X, Trash2, ArrowRight, MessageSquareQuote, Plus, Minus } from 'lucide-react';
import { MenuItem } from '../data/menuData';

export interface WishlistItem {
  item: MenuItem;
  quantity: number;
}

interface TableWishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: WishlistItem[];
  onUpdateQuantity: (itemId: string, delta: number) => void;
  onClear: () => void;
  onProceedToReservation: () => void;
}

export const TableWishlistDrawer: React.FC<TableWishlistDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onClear,
  onProceedToReservation,
}) => {
  if (!isOpen) return null;

  const totalAmount = items.reduce(
    (sum, entry) => sum + entry.item.priceNum * entry.quantity,
    0
  );
  const totalCount = items.reduce((sum, entry) => sum + entry.quantity, 0);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Table Order Wishlist"
      className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md h-full bg-[#14110e] border-l border-[#d99120]/30 shadow-2xl flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#292524] bg-[#1a1613]">
          <div>
            <h3 className="font-serif-display text-xl tracking-wide text-[#fce8bd]">
              Table Meal Selection
            </h3>
            <p className="text-xs text-[#a8a29e] mt-0.5">
              {totalCount} {totalCount === 1 ? 'item' : 'items'} planned for your visit
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-[#a8a29e] hover:text-[#fce8bd] hover:bg-[#292524] transition-colors"
            aria-label="Close wishlist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Item List */}
        <div className="flex-1 overflow-y-auto p-5 divide-y divide-[#241e1b]">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#78716c]">
              <MessageSquareQuote className="w-12 h-12 stroke-[1.2] text-[#44403c] mb-3" />
              <p className="text-sm font-medium text-[#d6d3d1]">Your table selection is empty</p>
              <p className="text-xs text-[#78716c] mt-1 max-w-xs">
                Browse our soul food menu and click &ldquo;Add to Table&rdquo; on any dish you want to reserve.
              </p>
            </div>
          ) : (
            items.map(({ item, quantity }) => (
              <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <span className="text-[11px] uppercase tracking-wider text-[#d99120] font-medium block">
                    {item.categoryLabel}
                  </span>
                  <h4 className="text-sm font-semibold text-[#f5f5f4] truncate mt-0.5">
                    {item.name}
                  </h4>
                  <p className="text-xs text-[#a8a29e] font-mono tabular-nums mt-1">
                    {item.price} each
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <div className="flex items-center border border-[#3f352e] rounded-lg bg-[#0e0c0a] overflow-hidden">
                    <button
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      className="p-1.5 text-[#a8a29e] hover:text-[#fce8bd] hover:bg-[#292524] transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-2.5 text-xs font-mono font-medium text-[#f5f5f4] tabular-nums">
                      {quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      className="p-1.5 text-[#a8a29e] hover:text-[#fce8bd] hover:bg-[#292524] transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <span className="text-xs font-semibold text-[#f5c768] font-mono tabular-nums w-14 text-right">
                    R {item.priceNum * quantity}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer with Subtotal & Proceed to Booking CTA */}
        {items.length > 0 && (
          <div className="p-5 border-t border-[#292524] bg-[#1a1613] space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#a8a29e]">Estimated Total</span>
              <span className="text-lg font-bold font-mono text-[#fce8bd] tabular-nums">
                R {totalAmount}
              </span>
            </div>

            <p className="text-[11px] text-[#baa998] leading-relaxed">
              These dishes will be attached to your table reservation summary so you can easily quote them when calling our booking desk.
            </p>

            <div className="flex items-center gap-2">
              <button
                onClick={onClear}
                className="p-2.5 rounded-lg border border-[#3f352e] text-[#a8a29e] hover:text-red-400 hover:border-red-900/50 transition-colors"
                title="Clear all items"
                aria-label="Clear all items"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <button
                onClick={onProceedToReservation}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#d99120] hover:bg-[#e5a93c] text-black font-semibold text-sm transition-all shadow-lg shadow-[#d99120]/20"
              >
                <span>Save to Table Reservation Plan</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
