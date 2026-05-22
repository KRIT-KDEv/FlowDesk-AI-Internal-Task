# FlowDesk AI Dashboard Product Spec

## Eng.ver

### 1. Track Definition

FlowDesk AI Dashboard is the web app / SaaS MVP track of the FlowDesk project.

This document covers the Dashboard web app only. It does not cover the Digital Product track.

### 2. Product Overview

FlowDesk AI Dashboard is an internal task and workflow dashboard with AI summaries for freelancers, small agencies, and small business teams.

The MVP focuses on helping a small agency team understand:

- What work is active
- What work is overdue
- Who is responsible for each task
- Which tasks are high priority
- What the team should focus on today and this week

### 3. Target User For MVP

Primary MVP user:

- Small agency teams that manage content, design, ads, and client work

Primary roles:

- Team lead or agency owner
- Account manager
- Designer
- Content writer
- Ads manager

The MVP should feel useful for a small team that needs operational clarity without a heavy project management setup.

### 4. Core Problem

Tasks are spread across chat, spreadsheets, Trello, project tools, and manual updates.

Team leads need one dashboard to see task status, overdue work, team workload, and AI-generated daily or weekly summaries.

### 5. Product Goal

The MVP should give a small agency team one simple place to:

- Track tasks
- Review task status
- See overdue work
- Understand team workload
- Review AI-generated daily and weekly summaries
- Receive basic priority suggestions

### 6. Demo Workspace

Workspace name:

- BrightAds Agency

Demo members:

- Admin
- Designer
- Content Writer
- Ads Manager
- Account Manager

Example demo tasks:

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

### 7. Main Dashboard Pages

#### `/dashboard`

Purpose:

- Show a high-level operational overview.

Expected content:

- Total tasks
- Tasks by status
- Overdue tasks
- High-priority tasks
- Team workload snapshot
- AI daily summary preview

#### `/tasks`

Purpose:

- Show the main task list.

Expected content:

- Search or simple filtering
- Task title
- Status
- Priority
- Assignee
- Due date
- Overdue indicator

#### `/tasks/[id]`

Purpose:

- Show task detail.

Expected content:

- Task title
- Description
- Status
- Priority
- Due date
- Assignee
- Related client or project label
- Simple activity or note area for demo purposes

#### `/board`

Purpose:

- Show tasks grouped by workflow status.

Expected content:

- Basic Kanban-style columns
- Tasks grouped by status
- No drag-and-drop in MVP
- Status can be changed through simple controls if implementation allows

#### `/ai-summary`

Purpose:

- Show AI-generated operational summaries.

Expected content:

- AI Daily Summary
- AI Weekly Summary
- Overdue Summary
- Priority Suggestions

#### `/team`

Purpose:

- Show demo team members and workload.

Expected content:

- Member list
- Role
- Assigned task count
- Overdue task count
- High-priority task count

#### `/settings`

Purpose:

- Show simple workspace settings for the demo.

Expected content:

- Workspace name
- Demo member list
- Basic preferences placeholder
- No billing or advanced permission settings

### 8. Core MVP Features

Dashboard overview:

- Displays task counts, status distribution, overdue work, and workload overview.

Task management:

- Create, view, update, and organize tasks at a basic level.

Task list:

- Displays all demo tasks in a structured table or list.

Task detail:

- Displays complete task information.

Status workflow:

- Tracks task progress through simple statuses such as To Do, In Progress, Review, and Done.

Priority:

- Supports priority values such as Low, Medium, High, and Urgent.

Due date:

- Shows when each task is due and whether it is overdue.

Assignee:

- Connects each task to one demo team member.

Basic Kanban board:

- Shows tasks grouped by workflow status without drag-and-drop.

AI Daily Summary:

- Summarizes today's work, overdue items, and suggested focus.

AI Weekly Summary:

- Summarizes weekly progress, bottlenecks, and upcoming priorities.

Overdue Summary:

- Highlights overdue tasks and accountable owners.

Priority Suggestions:

- Suggests which tasks should be handled first based on due date, priority, status, and workload.

Demo seed data:

- Provides realistic BrightAds Agency data for product demos.

### 9. MVP Success Criteria

The Dashboard MVP is successful if a demo user can:

- Understand agency task status within one minute
- See overdue work clearly
- Open a task and understand who owns it
- Review work by status on a board
- Review useful AI daily and weekly summaries
- Understand team workload at a glance

### 10. Important Constraints

For Day 1:

- Do not write application code
- Do not create UI components
- Do not create a Prisma schema
- Do not work on the Digital Product track
- Focus only on Dashboard planning documents

### 11. Risks And Open Decisions

- AI summary source: The MVP needs a decision on whether summaries are generated from static demo data or connected to a real AI API later.
- Task creation depth: The MVP needs a decision on whether task creation is included in the first demo or if the demo is read-mostly.
- Workflow statuses: Final status labels should be confirmed before implementation.
- Data persistence: The MVP needs a later decision on whether data is local mock data, database-backed, or hybrid.
- Authentication: The MVP can likely use a demo workspace first, but future access rules need clarification.

---

## Thai.ver

### 1. คำนิยามของแทร็ก

FlowDesk AI Dashboard คือแทร็ก web app / SaaS MVP ของโปรเจกต์ FlowDesk

เอกสารนี้ครอบคลุมเฉพาะ Dashboard web app เท่านั้น ไม่รวม Digital Product track

### 2. ภาพรวมสินค้า

FlowDesk AI Dashboard คือแดชบอร์ดสำหรับจัดการงานและ workflow ภายในทีม พร้อม AI summary สำหรับฟรีแลนซ์ เอเจนซี่ขนาดเล็ก และทีมธุรกิจขนาดเล็ก

MVP จะช่วยให้ทีมเอเจนซี่ขนาดเล็กเห็นภาพรวมว่า:

- งานไหนกำลังดำเนินอยู่
- งานไหนเลยกำหนด
- ใครรับผิดชอบงานอะไร
- งานไหนมีความสำคัญสูง
- วันนี้และสัปดาห์นี้ทีมควรโฟกัสอะไร

### 3. ผู้ใช้เป้าหมายของ MVP

ผู้ใช้หลักของ MVP:

- ทีมเอเจนซี่ขนาดเล็กที่ดูแลงาน content, design, ads และงานลูกค้า

บทบาทหลัก:

- Team lead หรือเจ้าของเอเจนซี่
- Account manager
- Designer
- Content writer
- Ads manager

MVP ควรใช้งานง่ายสำหรับทีมเล็กที่ต้องการความชัดเจนในการทำงาน โดยไม่ต้องใช้ระบบ project management ที่ซับซ้อน

### 4. ปัญหาหลัก

งานกระจายอยู่ใน chat, spreadsheet, Trello, project tools และการอัปเดตด้วยมือ

Team lead ต้องการแดชบอร์ดเดียวที่เห็นสถานะงาน งานที่เลยกำหนด workload ของทีม และ daily / weekly summary ที่สร้างด้วย AI

### 5. เป้าหมายของสินค้า

MVP ควรช่วยให้ทีมเอเจนซี่ขนาดเล็กมีที่เดียวสำหรับ:

- ติดตามงาน
- ดูสถานะงาน
- เห็นงานที่เลยกำหนด
- เข้าใจ workload ของทีม
- อ่าน AI daily summary และ AI weekly summary
- ได้รับคำแนะนำ priority เบื้องต้น

### 6. Demo Workspace

ชื่อ workspace:

- BrightAds Agency

สมาชิก demo:

- Admin
- Designer
- Content Writer
- Ads Manager
- Account Manager

ตัวอย่าง demo tasks:

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

### 7. หน้าหลักของ Dashboard

#### `/dashboard`

หน้าที่:

- แสดงภาพรวมการทำงานของทีม

เนื้อหาที่ควรมี:

- จำนวนงานทั้งหมด
- จำนวนงานแยกตาม status
- งานที่เลยกำหนด
- งาน priority สูง
- ภาพรวม workload ของทีม
- ตัวอย่าง AI daily summary

#### `/tasks`

หน้าที่:

- แสดงรายการงานทั้งหมด

เนื้อหาที่ควรมี:

- Search หรือ filter แบบง่าย
- ชื่องาน
- Status
- Priority
- Assignee
- Due date
- สัญลักษณ์บอกว่างานเลยกำหนด

#### `/tasks/[id]`

หน้าที่:

- แสดงรายละเอียดของงาน

เนื้อหาที่ควรมี:

- ชื่องาน
- รายละเอียดงาน
- Status
- Priority
- Due date
- Assignee
- Client หรือ project label
- พื้นที่ activity หรือ note แบบง่ายสำหรับ demo

#### `/board`

หน้าที่:

- แสดงงานแยกตาม workflow status

เนื้อหาที่ควรมี:

- คอลัมน์แบบ Kanban เบื้องต้น
- งานที่ถูกจัดกลุ่มตาม status
- ไม่มี drag-and-drop ใน MVP
- ถ้าจำเป็น อาจเปลี่ยน status ผ่าน control แบบง่าย

#### `/ai-summary`

หน้าที่:

- แสดง summary การทำงานที่สร้างโดย AI

เนื้อหาที่ควรมี:

- AI Daily Summary
- AI Weekly Summary
- Overdue Summary
- Priority Suggestions

#### `/team`

หน้าที่:

- แสดงสมาชิก demo และ workload

เนื้อหาที่ควรมี:

- รายชื่อสมาชิก
- Role
- จำนวนงานที่ได้รับมอบหมาย
- จำนวนงานที่เลยกำหนด
- จำนวนงาน priority สูง

#### `/settings`

หน้าที่:

- แสดง workspace settings แบบง่ายสำหรับ demo

เนื้อหาที่ควรมี:

- ชื่อ workspace
- รายชื่อสมาชิก demo
- Placeholder สำหรับ preference เบื้องต้น
- ไม่มี billing หรือ permission ขั้นสูง

### 8. MVP Features หลัก

Dashboard overview:

- แสดงจำนวนงาน การกระจายตาม status งานที่เลยกำหนด และภาพรวม workload

Task management:

- สร้าง ดู อัปเดต และจัดระเบียบงานในระดับพื้นฐาน

Task list:

- แสดง demo tasks ทั้งหมดในรูปแบบ list หรือ table

Task detail:

- แสดงข้อมูลของงานแบบครบถ้วน

Status workflow:

- ติดตามความคืบหน้าผ่าน status เช่น To Do, In Progress, Review และ Done

Priority:

- รองรับ priority เช่น Low, Medium, High และ Urgent

Due date:

- แสดงวันครบกำหนดและบอกว่างานเลยกำหนดหรือไม่

Assignee:

- เชื่อมงานแต่ละชิ้นกับสมาชิก demo หนึ่งคน

Basic Kanban board:

- แสดงงานแยกตาม workflow status โดยไม่มี drag-and-drop

AI Daily Summary:

- สรุปงานของวันนี้ งานที่เลยกำหนด และสิ่งที่ควรโฟกัส

AI Weekly Summary:

- สรุปความคืบหน้ารายสัปดาห์ bottleneck และ priority ที่กำลังจะมาถึง

Overdue Summary:

- เน้นงานที่เลยกำหนดและผู้รับผิดชอบ

Priority Suggestions:

- แนะนำงานที่ควรทำก่อน โดยอิงจาก due date, priority, status และ workload

Demo seed data:

- เตรียมข้อมูล BrightAds Agency ที่สมจริงสำหรับ demo

### 9. เกณฑ์ความสำเร็จของ MVP

Dashboard MVP ถือว่าสำเร็จถ้า demo user สามารถ:

- เข้าใจสถานะงานของเอเจนซี่ได้ภายใน 1 นาที
- เห็นงานที่เลยกำหนดอย่างชัดเจน
- เปิด task แล้วเข้าใจว่าใครรับผิดชอบ
- ดูงานแยกตาม status บน board ได้
- อ่าน AI daily และ weekly summary ที่มีประโยชน์
- เข้าใจ workload ของทีมได้อย่างรวดเร็ว

### 10. ข้อจำกัดสำคัญ

สำหรับ Day 1:

- ไม่เขียน application code
- ไม่สร้าง UI components
- ไม่สร้าง Prisma schema
- ไม่ทำงานใน Digital Product track
- โฟกัสเฉพาะ planning documents ของ Dashboard

### 11. ความเสี่ยงและประเด็นที่ยังต้องตัดสินใจ

- แหล่งข้อมูลของ AI summary: ต้องตัดสินใจว่า MVP จะใช้ static demo data หรือเชื่อม AI API จริงในภายหลัง
- ความลึกของ task creation: ต้องตัดสินใจว่า demo แรกจะสร้างงานได้จริง หรือเป็น read-mostly demo
- Workflow statuses: ควรยืนยันชื่อ status ก่อนเริ่ม implementation
- Data persistence: ต้องตัดสินใจภายหลังว่าจะใช้ mock data, database หรือ hybrid
- Authentication: MVP อาจเริ่มจาก demo workspace ก่อน แต่ future access rules ยังต้องชัดเจน
