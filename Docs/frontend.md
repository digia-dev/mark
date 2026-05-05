# frontend.md — Mark frontend development guide

> panduan lengkap pengembangan frontend Mark. dokumen ini menjadi sumber
> kebenaran tunggal untuk semua keputusan teknis di sisi client. wajib dibaca
> sebelum menulis satu baris kode frontend.

---

## 0. stack teknologi

| package | versi | fungsi |
|---|---|---|
| react | 18.x | ui framework |
| vite | 5.x | build tool & dev server |
| react-router-dom | v6 | client-side routing |
| zustand | 4.x | global state (auth, user, ui) |
| @tanstack/react-query | v5 | server state, caching, data fetching |
| axios | 1.x | http client |
| tailwind-css | 3.x | utility-first styling |
| shadcn-ui | latest | headless component library |
| recharts | 2.x | chart & data visualization |
| react-hook-form | 7.x | form management |
| zod | 3.x | schema validasi form |
| jspdf + html2canvas | latest | generate pdf di client |
| framer-motion | 10.x | animasi & transisi |
| leaflet + react-leaflet | 1.x | peta sebaran customer |
| @dnd-kit/core | latest | drag & drop kanban pipeline |
| date-fns | 3.x | manipulasi & format tanggal |
| lucide-react | latest | ikon (satu-satunya library ikon) |

> ⚠️ **dilarang** menambah library baru tanpa diskusi tim. substitusi library
> yang sudah ada (misal: ganti lucide dengan heroicons) juga dilarang.

---

## 1. struktur folder

```
Mark-frontend/
├── public/
│   └── logo.svg
├── src/
│   ├── app/                          # root: router, provider, layout global
│   │   ├── App.jsx
│   │   ├── router.jsx
│   │   └── providers.jsx
│   │
│   ├── shared/                       # atom & molekul reusable lintas feature
│   │   ├── components/
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Table.jsx             # tabel generik dengan sort, filter, pagination
│   │   │   ├── Badge.jsx
│   │   │   ├── Skeleton.jsx
│   │   │   ├── StatCard.jsx          # kartu metrik dashboard
│   │   │   ├── SidePanel.jsx         # panel detail kanan (quotation, invoice, dll)
│   │   │   ├── FilterPopup.jsx
│   │   │   ├── ExportPopup.jsx
│   │   │   ├── ImportPopup.jsx
│   │   │   ├── ConfirmDialog.jsx
│   │   │   ├── ColumnSettings.jsx
│   │   │   ├── Pagination.jsx
│   │   │   └── EmptyState.jsx
│   │   ├── layouts/
│   │   │   ├── MainLayout.jsx        # wrapper: sidebar + topbar + content
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Topbar.jsx
│   │   │   └── AuthLayout.jsx        # wrapper untuk halaman login
│   │   ├── hooks/
│   │   │   ├── use-auth.js           # baca auth store
│   │   │   ├── use-debounce.js
│   │   │   ├── use-pagination.js
│   │   │   ├── use-filter.js
│   │   │   └── use-local-storage.js
│   │   └── utils/
│   │       ├── format-currency.js    # Rp 850.000.000
│   │       ├── format-date.js        # 20 Mei 2025, 14:30
│   │       ├── format-number.js
│   │       ├── generate-doc-number.js
│   │       └── cn.js                 # tailwind class merging helper
│   │
│   ├── features/                     # satu folder per modul bisnis
│   │   ├── auth/
│   │   │   ├── components/
│   │   │   │   └── LoginForm.jsx
│   │   │   ├── hooks/
│   │   │   │   └── use-login.js
│   │   │   ├── services/
│   │   │   │   └── auth-service.js
│   │   │   └── store/
│   │   │       └── auth-store.js     # zustand: user, token, isAuthenticated
│   │   │
│   │   ├── dashboard/
│   │   │   ├── components/
│   │   │   │   ├── RevenueChart.jsx
│   │   │   │   ├── PipelineFunnel.jsx
│   │   │   │   ├── CustomerMap.jsx
│   │   │   │   ├── DealsBySales.jsx
│   │   │   │   ├── ActivityFeed.jsx
│   │   │   │   ├── PipelineOverview.jsx
│   │   │   │   ├── RecentLeads.jsx
│   │   │   │   └── UpcomingTasks.jsx
│   │   │   ├── hooks/
│   │   │   │   └── use-dashboard.js
│   │   │   └── services/
│   │   │       └── dashboard-service.js
│   │   │
│   │   ├── crm/
│   │   │   ├── components/
│   │   │   │   ├── CustomerTable.jsx
│   │   │   │   ├── CustomerForm.jsx
│   │   │   │   ├── CustomerDetail.jsx
│   │   │   │   ├── LeadForm.jsx
│   │   │   │   ├── LeadDetail.jsx
│   │   │   │   ├── InteractionLog.jsx
│   │   │   │   ├── AddInteractionForm.jsx
│   │   │   │   └── QuickView.jsx
│   │   │   ├── hooks/
│   │   │   │   ├── use-customers.js
│   │   │   │   └── use-leads.js
│   │   │   └── services/
│   │   │       ├── customer-service.js
│   │   │       └── lead-service.js
│   │   │
│   │   ├── pipeline/
│   │   │   ├── components/
│   │   │   │   ├── KanbanBoard.jsx
│   │   │   │   ├── KanbanColumn.jsx
│   │   │   │   ├── DealCard.jsx
│   │   │   │   ├── DealForm.jsx
│   │   │   │   ├── DealDetail.jsx
│   │   │   │   ├── MoveStagePopup.jsx
│   │   │   │   ├── UpdateProbabilityPopup.jsx
│   │   │   │   └── PipelineSummary.jsx
│   │   │   ├── hooks/
│   │   │   │   └── use-pipeline.js
│   │   │   └── services/
│   │   │       └── deal-service.js
│   │   │
│   │   ├── quotation/
│   │   │   ├── components/
│   │   │   │   ├── QuotationTable.jsx
│   │   │   │   ├── QuotationForm.jsx
│   │   │   │   ├── QuotationItemRow.jsx
│   │   │   │   ├── QuotationDetail.jsx
│   │   │   │   ├── QuotationPreview.jsx
│   │   │   │   ├── QuotationStatusBadge.jsx
│   │   │   │   ├── SendEmailPopup.jsx
│   │   │   │   ├── DownloadPdfPopup.jsx
│   │   │   │   └── CreateInvoicePopup.jsx
│   │   │   ├── hooks/
│   │   │   │   └── use-quotation.js
│   │   │   └── services/
│   │   │       └── quotation-service.js
│   │   │
│   │   ├── presentation/
│   │   │   ├── components/
│   │   │   │   ├── PresentationTable.jsx
│   │   │   │   ├── PresentationForm.jsx
│   │   │   │   ├── SlideBuilder.jsx
│   │   │   │   ├── SlidePreview.jsx
│   │   │   │   ├── TemplateSelector.jsx
│   │   │   │   └── PresentationDetail.jsx
│   │   │   ├── hooks/
│   │   │   │   └── use-presentation.js
│   │   │   └── services/
│   │   │       └── presentation-service.js
│   │   │
│   │   ├── timeline/
│   │   │   ├── components/
│   │   │   │   ├── GanttChart.jsx
│   │   │   │   ├── GanttRow.jsx
│   │   │   │   ├── GanttBar.jsx
│   │   │   │   ├── InstallationDetail.jsx
│   │   │   │   ├── InstallationForm.jsx
│   │   │   │   └── StageTracker.jsx
│   │   │   ├── hooks/
│   │   │   │   └── use-timeline.js
│   │   │   └── services/
│   │   │       └── installation-service.js
│   │   │
│   │   ├── trouble-ticket/
│   │   │   ├── components/
│   │   │   │   ├── TicketTable.jsx
│   │   │   │   ├── TicketForm.jsx
│   │   │   │   ├── TicketDetail.jsx
│   │   │   │   ├── SlaTimer.jsx
│   │   │   │   └── TicketProgress.jsx
│   │   │   ├── hooks/
│   │   │   │   └── use-trouble-ticket.js
│   │   │   └── services/
│   │   │       └── trouble-ticket-service.js
│   │   │
│   │   ├── invoice/
│   │   │   ├── components/
│   │   │   │   ├── InvoiceTable.jsx
│   │   │   │   ├── InvoiceForm.jsx
│   │   │   │   ├── InvoiceDetail.jsx
│   │   │   │   └── PaymentHistory.jsx
│   │   │   ├── hooks/
│   │   │   │   └── use-invoice.js
│   │   │   └── services/
│   │   │       └── invoice-service.js
│   │   │
│   │   ├── product/
│   │   │   ├── components/
│   │   │   │   ├── ProductGrid.jsx
│   │   │   │   ├── ProductCard.jsx
│   │   │   │   ├── ProductTable.jsx
│   │   │   │   └── ProductForm.jsx
│   │   │   ├── hooks/
│   │   │   │   └── use-product.js
│   │   │   └── services/
│   │   │       └── product-service.js
│   │   │
│   │   ├── report/
│   │   │   ├── components/
│   │   │   │   ├── SalesChart.jsx
│   │   │   │   ├── FunnelChart.jsx
│   │   │   │   ├── PipelineChart.jsx
│   │   │   │   ├── ProductPerformanceCard.jsx
│   │   │   │   ├── SalesTargetGauge.jsx
│   │   │   │   ├── SalesByArea.jsx
│   │   │   │   └── ReportFilter.jsx
│   │   │   ├── hooks/
│   │   │   │   └── use-report.js
│   │   │   └── services/
│   │   │       └── report-service.js
│   │   │
│   │   ├── notification/
│   │   │   ├── components/
│   │   │   │   ├── NotificationBell.jsx
│   │   │   │   ├── NotificationList.jsx
│   │   │   │   ├── NotificationItem.jsx
│   │   │   │   └── NotificationSettings.jsx
│   │   │   ├── hooks/
│   │   │   │   └── use-notification.js
│   │   │   └── services/
│   │   │       └── notification-service.js
│   │   │
│   │   └── activity-log/
│   │       ├── components/
│   │       │   ├── ActivityLogTable.jsx
│   │       │   ├── ActivityByModule.jsx
│   │       │   └── ActivityByAction.jsx
│   │       ├── hooks/
│   │       │   └── use-activity-log.js
│   │       └── services/
│   │           └── activity-log-service.js
│   │
│   ├── pages/                        # rakit komponen — zero business logic
│   │   ├── login-page.jsx
│   │   ├── dashboard-page.jsx
│   │   ├── crm/
│   │   │   ├── crm-page.jsx
│   │   │   ├── customer-detail-page.jsx
│   │   │   └── lead-detail-page.jsx
│   │   ├── pipeline-page.jsx
│   │   ├── quotation/
│   │   │   ├── quotation-page.jsx
│   │   │   └── quotation-detail-page.jsx
│   │   ├── presentation-page.jsx
│   │   ├── timeline-page.jsx
│   │   ├── trouble-ticket-page.jsx
│   │   ├── invoice-page.jsx
│   │   ├── product-page.jsx
│   │   ├── reports/
│   │   │   ├── reports-overview-page.jsx
│   │   │   ├── sales-performance-page.jsx
│   │   │   ├── product-performance-page.jsx
│   │   │   ├── pipeline-report-page.jsx
│   │   │   └── conversion-report-page.jsx
│   │   ├── notification-page.jsx
│   │   ├── activity-log-page.jsx
│   │   ├── profile-page.jsx
│   │   └── settings-page.jsx
│   │
│   └── constants/
│       ├── api-endpoints.js          # semua url api terpusat di sini
│       ├── route-paths.js            # semua path react router terpusat
│       ├── deal-stages.js
│       ├── ticket-priorities.js
│       ├── status-colors.js          # mapping status → warna badge
│       └── query-keys.js             # react-query key factory
│
├── .env.example
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## 2. aturan pembagian tanggung jawab

ini adalah aturan paling kritis. pelanggaran di sini merusak seluruh arsitektur.

```
┌──────────────────────────────────────────────────────┐
│  lapisan      lokasi              boleh isi apa?     │
├──────────────────────────────────────────────────────┤
│  page         pages/              rakit komponen     │
│                                   saja. tidak ada    │
│                                   useState untuk     │
│                                   data, tidak ada    │
│                                   fetch langsung     │
│                                                      │
│  komponen     features/*/         ui + local state   │
│               components/         (toggle, modal).   │
│                                   pakai hook untuk   │
│                                   semua data         │
│                                                      │
│  hook         features/*/hooks/   react-query +      │
│                                   panggil service.   │
│                                   ini tempatnya      │
│                                   loading & error    │
│                                                      │
│  service      features/*/         axios call saja.   │
│               services/           tidak ada logika   │
│                                   transformasi data  │
│                                                      │
│  store        features/auth/      zustand: user,     │
│               store/              token, role,       │
│                                   preferensi global  │
└──────────────────────────────────────────────────────┘
```

### contoh benar vs salah

**❌ salah — axios di komponen:**
```jsx
// QuotationTable.jsx ← JANGAN BEGINI
export default function QuotationTable() {
  const [data, setData] = useState([])
  useEffect(() => {
    axios.get('/api/quotations').then(r => setData(r.data))
  }, [])
}
```

**✅ benar — axios di service, logic di hook, ui di komponen:**
```js
// features/quotation/services/quotation-service.js
import api from '@/shared/utils/api-client'
export const quotationService = {
  getList: (params) => api.get('/api/quotations', { params }),
  getById: (id) => api.get(`/api/quotations/${id}`),
  create: (data) => api.post('/api/quotations', data),
}
```
```js
// features/quotation/hooks/use-quotation.js
import { useQuery, useMutation } from '@tanstack/react-query'
import { quotationService } from '../services/quotation-service'
import { QUERY_KEYS } from '@/constants/query-keys'

export function useQuotationList(params) {
  return useQuery({
    queryKey: [QUERY_KEYS.quotations, params],
    queryFn: () => quotationService.getList(params),
  })
}
```
```jsx
// features/quotation/components/QuotationTable.jsx
import { useQuotationList } from '../hooks/use-quotation'

export default function QuotationTable({ filters }) {
  const { data, isLoading, isError } = useQuotationList(filters)
  if (isLoading) return <Skeleton />
  if (isError) return <ErrorState />
  return <Table data={data.data} />
}
```

---

## 3. penamaan wajib

| konteks | konvensi | contoh |
|---|---|---|
| file komponen react | PascalCase + .jsx | `QuotationForm.jsx` |
| file non-komponen | kebab-case + .js | `use-quotation.js`, `quotation-service.js` |
| folder | kebab-case | `trouble-ticket/`, `activity-log/` |
| variabel & fungsi js | camelCase | `const quotationId`, `function handleSubmit` |
| props komponen | camelCase | `onSubmit`, `isLoading`, `customerId` |
| react-query key | snake_case string | `'quotation_list'`, `'customer_detail'` |
| css class | tailwind utility | tidak ada custom class kecuali di `index.css` |

---

## 4. pola data fetching (react-query)

### query key factory — wajib pakai

```js
// src/constants/query-keys.js
export const QUERY_KEYS = {
  // list
  customers:     'customer_list',
  leads:         'lead_list',
  deals:         'deal_list',
  quotations:    'quotation_list',
  presentations: 'presentation_list',
  installations: 'installation_list',
  tickets:       'ticket_list',
  invoices:      'invoice_list',
  products:      'product_list',
  notifications: 'notification_list',

  // detail — gunakan array: [key, id]
  customer:     'customer_detail',
  quotation:    'quotation_detail',
  deal:         'deal_detail',
}

// cara pakai:
// queryKey: [QUERY_KEYS.quotation, id]
// queryKey: [QUERY_KEYS.quotations, { status, page }]
```

### pola hook standar

```js
// use-quotation.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { quotationService } from '../services/quotation-service'
import { QUERY_KEYS } from '@/constants/query-keys'

// LIST
export function useQuotationList(params) {
  return useQuery({
    queryKey: [QUERY_KEYS.quotations, params],
    queryFn: () => quotationService.getList(params),
    staleTime: 1000 * 60 * 2,   // 2 menit
  })
}

// DETAIL
export function useQuotationDetail(id) {
  return useQuery({
    queryKey: [QUERY_KEYS.quotation, id],
    queryFn: () => quotationService.getById(id),
    enabled: !!id,               // jangan fetch jika id undefined
  })
}

// MUTATION
export function useCreateQuotation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: quotationService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.quotations] })
      // toast sukses
    },
    onError: (error) => {
      // toast error dari error.response.data.error.message
    },
  })
}
```

---

## 5. pola form (react-hook-form + zod)

```jsx
// QuotationForm.jsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useCreateQuotation } from '../hooks/use-quotation'

const schema = z.object({
  customerId: z.number({ required_error: 'customer wajib dipilih' }),
  validUntil: z.string().min(1, 'tanggal berlaku wajib diisi'),
  notes: z.string().optional(),
})

export default function QuotationForm({ onSuccess }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  })
  const { mutate, isPending } = useCreateQuotation()

  const onSubmit = (data) => mutate(data, { onSuccess })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* field dengan pesan error inline */}
      <Input {...register('notes')} error={errors.notes?.message} />
      <Button type="submit" disabled={isPending}>
        {isPending ? 'menyimpan...' : 'simpan'}
      </Button>
    </form>
  )
}
```

---

## 6. pola komponen yang wajib

### setiap tabel wajib punya

- search / filter bar di atas
- tab status (semua, draft, sent, dll) dengan jumlah badge
- toggle tampilan grid/list jika relevan
- tombol export
- column settings (gear icon)
- loading skeleton saat `isLoading`
- empty state saat data kosong
- pagination di bawah

### setiap form popup wajib punya

- header: judul + tombol × close
- field dengan label, placeholder, dan pesan error inline
- tombol batal (secondary) + tombol simpan (primary)
- disabled state pada tombol simpan saat `isPending`
- semua field wajib diberi tanda `*` merah

### setiap halaman wajib punya

- stat cards ringkasan di atas (min 3–5 kartu)
- loading skeleton saat fetch pertama
- error state jika fetch gagal
- breadcrumb di topbar

---

## 7. global state (zustand)

hanya ada **satu** store global: `auth-store`. semua server state lewat react-query.

```js
// features/auth/store/auth-store.js
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,

      setAuth: (user, token) => set({
        user, accessToken: token, isAuthenticated: true
      }),
      clearAuth: () => set({
        user: null, accessToken: null, isAuthenticated: false
      }),
    }),
    { name: 'Mark-auth' }   // disimpan ke localStorage
  )
)
```

**jangan** membuat zustand store untuk data server (daftar customer, quotation, dll).
semua data yang berasal dari api → react-query.

---

## 8. axios client terpusat

```js
// src/shared/utils/api-client.js
import axios from 'axios'
import { useAuthStore } from '@/features/auth/store/auth-store'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' },
})

// inject token ke setiap request
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// handle 401 → refresh token atau redirect login
api.interceptors.response.use(
  (res) => res.data,              // langsung return data, bukan wrapper response
  async (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().clearAuth()
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api
```

semua service **wajib** import dari file ini, bukan dari axios langsung.

---

## 9. sistem warna & desain

### wajib gunakan css variable dari tailwind config

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary:   { DEFAULT: '#1E3A8A', hover: '#1e40af' },  // biru utama
        accent:    { DEFAULT: '#F97316' },                     // oranye
        success:   { DEFAULT: '#16A34A' },
        warning:   { DEFAULT: '#D97706' },
        danger:    { DEFAULT: '#DC2626' },
        info:      { DEFAULT: '#2563EB' },
      }
    }
  }
}
```

**dilarang** menggunakan warna arbitrary seperti `bg-[#1a2b3c]` di luar config.
gunakan class dari config di atas: `bg-primary`, `text-accent`, `border-danger`.

### badge status — wajib sesuai tabel ini

| status | class tailwind |
|---|---|
| aktif / active / approved / paid / selesai | `bg-green-100 text-green-700` |
| sent / in-progress / baru | `bg-blue-100 text-blue-700` |
| draft / pending / menunggu | `bg-gray-100 text-gray-700` |
| rejected / overdue / gagal / lost | `bg-red-100 text-red-700` |
| expired / warning / tertunda | `bg-orange-100 text-orange-700` |
| negosiasi / partial | `bg-purple-100 text-purple-700` |
| best-seller | `bg-blue-600 text-white` |
| promo | `bg-orange-500 text-white` |
| new | `bg-green-600 text-white` |

semua badge menggunakan `rounded-full` dan `text-xs font-medium px-2.5 py-0.5`.

### ikon — wajib lucide-react

```jsx
// ✅ benar
import { Plus, Filter, Download, ChevronDown } from 'lucide-react'

// ❌ salah — jangan import dari library lain
import { FiPlus } from 'react-icons/fi'
import SearchIcon from '@heroicons/react/search'
```

---

## 10. routing

```jsx
// src/app/router.jsx
import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '@/shared/layouts/MainLayout'

// semua path didefinisikan dari ROUTE_PATHS, bukan hardcode string
import { ROUTE_PATHS } from '@/constants/route-paths'

export const router = createBrowserRouter([
  {
    path: ROUTE_PATHS.login,
    element: <LoginPage />,
  },
  {
    path: '/',
    element: <PrivateRoute><MainLayout /></PrivateRoute>,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: ROUTE_PATHS.crm,          element: <CrmPage /> },
      { path: ROUTE_PATHS.customerDetail(':id'), element: <CustomerDetailPage /> },
      { path: ROUTE_PATHS.pipeline,     element: <PipelinePage /> },
      { path: ROUTE_PATHS.quotation,    element: <QuotationPage /> },
      // ... dst
    ]
  }
])
```

```js
// src/constants/route-paths.js
export const ROUTE_PATHS = {
  login:           '/login',
  dashboard:       '/',
  crm:             '/crm',
  customerDetail:  (id = ':id') => `/crm/customers/${id}`,
  pipeline:        '/pipeline',
  quotation:       '/quotation',
  quotationDetail: (id = ':id') => `/quotation/${id}`,
  presentation:    '/presentation',
  timeline:        '/timeline',
  ticket:          '/trouble-ticket',
  invoice:         '/invoices',
  product:         '/products',
  reports:         '/reports',
  notification:    '/notifications',
  activityLog:     '/activity-logs',
  profile:         '/profile',
  settings:        '/settings',
}
```

---

## 11. format & utilitas wajib

### format mata uang

```js
// shared/utils/format-currency.js
export function formatCurrency(amount) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount)
  // output: Rp 850.000.000
}
```

### format tanggal

```js
// shared/utils/format-date.js
import { format, formatDistanceToNow } from 'date-fns'
import { id } from 'date-fns/locale'

export const formatDate = (date) => format(new Date(date), 'd MMM yyyy', { locale: id })
// output: 20 Mei 2025

export const formatDateTime = (date) => format(new Date(date), 'd MMM yyyy, HH:mm', { locale: id })
// output: 20 Mei 2025, 14:30

export const formatRelative = (date) => formatDistanceToNow(new Date(date), { addSuffix: true, locale: id })
// output: 5 menit yang lalu
```

---

## 12. environment variables

```env
# .env.example
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=Mark
VITE_APP_ENV=development
```

semua env variable frontend wajib prefix `VITE_`. akses via `import.meta.env.VITE_*`.
**jangan** hard-code `http://localhost:3000` di service — selalu dari env.

---

## 13. checklist sebelum pr

```
komponen & halaman:
  [ ] tidak ada axios langsung di komponen atau page
  [ ] loading state ditampilkan (skeleton atau spinner)
  [ ] error state ditampilkan jika fetch gagal
  [ ] empty state ditampilkan jika data kosong
  [ ] semua form punya validasi zod + pesan error inline

penamaan:
  [ ] file komponen: PascalCase.jsx
  [ ] file lain: kebab-case.js
  [ ] folder: kebab-case
  [ ] variabel: camelCase

desain:
  [ ] tidak ada warna arbitrary (#hex) di luar tailwind config
  [ ] ikon dari lucide-react semua
  [ ] badge sesuai tabel status-colors
  [ ] angka uang menggunakan formatCurrency()
  [ ] tanggal menggunakan formatDate() atau formatDateTime()

state:
  [ ] data server diambil via react-query (bukan useState + useEffect)
  [ ] zustand hanya untuk auth state
  [ ] query key menggunakan QUERY_KEYS constant
```

---

## 14. rekomendasi tambahan

berikut rekomendasi yang belum ada di `rules.md` namun sangat disarankan:

### 14.1 error boundary
tambahkan react error boundary di level `MainLayout` untuk mencegah crash
total jika satu komponen error:
```jsx
// shared/layouts/MainLayout.jsx
import { ErrorBoundary } from 'react-error-boundary'
// wrap <Outlet /> dengan ErrorBoundary
```

### 14.2 optimistic update untuk aksi cepat
untuk toggle status, drag & drop pipeline, dan mark-as-read notifikasi —
gunakan `onMutate` di react-query untuk optimistic update agar ui terasa
instan tanpa menunggu response server.

### 14.3 virtual list untuk tabel besar
untuk tabel dengan data > 500 baris (activity logs, crm list), gunakan
`@tanstack/react-virtual` agar tidak render semua baris sekaligus.

### 14.4 code splitting per route
konfigurasi `React.lazy()` per page di router untuk memastikan bundle tidak
terlalu besar. vite sudah mendukung ini secara otomatis dengan dynamic import:
```jsx
const PipelinePage = lazy(() => import('@/pages/pipeline-page'))
```

### 14.5 i18n persiapan
meskipun saat ini hanya bahasa indonesia, struktur teks yang ada di komponen
sebaiknya sudah dipisah ke file konstanta agar mudah diterjemahkan di masa depan
jika dibutuhkan.

---

*frontend.md — mark isp sales & management system*
*versi: 1.0*