import React, { useState, useMemo } from 'react';
import {
  Search,
  Plus,
  Check,
  Utensils,
  Leaf,
  Sparkles,
  SlidersHorizontal,
  X
} from 'lucide-react';
import { MENU_ITEMS, CATEGORIES, MenuItem } from '../data/menuData';
import { WishlistItem } from './TableWishlistDrawer';

interface MenuSectionProps {
  onAddToWishlist: (item: MenuItem) => void;
  wishlistItems: WishlistItem[];
  onOpenWishlist: () => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  onAddToWishlist,
  wishlistItems,
  onOpenWishlist,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [vegetarianOnly, setVegetarianOnly] = useState(false);
  const [specialsOnly, setSpecialsOnly] = useState(false);
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  // Filter items
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category match
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Vegetarian filter
      if (vegetarianOnly && !item.isVegetarian) {
        return false;
      }
      // Specials filter
      if (specialsOnly && !item.isSpecial) {
        return false;
      }
      // Search match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesCategory = item.categoryLabel.toLowerCase().includes(query);
        return matchesName || matchesDesc || matchesCategory;
      }
      return true;
    });
  }, [selectedCategory, searchQuery, vegetarianOnly, specialsOnly]);

  const handleAdd = (item: MenuItem) => {
    onAddToWishlist(item);
    setRecentlyAddedId(item.id);
    setTimeout(() => {
      setRecentlyAddedId(null);
    }, 1200);
  };

  const getWishlistQuantity = (itemId: string) => {
    const found = wishlistItems.find((wi) => wi.item.id === itemId);
    return found ? found.quantity : 0;
  };

  const totalWishlistCount = wishlistItems.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <section id="menu" className="py-16 lg:py-24 bg-[#15110e] border-b border-[#36271c]/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#2d2118]">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#d99120] uppercase tracking-widest mb-1.5">
              <span>Maboneng Kitchen Roster</span>
              <span aria-hidden="true">·</span>
              <span>Ground Floor</span>
            </div>
            <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-medium text-[#fce8bd]">
              The Soul Menu
            </h2>
            <p className="mt-2 text-sm text-[#baa998] max-w-xl">
              Authentic soul recipes, hearty breakfasts, flame-charred steaks, slow braised specialities, and artisan pastas.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {totalWishlistCount > 0 && (
              <button
                onClick={onOpenWishlist}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#d99120] hover:bg-[#e5a93c] text-black text-xs font-semibold transition-all shadow-md shadow-[#d99120]/25"
              >
                <Utensils className="w-4 h-4" />
                <span>Selected Dishes ({totalWishlistCount})</span>
              </button>
            )}
          </div>
        </div>

        {/* Search & Filter Controls Toolbar */}
        <div className="mt-6 flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#78716c]" />
            <input
              type="text"
              placeholder="Search dishes (e.g. Lamb Shank, Ribs, Mussels, Oxtail)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#14110e] border border-[#2e2621] rounded-lg pl-10 pr-10 py-2.5 text-xs text-[#f5f5f4] placeholder-[#78716c] focus:outline-none focus:border-[#d99120] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#78716c] hover:text-[#d6d3d1]"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter Toggles */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setVegetarianOnly(!vegetarianOnly)}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border transition-colors ${
                vegetarianOnly
                  ? 'border-emerald-600/70 bg-emerald-950/40 text-emerald-400'
                  : 'border-[#2e2621] bg-[#14110e] text-[#a8a29e] hover:text-[#d6d3d1]'
              }`}
            >
              <Leaf className="w-3.5 h-3.5" />
              <span>Vegetarian Friendly</span>
            </button>

            <button
              onClick={() => setSpecialsOnly(!specialsOnly)}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border transition-colors ${
                specialsOnly
                  ? 'border-[#d99120] bg-[#d99120]/15 text-[#fce8bd]'
                  : 'border-[#2e2621] bg-[#14110e] text-[#a8a29e] hover:text-[#d6d3d1]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Chef&rsquo;s Signatures</span>
            </button>

            {(searchQuery || vegetarianOnly || specialsOnly || selectedCategory !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setVegetarianOnly(false);
                  setSpecialsOnly(false);
                  setSelectedCategory('all');
                }}
                className="px-3 py-2 text-xs text-[#78716c] hover:text-[#fce8bd] transition-colors"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* Category Tabs (Segmented Navigation) */}
        <div className="mt-6 flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none border-b border-[#241e1b]">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-2 text-xs font-medium whitespace-nowrap shrink-0 rounded-lg transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-[#d99120] text-black font-semibold shadow-sm'
                  : 'text-[#a8a29e] hover:text-[#fce8bd] hover:bg-[#1a1613]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Results Counter */}
        <div className="mt-6 flex items-center justify-between text-xs text-[#78716c]">
          <span>
            Showing <strong className="text-[#fce8bd] font-mono tabular-nums">{filteredItems.length}</strong> {filteredItems.length === 1 ? 'dish' : 'dishes'}
          </span>
          <span className="hidden sm:inline">
            All grilled meats served with your choice of side.
          </span>
        </div>

        {/* Menu Cards Grid */}
        {filteredItems.length === 0 ? (
          <div className="mt-12 py-16 text-center border border-dashed border-[#2e2621] rounded-2xl bg-[#14110e]/50">
            <SlidersHorizontal className="w-8 h-8 text-[#57534e] mx-auto mb-3" />
            <p className="text-sm font-medium text-[#d6d3d1]">No matching dishes found</p>
            <p className="text-xs text-[#78716c] mt-1">
              Try adjusting your search terms or clearing the filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setVegetarianOnly(false);
                setSpecialsOnly(false);
                setSelectedCategory('all');
              }}
              className="mt-4 px-4 py-2 bg-[#1e1915] text-xs text-[#fce8bd] hover:bg-[#292524] rounded-lg transition-colors"
            >
              Show Full Menu
            </button>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredItems.map((item) => {
              const qty = getWishlistQuantity(item.id);
              const isRecent = recentlyAddedId === item.id;

              return (
                <div
                  key={item.id}
                  className="group relative flex flex-col justify-between bg-[#14110e] border border-[#28211c] hover:border-[#d99120]/40 rounded-xl p-5 transition-all duration-200 hover:-translate-y-0.5 shadow-lg"
                >
                  <div>
                    {/* Quiet unboxed metadata line */}
                    <div className="flex items-center justify-between gap-2 text-xs text-[#78716c] mb-1.5">
                      <div className="flex items-center gap-1.5">
                        <span className="uppercase text-[11px] tracking-wider text-[#d99120] font-medium">
                          {item.categoryLabel}
                        </span>
                        {item.badge && (
                          <>
                            <span aria-hidden="true" className="text-[#44403c]">·</span>
                            <span className="text-[#fce8bd]/80 text-[11px]">{item.badge}</span>
                          </>
                        )}
                        {item.isVegetarian && (
                          <>
                            <span aria-hidden="true" className="text-[#44403c]">·</span>
                            <span className="text-emerald-400 text-[11px]">Vegetarian</span>
                          </>
                        )}
                      </div>

                      {/* Tabular Price */}
                      <span className="font-mono font-semibold text-sm text-[#f5c768] tabular-nums shrink-0">
                        {item.price}
                      </span>
                    </div>

                    {/* Dish Title */}
                    <h3 className="font-serif-display text-lg font-semibold text-[#f5f5f4] group-hover:text-[#fce8bd] transition-colors leading-snug">
                      {item.name}
                    </h3>

                    {/* Description */}
                    <p className="mt-2 text-xs text-[#a8a29e] leading-relaxed">
                      {item.description}
                    </p>

                    {/* Specific details / options note */}
                    {item.details && (
                      <p className="mt-2 text-[11px] text-[#78716c] italic">
                        {item.details}
                      </p>
                    )}
                  </div>

                  {/* Card Bottom: Table Wishlist Action */}
                  <div className="mt-5 pt-3.5 border-t border-[#221c17] flex items-center justify-between">
                    <span className="text-[11px] text-[#57534e]">
                      {qty > 0 ? (
                        <span className="text-[#fce8bd] font-medium font-mono">
                          {qty} added to table
                        </span>
                      ) : (
                        'Maboneng Hearth'
                      )}
                    </span>

                    <button
                      onClick={() => handleAdd(item)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                        isRecent
                          ? 'bg-emerald-600 text-white'
                          : qty > 0
                          ? 'bg-[#29221b] text-[#fce8bd] border border-[#d99120]/40 hover:bg-[#382f25]'
                          : 'bg-[#1e1915] text-[#d6d3d1] border border-[#2e2621] hover:border-[#d99120]/60 hover:text-white'
                      }`}
                      aria-label={`Add ${item.name} to Table Selection`}
                    >
                      {isRecent ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5 text-[#d99120]" />
                          <span>{qty > 0 ? 'Add More' : 'Add to Table'}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
