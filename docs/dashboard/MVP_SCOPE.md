# FlowDesk AI Dashboard MVP Scope

## Eng.ver

### 1. MVP Boundary

This MVP covers only the FlowDesk AI Dashboard web app.

The MVP is designed as a SaaS-style internal dashboard for BrightAds Agency, a demo small agency workspace. It should prove that a team lead can see tasks, workflow status, overdue work, team workload, and AI-generated summaries in one place.

### 2. In Scope

#### Dashboard Overview

The MVP includes a main dashboard page that shows:

- Total task count
- Tasks by status
- Overdue task count
- High-priority task count
- Team workload snapshot
- AI Daily Summary preview

#### Task Management

The MVP includes basic task management concepts:

- Task title
- Task description
- Status
- Priority
- Due date
- Assignee
- Client or project label

Task editing can be simple. The MVP does not need advanced task dependencies, recurring tasks, custom fields, or automation rules.

#### Task List

The MVP includes a task list page that shows all demo tasks.

Expected fields:

- Title
- Status
- Priority
- Assignee
- Due date
- Overdue state

Optional for MVP:

- Simple search
- Simple filters by status, priority, or assignee

#### Task Detail

The MVP includes a task detail page for each task.

Expected information:

- Task title
- Description
- Status
- Priority
- Due date
- Assignee
- Client or project label
- Simple notes or activity placeholder

#### Status Workflow

The MVP includes a simple workflow.

Recommended statuses:

- To Do
- In Progress
- Review
- Done

Optional status:

- Blocked

#### Priority

The MVP includes priority levels.

Recommended priority values:

- Low
- Medium
- High
- Urgent

#### Due Date

The MVP includes due dates for tasks.

The system should clearly identify:

- Due today
- Due soon
- Overdue

#### Assignee

Each task should have one assignee from the demo team.

Demo members:

- Admin
- Designer
- Content Writer
- Ads Manager
- Account Manager

#### Basic Kanban Board

The MVP includes a basic board view grouped by status.

Included:

- Columns for workflow statuses
- Task cards in each column
- Clear priority and due date indicators

Not included:

- Drag-and-drop board interactions
- Advanced board customization
- Swimlanes

#### AI Daily Summary

The MVP includes a daily summary that can explain:

- Today's key tasks
- Overdue tasks
- High-priority work
- Team members with heavy workload
- Suggested focus for the day

For the first MVP, the summary may be generated from demo seed data or mocked AI output.

#### AI Weekly Summary

The MVP includes a weekly summary that can explain:

- Completed work
- Work still in progress
- Overdue or blocked work
- Upcoming deadlines
- Suggested priorities for the next week

For the first MVP, the summary may be generated from demo seed data or mocked AI output.

#### Overdue Summary

The MVP includes a summary of overdue work.

Expected content:

- Overdue task count
- Overdue tasks by assignee
- Highest-risk overdue items
- Suggested follow-up actions

#### Priority Suggestions

The MVP includes basic priority suggestions based on:

- Due date
- Priority value
- Current status
- Overdue state
- Assignee workload

#### Demo Seed Data

The MVP includes demo data for BrightAds Agency.

Demo tasks:

- Write Facebook content for Client A
- Design monthly promotion banner
- Review weekly ads report
- Fix landing page based on feedback
- Prepare proposal for new client
- Send draft campaign to client
- Update campaign performance dashboard
- Create ad copy variations
- Review client feedback
- Schedule content calendar

### 3. Main Pages In Scope

- `/dashboard`
- `/tasks`
- `/tasks/[id]`
- `/board`
- `/ai-summary`
- `/team`
- `/settings`

### 4. Out Of Scope

The following items are not part of the Dashboard MVP:

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

### 5. MVP Acceptance Criteria

The MVP should be considered ready for demo when:

- The BrightAds Agency workspace can be shown clearly
- Demo members are visible
- Demo tasks are visible
- Tasks show status, priority, due date, and assignee
- The dashboard overview communicates operational status quickly
- The task list and task detail pages are understandable
- The board view groups tasks by status
- The AI summary page shows daily, weekly, overdue, and priority sections
- Out-of-scope features are not accidentally introduced

### 6. Non-Goals For Day 1

Day 1 is planning only.

Do not create:

- Application code
- UI components
- Prisma schema
- Database migrations
- Digital Product track documents

---

## Thai.ver

### 1. ขอบเขตของ MVP

MVP นี้ครอบคลุมเฉพาะ FlowDesk AI Dashboard web app เท่านั้น

MVP ถูกออกแบบให้เป็น internal dashboard แบบ SaaS สำหรับ BrightAds Agency ซึ่งเป็น demo workspace ของเอเจนซี่ขนาดเล็ก เป้าหมายคือพิสูจน์ว่า team lead สามารถเห็น tasks, workflow status, overdue work, team workload และ AI-generated summaries ได้ในที่เดียว

### 2. สิ่งที่อยู่ใน Scope

#### Dashboard Overview

MVP มีหน้า dashboard หลักที่แสดง:

- จำนวนงานทั้งหมด
- งานแยกตาม status
- จำนวนงานที่เลยกำหนด
- จำนวนงาน priority สูง
- ภาพรวม workload ของทีม
- ตัวอย่าง AI Daily Summary

#### Task Management

MVP มีแนวคิด task management พื้นฐาน:

- Task title
- Task description
- Status
- Priority
- Due date
- Assignee
- Client หรือ project label

การแก้ไข task สามารถเป็นแบบง่ายได้ MVP ไม่จำเป็นต้องมี task dependencies, recurring tasks, custom fields หรือ automation rules ขั้นสูง

#### Task List

MVP มีหน้า task list ที่แสดง demo tasks ทั้งหมด

ข้อมูลที่ควรแสดง:

- Title
- Status
- Priority
- Assignee
- Due date
- Overdue state

ตัวเลือกเสริมสำหรับ MVP:

- Search แบบง่าย
- Filter แบบง่ายตาม status, priority หรือ assignee

#### Task Detail

MVP มีหน้า task detail สำหรับแต่ละงาน

ข้อมูลที่ควรมี:

- Task title
- Description
- Status
- Priority
- Due date
- Assignee
- Client หรือ project label
- Notes หรือ activity placeholder แบบง่าย

#### Status Workflow

MVP มี workflow แบบง่าย

Status ที่แนะนำ:

- To Do
- In Progress
- Review
- Done

Status เสริม:

- Blocked

#### Priority

MVP มีระดับ priority

Priority ที่แนะนำ:

- Low
- Medium
- High
- Urgent

#### Due Date

MVP มี due date สำหรับ tasks

ระบบควรแสดงให้ชัดว่า:

- Due today
- Due soon
- Overdue

#### Assignee

แต่ละ task ควรมี assignee หนึ่งคนจาก demo team

Demo members:

- Admin
- Designer
- Content Writer
- Ads Manager
- Account Manager

#### Basic Kanban Board

MVP มี board view แบบพื้นฐานที่จัดกลุ่มตาม status

รวมอยู่ใน scope:

- คอลัมน์ตาม workflow status
- Task cards ในแต่ละคอลัมน์
- ตัวบอก priority และ due date ที่ชัดเจน

ไม่รวมอยู่ใน scope:

- Drag-and-drop board interactions
- Advanced board customization
- Swimlanes

#### AI Daily Summary

MVP มี daily summary ที่อธิบายได้ว่า:

- งานสำคัญของวันนี้คืออะไร
- งานไหนเลยกำหนด
- งาน priority สูงมีอะไรบ้าง
- สมาชิกคนไหนมี workload สูง
- วันนี้ควรโฟกัสอะไร

สำหรับ MVP แรก summary อาจสร้างจาก demo seed data หรือ mocked AI output ได้

#### AI Weekly Summary

MVP มี weekly summary ที่อธิบายได้ว่า:

- งานที่เสร็จแล้ว
- งานที่ยังอยู่ระหว่างดำเนินการ
- งานที่เลยกำหนดหรือ blocked
- Deadline ที่กำลังมาถึง
- Priority ที่ควรโฟกัสในสัปดาห์ถัดไป

สำหรับ MVP แรก summary อาจสร้างจาก demo seed data หรือ mocked AI output ได้

#### Overdue Summary

MVP มี summary ของงานที่เลยกำหนด

ข้อมูลที่ควรมี:

- จำนวนงานที่เลยกำหนด
- งานที่เลยกำหนดแยกตาม assignee
- งาน overdue ที่เสี่ยงที่สุด
- คำแนะนำ follow-up เบื้องต้น

#### Priority Suggestions

MVP มี priority suggestions เบื้องต้นโดยอิงจาก:

- Due date
- Priority value
- Current status
- Overdue state
- Assignee workload

#### Demo Seed Data

MVP มี demo data สำหรับ BrightAds Agency

Demo tasks:

- Write Facebook content for Client A
- Design monthly promotion banner
- Review weekly ads report
- Fix landing page based on feedback
- Prepare proposal for new client
- Send draft campaign to client
- Update campaign performance dashboard
- Create ad copy variations
- Review client feedback
- Schedule content calendar

### 3. หน้าหลักที่อยู่ใน Scope

- `/dashboard`
- `/tasks`
- `/tasks/[id]`
- `/board`
- `/ai-summary`
- `/team`
- `/settings`

### 4. สิ่งที่อยู่นอก Scope

รายการต่อไปนี้ไม่อยู่ใน Dashboard MVP:

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

### 5. เกณฑ์การยอมรับ MVP

MVP ถือว่าพร้อม demo เมื่อ:

- แสดง BrightAds Agency workspace ได้ชัดเจน
- เห็น demo members
- เห็น demo tasks
- Tasks แสดง status, priority, due date และ assignee
- Dashboard overview สื่อสารสถานะงานได้รวดเร็ว
- Task list และ task detail เข้าใจง่าย
- Board view จัดกลุ่ม tasks ตาม status
- หน้า AI summary มี daily, weekly, overdue และ priority sections
- ไม่มีการเพิ่ม feature ที่อยู่นอก scope โดยไม่ตั้งใจ

### 6. Non-Goals สำหรับ Day 1

Day 1 เป็น planning เท่านั้น

ไม่สร้าง:

- Application code
- UI components
- Prisma schema
- Database migrations
- เอกสารของ Digital Product track
