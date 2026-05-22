# FlowDesk AI Dashboard Roadmap

## Eng.ver

### 1. Roadmap Principle

The Dashboard track should move from planning to demo in small, controlled steps.

Each phase should protect the MVP boundary:

- Dashboard web app only
- Small agency workflow only
- BrightAds Agency demo workspace first
- No Digital Product track work
- No billing, client portal, advanced reporting, or full automation engine in MVP

### 2. Day 1: Product Planning

Status:

- Complete once these planning documents are created.

Deliverables:

- Product spec
- MVP scope
- Roadmap

Day 1 decisions captured:

- Product direction
- Target MVP user
- Core problem
- Main MVP pages
- MVP feature list
- Out-of-scope list
- Demo workspace and members
- Example demo tasks

### 3. Day 2: Product Structure And UX Planning

Recommended Day 2 work:

- Define final workflow statuses
- Define final priority values
- Draft page-by-page content requirements
- Draft user flows for viewing dashboard, browsing tasks, opening task detail, using board, and reading AI summaries
- Convert demo tasks into a structured planning table
- Define simple acceptance criteria per page
- Decide whether the first demo is read-only or allows basic task edits
- Decide whether AI summaries are mocked first or generated from an AI API later

Day 2 should still avoid:

- Application code
- UI component implementation
- Prisma schema
- Database migrations
- Digital Product track work

### 4. Phase 1: MVP Design Definition

Goal:

- Turn planning into a build-ready dashboard definition.

Deliverables:

- Information architecture
- Page requirements
- User flows
- Demo data table
- AI summary rules
- MVP acceptance checklist

Key decisions:

- Final status workflow
- Final priority system
- Required task fields
- Read-only demo versus editable demo
- Mock AI output versus generated AI output

### 5. Phase 2: Data And Content Preparation

Goal:

- Prepare realistic demo data before implementation.

Deliverables:

- BrightAds Agency workspace data
- Demo member data
- Demo task data
- Example AI Daily Summary
- Example AI Weekly Summary
- Example Overdue Summary
- Example Priority Suggestions

Recommended demo task fields:

- ID
- Title
- Description
- Status
- Priority
- Due date
- Assignee
- Client or project
- Tags
- Created date
- Last updated date

### 6. Phase 3: Dashboard MVP Build

Goal:

- Implement the first usable Dashboard MVP after planning is approved.

Build order:

- Project setup
- Demo data setup
- Dashboard layout
- `/dashboard`
- `/tasks`
- `/tasks/[id]`
- `/board`
- `/ai-summary`
- `/team`
- `/settings`

Implementation note:

- The basic board should not include drag-and-drop in MVP.

### 7. Phase 4: AI Summary Layer

Goal:

- Make summaries useful for agency operations.

Possible first version:

- Static or mocked AI summaries based on demo data

Possible later version:

- AI-generated summaries based on task data

Summary sections:

- Daily Summary
- Weekly Summary
- Overdue Summary
- Priority Suggestions

### 8. Phase 5: MVP QA And Demo Readiness

Goal:

- Prepare the Dashboard MVP for a clear product demo.

Checklist:

- Dashboard shows clear operational overview
- Task list is easy to scan
- Task detail is understandable
- Board groups tasks by status
- AI summary page feels useful
- Team page shows workload clearly
- Settings page does not imply unsupported billing or permissions
- Out-of-scope features are not present

### 9. Post-MVP Ideas

These are not MVP commitments.

Potential later features:

- Authentication
- Real database persistence
- Basic workspace roles
- Task comments
- File attachments
- Client/project grouping
- Calendar view
- Simple notifications
- AI task cleanup suggestions
- AI weekly report export

The following should remain out of MVP unless explicitly re-scoped:

- Payment
- Subscription
- Complex role permissions
- Real-time chat
- Full document editor
- Full automation engine
- Mobile app
- Drag-and-drop board
- Client portal
- Advanced reporting
- Multi-workspace billing
- Digital product assets

### 10. Key Risks

- Scope creep from SaaS features such as billing, roles, or client portals
- Confusion between Dashboard track and Digital Product track
- AI summary expectations becoming too advanced too early
- Basic Kanban being mistaken for a full drag-and-drop project board
- Demo data feeling too shallow for agency users
- Unclear decision on read-only versus editable first demo

---

## Thai.ver

### 1. หลักการของ Roadmap

Dashboard track ควรเดินจาก planning ไปสู่ demo ด้วยขั้นตอนเล็กและควบคุม scope ให้ชัดเจน

ทุก phase ควรรักษาขอบเขต MVP:

- เฉพาะ Dashboard web app
- เฉพาะ workflow ของเอเจนซี่ขนาดเล็ก
- เริ่มจาก BrightAds Agency demo workspace ก่อน
- ไม่ทำ Digital Product track
- ไม่รวม billing, client portal, advanced reporting หรือ full automation engine ใน MVP

### 2. Day 1: Product Planning

สถานะ:

- ถือว่าเสร็จเมื่อสร้าง planning documents เหล่านี้เรียบร้อย

Deliverables:

- Product spec
- MVP scope
- Roadmap

สิ่งที่เก็บไว้ใน Day 1:

- ทิศทางสินค้า
- ผู้ใช้เป้าหมายของ MVP
- ปัญหาหลัก
- หน้าหลักของ MVP
- รายการ features ของ MVP
- รายการ out-of-scope
- Demo workspace และสมาชิก
- ตัวอย่าง demo tasks

### 3. Day 2: Product Structure And UX Planning

งานที่แนะนำสำหรับ Day 2:

- กำหนด workflow statuses ขั้นสุดท้าย
- กำหนด priority values ขั้นสุดท้าย
- เขียน requirement ของแต่ละหน้า
- เขียน user flows สำหรับการดู dashboard, browse tasks, เปิด task detail, ใช้ board และอ่าน AI summaries
- แปลง demo tasks เป็น structured planning table
- กำหนด acceptance criteria แบบง่ายสำหรับแต่ละหน้า
- ตัดสินใจว่า demo แรกเป็น read-only หรือแก้ไข task เบื้องต้นได้
- ตัดสินใจว่า AI summaries จะ mock ก่อน หรือเชื่อม AI API ภายหลัง

Day 2 ยังควรหลีกเลี่ยง:

- Application code
- UI component implementation
- Prisma schema
- Database migrations
- Digital Product track work

### 4. Phase 1: MVP Design Definition

เป้าหมาย:

- เปลี่ยน planning ให้เป็น dashboard definition ที่พร้อมนำไป build

Deliverables:

- Information architecture
- Page requirements
- User flows
- Demo data table
- AI summary rules
- MVP acceptance checklist

การตัดสินใจสำคัญ:

- Final status workflow
- Final priority system
- Required task fields
- Read-only demo หรือ editable demo
- Mock AI output หรือ generated AI output

### 5. Phase 2: Data And Content Preparation

เป้าหมาย:

- เตรียม demo data ที่สมจริงก่อนเริ่ม implementation

Deliverables:

- BrightAds Agency workspace data
- Demo member data
- Demo task data
- Example AI Daily Summary
- Example AI Weekly Summary
- Example Overdue Summary
- Example Priority Suggestions

Task fields ที่แนะนำสำหรับ demo:

- ID
- Title
- Description
- Status
- Priority
- Due date
- Assignee
- Client หรือ project
- Tags
- Created date
- Last updated date

### 6. Phase 3: Dashboard MVP Build

เป้าหมาย:

- Implement Dashboard MVP เวอร์ชันแรกหลัง planning ผ่านแล้ว

ลำดับการ build:

- Project setup
- Demo data setup
- Dashboard layout
- `/dashboard`
- `/tasks`
- `/tasks/[id]`
- `/board`
- `/ai-summary`
- `/team`
- `/settings`

หมายเหตุสำหรับ implementation:

- Basic board ไม่ควรมี drag-and-drop ใน MVP

### 7. Phase 4: AI Summary Layer

เป้าหมาย:

- ทำให้ summaries มีประโยชน์ต่อการทำงานของเอเจนซี่

เวอร์ชันแรกที่เป็นไปได้:

- Static หรือ mocked AI summaries จาก demo data

เวอร์ชันถัดไปที่เป็นไปได้:

- AI-generated summaries จาก task data

Summary sections:

- Daily Summary
- Weekly Summary
- Overdue Summary
- Priority Suggestions

### 8. Phase 5: MVP QA And Demo Readiness

เป้าหมาย:

- เตรียม Dashboard MVP ให้พร้อมสำหรับ product demo ที่ชัดเจน

Checklist:

- Dashboard แสดง operational overview ชัดเจน
- Task list scan ง่าย
- Task detail เข้าใจง่าย
- Board จัดกลุ่ม tasks ตาม status
- AI summary page รู้สึกมีประโยชน์
- Team page แสดง workload ชัดเจน
- Settings page ไม่ทำให้เข้าใจผิดว่ามี billing หรือ permissions ที่ยังไม่รองรับ
- ไม่มี feature นอก scope

### 9. Post-MVP Ideas

รายการนี้ไม่ใช่ commitment ของ MVP

Potential later features:

- Authentication
- Real database persistence
- Basic workspace roles
- Task comments
- File attachments
- Client/project grouping
- Calendar view
- Simple notifications
- AI task cleanup suggestions
- AI weekly report export

รายการต่อไปนี้ควรอยู่นอก MVP ต่อไป เว้นแต่มีการ re-scope อย่างชัดเจน:

- Payment
- Subscription
- Complex role permissions
- Real-time chat
- Full document editor
- Full automation engine
- Mobile app
- Drag-and-drop board
- Client portal
- Advanced reporting
- Multi-workspace billing
- Digital product assets

### 10. ความเสี่ยงสำคัญ

- Scope creep จาก SaaS features เช่น billing, roles หรือ client portals
- ความสับสนระหว่าง Dashboard track และ Digital Product track
- ความคาดหวังต่อ AI summary สูงเกินไปเร็วเกินไป
- Basic Kanban อาจถูกเข้าใจผิดว่าเป็น project board แบบ drag-and-drop เต็มรูปแบบ
- Demo data อาจยังไม่ลึกพอสำหรับ agency users
- ยังไม่ชัดว่า demo แรกจะเป็น read-only หรือ editable
