# ✅ Smart Todo System

แอปจัดการงาน (Todo List) ที่สวยงาม ใช้งานง่าย รองรับทุกขนาดหน้าจอ และออกแบบโดยคำนึงถึง Accessibility
สร้างด้วย **React + TypeScript + Material-UI**

## ✨ Features

- **เพิ่มงานรวดเร็ว** — พิมพ์แล้วกด Enter เลือกความสำคัญด้วยปุ่ม 3 สี (🟢 ปกติ / 🟠 ปานกลาง / 🔴 ด่วน)
  และปุ่มลัดวันครบกำหนด "วันนี้ / พรุ่งนี้ / สัปดาห์หน้า"
- **การ์ดงาน** — แถบสีด้านซ้ายตามความสำคัญ, Checkbox วงกลม, วันครบกำหนดแบบสัมพัทธ์
  ("เหลือ 2 วัน", "วันนี้", "เลยกำหนด 1 วัน")
- **แก้ไขแบบ inline** — สลับ View / Edit mode (Enter = บันทึก, Esc = ยกเลิก) และบันทึกไม่ได้ถ้าชื่องานว่าง
- **ลบอย่างปลอดภัย** — มีกล่องยืนยันก่อนลบ และกด "เลิกทำ" ได้หลังลบ
- **กรองและเรียงลำดับ** — ทั้งหมด / ยังไม่เสร็จ / เสร็จแล้ว, เรียงตามวันครบกำหนดหรือความสำคัญ
- **Progress Ring** — แสดง % งานที่เสร็จบนหัวเว็บ
- **Navigation Tabs** — สลับระหว่าง "งานของฉัน" และ "Checklist ตรวจสอบ"
- **Dark mode** — สลับโหมดสว่าง/มืดได้ และจำค่าไว้
- **บันทึกอัตโนมัติ** — เก็บข้อมูลใน localStorage ของเบราว์เซอร์
- **Feedback** — Snackbar แจ้งผลเมื่อเพิ่ม แก้ไข ลบ หรือทำงานเสร็จ

## 🧰 Tech Stack

| ส่วน | เทคโนโลยี |
|---|---|
| UI | React 19, TypeScript |
| Component | Material-UI (MUI) v9, MUI Icons |
| Build | Vite |
| วันที่ | dayjs (locale ไทย) |
| ตรวจสอบ props | prop-types + TypeScript interface |
| Test | Vitest, Testing Library, jsdom |
| Lint | Oxlint |
| Font | Google Font "Prompt" |

## 🚀 เริ่มต้นใช้งาน

ต้องมี Node.js 20 ขึ้นไป

```bash
npm install      # ติดตั้ง dependencies
npm run dev      # รัน dev server แล้วเปิด http://localhost:5173
```

| คำสั่ง | ความหมาย |
|---|---|
| `npm run dev` | รันโหมดพัฒนา |
| `npm run build` | ตรวจ type และ build สำหรับ production (ผลลัพธ์อยู่ใน `dist/`) |
| `npm run preview` | เปิดดูผลลัพธ์ที่ build แล้ว |
| `npm test` | รัน unit test |
| `npm run lint` | ตรวจโค้ดด้วย Oxlint |

## 📁 โครงสร้างโปรเจกต์

```
src/
├── main.tsx                     # จุดเริ่มต้น + ตั้ง locale ไทยให้ dayjs
├── App.tsx                      # Central State และ callbacks ทั้งหมด
├── theme.ts                     # Design tokens (light / dark)
├── types/todo.ts                # Priority, Filter, SortBy, Todo
├── hooks/useTodos.ts            # จัดการรายการงาน + localStorage
├── utils/
│   ├── priority.ts              # สี / label / ลำดับของความสำคัญ
│   └── date.ts                  # วันที่สัมพัทธ์, ปุ่มลัด, คำทักทาย
└── components/
    ├── HeroHeader.tsx           # หัวเว็บ gradient + Progress Ring + ปุ่ม Dark mode
    ├── NavTabs.tsx              # Tabs ทรงแคปซูล
    ├── TabPanel.tsx             # พื้นที่เนื้อหาของแต่ละ Tab
    ├── QuickAddBar.tsx          # ฟอร์มเพิ่มงาน
    ├── PrioritySelector.tsx     # ปุ่มเลือกความสำคัญ 3 สี
    ├── FilterBar.tsx            # กรองและเรียงลำดับ
    ├── TodoList.tsx             # รายการงาน + Empty state
    ├── TodoItem.tsx             # การ์ดงาน View/Edit mode + PropTypes
    ├── ConfirmDeleteDialog.tsx  # กล่องยืนยันก่อนลบ
    ├── ChecklistPanel.tsx       # Checklist 5 จุดตรวจสอบ
    └── FeedbackSnackbar.tsx     # แจ้งผลการทำงาน + ปุ่มเลิกทำ
tests/                           # Unit test (Vitest + Testing Library)
```

## 🏗️ Architecture

```
App.tsx (Central State: todos, filter, sort, mode, tab)
 ├── HeroHeader
 ├── NavTabs
 ├── QuickAddBar ──── onAdd ──────────────┐
 ├── FilterBar ────── onFilter / onSort ──┤  callbacks ส่งกลับขึ้นไป
 ├── TodoList                             │  อัปเดต state ที่ App
 │    └── TodoItem ── onToggle / onEdit / onDelete
 └── ConfirmDeleteDialog ── onConfirm
```

- state ของรายการงานอยู่ที่ `App.tsx` ที่เดียว (Single source of truth)
- callbacks ห่อด้วย `useCallback`, รายการที่กรอง/เรียงใช้ `useMemo` และ `TodoItem` ห่อด้วย `React.memo`
- อัปเดต state แบบ immutable และใช้ `key={todo.id}`

## ✔️ Checklist คุณภาพ

1. **Prop Validation** — `TodoItem` ตรวจ props ด้วย PropTypes และเตือนใน Console เมื่อขาด prop สำคัญ
   (React 19 ไม่ตรวจ `propTypes` ให้อัตโนมัติ จึงเรียก `PropTypes.checkPropTypes` เองในโหมดพัฒนา)
2. **Responsive Layout** — ใช้ MUI Breakpoints (xs / sm / md) และ `Stack` ป้องกันปุ่มหรือข้อความล้นจอ
3. **Edit / View Mode** — สลับด้วย state `isEditing` พร้อมปุ่มบันทึกและยกเลิก
4. **Accessibility & UX** — Tooltip และ `aria-label` ครบทุกปุ่ม ใช้คีย์บอร์ดได้ และมี visual feedback
5. **State Lifting** — ส่ง `onToggle`, `onDelete`, `onEdit` กลับไปอัปเดต state ที่ `App.tsx`
