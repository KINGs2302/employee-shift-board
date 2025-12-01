# Employee Shift Board - Frontend

A modern, responsive Next.js application for managing employee shifts with role-based access control.

## 🚀 Features

- **Authentication**: JWT-based login with role management
- **Admin Dashboard**: Create, view, and delete shifts for all employees
- **User Dashboard**: View personal shifts
- **Responsive Design**: Mobile-first approach using Tailwind CSS
- **Real-time Validation**: Client and server-side validation
- **Toast Notifications**: User-friendly feedback for all actions
- **Advanced Filtering**: Filter shifts by date and employee

## 📋 Prerequisites

- Node.js 18+ installed
- Backend API running (see backend README)
- npm or yarn package manager

## 🛠️ Installation & Setup

### Step 1: Create Next.js Project

```bash
npx create-next-app@latest shift-board-frontend
cd shift-board-frontend
```

**When prompted, select:**
- ✓ TypeScript? → **No**
- ✓ ESLint? → **Yes**
- ✓ Tailwind CSS? → **Yes**
- ✓ `src/` directory? → **Yes**
- ✓ App Router? → **Yes**
- ✓ Import alias? → **No**

### Step 2: Install Dependencies

```bash
npm install axios date-fns react-hot-toast
```

### Step 3: Create Project Structure

Create the following folder structure in your `src/` directory:

```
src/
├── app/
│   ├── layout.js
│   ├── page.js
│   ├── globals.css
│   ├── login/
│   │   └── page.js
│   └── dashboard/
│       └── page.js
├── components/
│   ├── Navbar.js
│   ├── ShiftForm.js
│   └── ShiftTable.js
├── context/
│   └── AuthContext.js
└── lib/
    └── api.js
```

### Step 4: Environment Configuration

Create `.env.local` in the root directory:

```env
NEXT_PUBLIC_API_URL=Your Backend Url
```

### Step 5: Copy All Code Files

Copy all the code from the provided artifacts into their respective files:

1. **lib/api.js** - API configuration with Axios
2. **context/AuthContext.js** - Authentication context
3. **app/layout.js** - Root layout
4. **app/page.js** - Home page (redirects)
5. **app/login/page.js** - Login page
6. **components/Navbar.js** - Navigation bar
7. **components/ShiftForm.js** - Shift creation form
8. **components/ShiftTable.js** - Shifts display table
9. **app/dashboard/page.js** - Dashboard page

### Step 6: Update Tailwind Configuration (if needed)

The default Tailwind setup should work, but ensure your `tailwind.config.js` includes:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

## 🏃 Running the Application

### 1. Start the Backend API

First, ensure your backend is running:

```bash
cd path/to/backend
npm run dev
# Should run on http://localhost:4000
```

### 2. Start the Frontend

In the frontend directory:

```bash
npm run dev
```

The application will be available at `https://employee-shift-board-qa9p.vercel.app/`

## 👤 Demo Credentials

### Admin User
- **Username**: `admin`
- **Password**: `admin123`
- **Permissions**: Create, view, and delete all shifts

### Normal User
- **Username**: `user`
- **Password**: `user123`
- **Permissions**: View only their own shifts

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Mobile devices** (320px+)
- **Tablets** (768px+)
- **Desktops** (1024px+)

Key responsive features:
- Stacked forms on mobile, grid layout on desktop
- Collapsible navigation
- Scrollable tables on small screens
- Touch-friendly buttons and inputs

## 🎨 UI Features

### Color Scheme
- Primary: Indigo (600, 700)
- Background: Gradient (blue-50 to indigo-100)
- Success: Green
- Error: Red
- Warning: Yellow

### Components
1. **Login Page**: Clean, centered design with demo credentials
2. **Navbar**: User info display with logout
3. **Shift Form**: Validated form with employee dropdown
4. **Shift Table**: Sortable, filterable table with actions

## 🔒 Security Features

- JWT token-based authentication
- Automatic token expiration handling
- Protected routes with auth middleware
- Role-based access control
- XSS protection through React
- CSRF protection ready

## 📦 Project Structure Explanation

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.js          # Root layout with providers
│   ├── page.js            # Home (redirect logic)
│   ├── login/             # Login page route
│   └── dashboard/         # Protected dashboard route
├── components/            # Reusable React components
│   ├── Navbar.js         # Top navigation
│   ├── ShiftForm.js      # Admin shift creation
│   └── ShiftTable.js     # Shifts display & filtering
├── context/              # React Context providers
│   └── AuthContext.js    # Authentication state management
└── lib/                  # Utility functions
    └── api.js           # Axios configuration
```

## 🧪 Testing the Application

### Admin Flow
1. Login with admin credentials
2. Create a new shift (select employee, date, times)
3. View all shifts in the table
4. Filter by employee or date
5. Delete a shift

### User Flow
1. Login with user credentials
2. View only your assigned shifts
3. Filter by date
4. Cannot create or delete shifts

## 🐛 Troubleshooting

### Common Issues

**Issue**: "Cannot connect to backend"
- **Solution**: Ensure backend is running on port 4000
- Check NEXT_PUBLIC_API_URL in .env.local

**Issue**: "Token expired" errors
- **Solution**: Token expires after 8 hours, login again

**Issue**: "Overlapping shift" error
- **Solution**: Check existing shifts for that employee on that date

**Issue**: "Shift must be at least 4 hours"
- **Solution**: Ensure end time is at least 4 hours after start time

## 🚀 Deployment

### Frontend Deployment (Vercel)

1. Push code to GitHub
2. Import to Vercel
3. Set environment variable: `NEXT_PUBLIC_API_URL=your-backend-url`
4. Deploy

### Backend Deployment (Render/Railway)

1. Deploy backend first
2. Note the deployed URL
3. Update frontend env variable

## 📝 API Endpoints Used

- `POST /login` - User authentication
- `GET /employees` - Fetch all employees
- `POST /shifts` - Create new shift (admin)
- `GET /shifts` - Get shifts (filtered)
- `DELETE /shifts/:id` - Delete shift (admin)

## 🎯 Business Rules Implemented

1. **No Overlapping Shifts**: Prevents creating shifts that overlap for the same employee
2. **Minimum 4 Hours**: Validates shifts are at least 4 hours long
3. **Role-Based Access**: Normal users see only their shifts, admins see all
4. **Date Validation**: Ensures valid date formats (YYYY-MM-DD)
5. **Time Validation**: Ensures valid time formats (HH:MM)

## 📄 License

ISC

## 👨‍💻 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **State Management**: React Context API
- **Date Handling**: date-fns
- **Notifications**: react-hot-toast
- **Authentication**: JWT

## 🤝 Contributing

This is an assignment project. For issues or improvements, please contact the developer.

---

**Assignment Name**: Employee Shift Board  
**Role**: Fullstack Developer  
**Completed by**: [Your Name]