# StockX - Quick Start Guide

## 🚀 Starting the Application

### 1. Start Backend Server
```bash
cd backend
node server.js
```
Expected output:
```
MongoDB Connected
Server running on port 5000
```

### 2. Start Frontend Development Server
```bash
cd frontend
npm run dev
```
Expected output:
```
VITE ready in XXX ms
Local: http://localhost:5173/
```

## 🔐 Login

**URL**: http://localhost:5173/login

**Credentials**:
- Email: `admin@gmail.com`
- Password: `12345`

## 📱 Features Guide

### 1. Dashboard (`/`)
- View total products count
- View low stock items count
- Quick overview cards

### 2. Products (`/products`)
**Features**:
- **Search**: Type product name or category
- **Filter**: Select status (All/In Stock/Low Stock/Out of Stock)
- **Edit**: Click "Edit" button, modify fields, click "Save"
- **Delete**: Click "Delete" button, confirm deletion
- **Status Colors**:
  - 🟢 Green = In Stock
  - 🟡 Yellow = Low Stock
  - 🔴 Red = Out of Stock

### 3. Add Product (`/add`)
**Required Fields**:
- Product Name
- Category (select from dropdown)
- Price (numbers only)
- Stock (numbers only)
- Min Stock (threshold for low stock alert)

**Validation**: All fields required, shows error toast if missing

### 4. Categories (`/categories`)
**Actions**:
- **Add**: Type name and click "Add"
- **Delete**: Click delete button next to category
- **Note**: Cannot delete if products are using this category

### 5. Sales (`/sales`)
**Single Product Sale**:
1. Select product from dropdown
2. Enter quantity
3. Click "Sell Product"
4. Stock automatically reduces
5. Status updates if below minimum

### 6. Billing (`/billing`)
**Multi-Product Sales**:
1. **Select Products**: Click "Add" to add items to cart
2. **Adjust Quantities**: Change quantities in cart as needed
3. **Review Total**: See total amount at bottom
4. **Save Bill**: Click "Save Bill" to:
   - Generate unique invoice number
   - Reduce stock for all items
   - Create sales records
   - Download PDF automatically
5. **Download**: Click "Download" to get PDF without saving

**PDF Contains**:
- Invoice number
- Date & time
- All products with quantities and prices
- Total amount

### 7. Sales History (`/sales-history`)
**View Sales**:
- All sales grouped by invoice number
- Search by product name or invoice number
- Each invoice shows:
  - Invoice number
  - Date & time
  - List of products
  - Total amount per invoice

**Use Cases**:
- Track daily sales
- Find specific transactions
- Verify invoice details

### 8. Analytics (`/analytics`)
**Metrics Displayed**:
- **Total Revenue**: All-time sales revenue
- **Total Sales**: Count of all transactions
- **Today's Revenue**: Revenue from today's sales
- **Today's Sales**: Count of today's transactions
- **Top 5 Products**: Best selling products by quantity

**Use Cases**:
- Business performance overview
- Identify best-selling products
- Track daily performance

### 9. Low Stock (`/low-stock`)
**Purpose**:
- View all products with low stock status
- Take action to reorder
- Shows product name and current stock level

---

## 🎨 UI Features

### Toast Notifications
Appear in top-right corner:
- ✅ Green = Success
- ❌ Red = Error
- ⚠️ Yellow = Warning
- ℹ️ Blue = Info

Auto-dismiss after 3 seconds or click X to close

### Loading States
- Spinner appears during data loading
- Buttons show "Loading..." or "Processing..." when submitting
- Buttons disabled during operations

### Validation
- Required fields highlighted if empty
- Error messages shown in toast
- Confirmation dialogs for delete operations

---

## 🔧 Common Operations

### Adding a New Product
1. Go to "Add Product"
2. Fill all fields
3. Select existing category
4. Click "Add Product"
5. See success toast
6. Form clears for next entry

### Making a Sale (Single)
1. Go to "Sales"
2. Select product
3. Enter quantity
4. Click "Sell Product"
5. Stock reduces automatically

### Making Multiple Sales (Billing)
1. Go to "Billing"
2. Add multiple products to cart
3. Adjust quantities as needed
4. Click "Save Bill"
5. PDF downloads automatically
6. Cart clears

### Editing a Product
1. Go to "Products"
2. Click "Edit" on any product
3. Inline fields appear
4. Modify values
5. Click "Save" or "Cancel"
6. Status recalculates automatically

### Viewing Reports
1. Go to "Analytics"
2. View metrics cards
3. Check top products list
4. Compare today vs all-time

---

## ⚠️ Important Notes

### Stock Management
- Stock reduces automatically on sales
- Status updates automatically:
  - `In Stock` when stock > minStock
  - `Low Stock` when stock < minStock
  - `Out of Stock` when stock = 0

### Invoice Numbers
- Format: `INV1740XXXXXXXXX` (timestamp-based)
- Unique for each bill
- Groups multiple products in billing

### Search & Filter
- Search is case-insensitive
- Filters apply in real-time
- Combine search + filter for precise results

### Data Persistence
- All data stored in MongoDB
- No data loss on refresh
- Admin session persists in localStorage

---

## 🐛 Troubleshooting

### Backend Won't Start
**Error**: `Cannot connect to MongoDB`
**Solution**: Check `.env` file has correct `MONGO_URI`

### Frontend Shows Loading Forever
**Problem**: Backend not running
**Solution**: Start backend server first

### Login Fails
**Problem**: Wrong credentials
**Solution**: Use `admin@gmail.com` / `12345`

### Toast Not Appearing
**Problem**: Component not imported
**Solution**: Check import statement in page files

### Products Not Loading
**Problem**: API endpoint wrong
**Solution**: Verify backend running on port 5000

---

## 📊 Data Flow

### Sale Transaction Flow
1. User selects product + quantity
2. Frontend validates input
3. POST request to `/api/sales`
4. Backend validates stock availability
5. Stock reduces in database
6. Status updates automatically
7. Sale record created
8. Success response to frontend
9. Toast notification shown

### Bulk Sale Flow (Billing)
1. User adds multiple items to cart
2. User clicks "Save Bill"
3. Frontend validates cart not empty
4. POST request to `/api/sales/bulk`
5. Backend generates invoice number
6. For each item:
   - Validate stock
   - Reduce stock
   - Update status
   - Create sale record
7. Return invoice number and total
8. Frontend downloads PDF
9. Cart clears
10. Success toast shown

---

## 🎯 Best Practices

### Using the System
1. **Add categories first** before adding products
2. **Set realistic min stock levels** for alerts
3. **Use billing for multiple items** (faster than individual sales)
4. **Check low stock regularly** to reorder
5. **Review analytics daily** for insights

### Managing Inventory
1. Keep product names consistent
2. Use clear category names
3. Update stock when receiving shipments (edit feature)
4. Delete discontinued products
5. Monitor top-selling items in analytics

---

## ✨ Keyboard Shortcuts
- `Enter` in forms = Submit
- `Esc` in edit mode = Cancel (future enhancement)
- `Tab` = Navigate between fields

---

## 📱 Responsive Design
- Works on desktop browsers
- Mobile responsive (test on smaller screens)
- Touch-friendly buttons

---

**Need Help?** Check IMPROVEMENTS.md for technical details!
