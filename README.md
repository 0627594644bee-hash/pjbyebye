# 🎬 Movie Ranker - เว็บไซต์จัดอันดับและรีวิวภาพยนตร์

เว็บไซต์สำหรับผู้ที่ชื่นชอบภาพยนตร์ รวบรวมการจัดอันดับภาพยนตร์ยอดนิยม ข้อมูลภาพยนตร์ บทความรีวิว พร้อมระบบค้นหาแบบเรียลไทม์ และระบบสมัครสมาชิกที่เชื่อมต่อฐานข้อมูล Cloud

---

## 🌐 Live Website & Design Link
* **Live Website (Vercel):** [https://pjbyebye.vercel.app/](https://pjbyebye.vercel.app/)
* **Figma Design:** [Figma Project Link](https://www.figma.com/design/cWkhthnOFlouzTIbhaumGH/Untitled?node-id=30-138&t=qQGA8u3tTpCTyN5w-1)

---

## 🎯 Project Objectives (วัตถุประสงค์และกลุ่มเป้าหมาย)
* **วัตถุประสงค์:** เพื่อสร้างแพลตฟอร์มศูนย์รวมข้อมูลและจัดอันดับภาพยนตร์ที่ใช้งานง่าย สวยงาม ทันสมัย รองรับการใช้งานทุกอุปกรณ์ และสามารถบันทึกข้อมูลสมาชิกไปยังฐานข้อมูล Cloud ได้แบบ Serverless
* **กลุ่มเป้าหมาย:** ผู้ที่ชื่นชอบการดูหนัง ผู้ที่ต้องการหาภาพยนตร์น่าดูตามคะแนนรีวิว และผู้ใช้งานทั่วไปที่ต้องการติดตามบทความข่าวสารเกี่ยวกับภาพยนตร์

---

## 🛠️ Technology Stack
* **Design:** Figma
* **Frontend:** HTML5, CSS3, JavaScript (ES6+ Vanilla JS)
* **Framework:** ไม่ใช้ Framework (Pure Static Web)
* **CSS / UI:** เขียน Custom Vanilla CSS เอง (Flexbox, CSS Grid, CSS Variables)
* **Database / Backend:** Supabase (PostgreSQL Cloud Database) + LocalStorage (Offline Fallback)
* **Libraries / SDK:** `@supabase/supabase-js` (เชื่อมต่อผ่าน CDN)
* **Version Control:** Git & GitHub
* **Hosting:** Vercel (Production) / Laragon (Local Development)
* **AI Tools:** Google Gemini / Antigravity AI Assistant

---

## ✨ Features (ฟังก์ชันหลักของเว็บไซต์)
1. **หน้าแรก (Home - `index.html`):** Hero Banner Slider แสดงภาพยนตร์ไฮไลท์แบบเลื่อนอัตโนมัติและรองรับการ Touch Swipe
2. **จัดอันดับภาพยนตร์ (Ranking - `ranking.html`):** แสดงอันดับหนังยอดนิยมพร้อมคะแนนและระดับความน่าดู
3. **รายละเอียดภาพยนตร์ (Detail - `detail.html`):** แสดงเรื่องย่อ นักแสดง และ Carousel รูปภาพตัวอย่าง
4. **บทความรีวิว (Review - `review.html`):** รวบรวมบทความวิจารณ์หนังพร้อม Mini Carousel
5. **ระบบค้นหา (Search - `search.html`):** ค้นหาภาพยนตร์แบบ Real-time ตามชื่อเรื่องโดยไม่ต้องรีโหลดหน้า
6. **ระบบสมัครสมาชิก (Register - `register.html`):** ฟอร์มลงทะเบียนพร้อมระบบตรวจสอบความถูกต้อง (Validation) และบันทึกลงฐานข้อมูล Supabase ทันที

---

## 🎨 Design Implementation (การนำดีไซน์จาก Figma มาใช้)
* **Layout:** วางโครงสร้างหน้าเว็บตาม Wireframe ใน Figma แบ่งเป็น Navigation Bar, Hero Section, Content Cards Grid และ Footer
* **Color Palette:** ใช้ชุดสี Dark Cinema Theme (โทนสีดำ-เทาเข้ม `#0d0f14`, `#151821`, ตัดด้วยสีทองและแดง `#e5a93c`, `#e50914`) เพื่อสร้างบรรยากาศโรงภาพยนตร์
* **Typography:** ใช้ฟอนต์ **Inter / Prompt** เพื่อให้อ่านง่ายทั้งภาษาไทยและภาษาอังกฤษ
* **Components:** ถอดแบบปุ่ม (Buttons), การ์ดหนัง (Movie Cards), แถบคะแนน และโมดอล (Modals) จาก Component ใน Figma ตรงตามสัดส่วน

---

## 📱 Responsive Design
* **Breakpoints:**
  * **Desktop:** หน้าจอกว้างกว่า `1024px` แสดงผลเต็มรูปแบบ (Grid แบบหลายคอลัมน์)
  * **Tablet:** หน้าจอ `768px - 1023px` ปรับลดคอลัมน์และขนาดแบนเนอร์
  * **Mobile:** หน้าจอเล็กกว่า `768px` แสดง Hamburger Navigation Menu ซ่อนเมนูลิงก์ และปรับ Grid เป็น 1 คอลัมน์เพื่อให้เลื่อนดูบนสมาร์ตโฟนได้สะดวก

---

## 🤖 AI Usage (การใช้งาน AI ในการพัฒนา)
* **เครื่องมือ:** Google Gemini / Antigravity AI Assistant
* **ขั้นตอนที่ใช้:** วางโครงสร้างสถาปัตยกรรม (Architecture), เขียนโค้ดเชื่อมต่อ API Supabase, และ Debug ปัญหาโค้ด
* **Prompt สำคัญ:**
  1. *"Vercel ไม่รองรับฐานข้อมูล SQL/PHP แก้ไขให้ด้วย ต้องการให้ฐานข้อมูลไปอยู่ใน Supabase และเอา SQL แบบเดิมออกทั้งหมด"*
  2. *"สร้างโค้ด SQL สำหรับตาราง users บน Supabase พร้อมเปิดใช้งาน RLS และกำหนด Policies"*
  3. *"ปรับแต่งให้เมื่อกดสมัครสมาชิก ให้บันทึกลง Supabase โดยตรงผ่าน JavaScript Client"*
* **ผลลัพธ์และการแก้ไข:** AI ช่วยเขียนโค้ดเชื่อมต่อฐานข้อมูล Supabase แต่พบปัญหาเรื่อง Variable Scope ชนกับ CDN จึงได้แก้ไขโดยเปลี่ยนชื่อตัวแปรเป็น `window._sb` และเพิ่มระบบ Fallback ลง LocalStorage

---

## 🚀 Deployment
* **Hosting Platform:** Vercel
* **Build Command:** ไม่มี (เนื่องจากเป็น Pure Static HTML/CSS/JS)
* **ขั้นตอน Deploy:**
  1. Push โค้ดขึ้น GitHub Repository
  2. เชื่อมต่อโปรเจกต์กับ Vercel โดยเลือก Import Repository
  3. ตั้งค่า Root Directory แล้วกด **Deploy** จะได้ URL ใช้งานทันทีผ่าน [https://pjbyebye.vercel.app/](https://pjbyebye.vercel.app/)

---

## 💡 Challenges & Learning (ปัญหาที่พบและสิ่งที่ได้เรียนรู้)
* **ปัญหาที่พบ:** การ Deploy บน Vercel ไม่รองรับ PHP และ MySQL แบบเดิม ทำให้ระบบบันทึกสมาชิกเดิมใช้งานไม่ได้
* **แนวทางแก้ไข:** เปลี่ยนสถาปัตยกรรมเป็น Serverless โดยใช้ JavaScript ฝั่ง Client เชื่อมต่อไปยัง Supabase Cloud Database แทน ทำให้ Deploy บน Vercel ได้สมบูรณ์ 100%
* **สิ่งที่ได้เรียนรู้:** ได้เรียนรู้การทำงานของ BaaS (Backend-as-a-Service), การตั้งค่าสิทธิ์ฐานข้อมูลผ่าน Row Level Security (RLS) และการประยุกต์ใช้ AI ช่วยในการ Refactor ระบบอย่างเป็นขั้นตอน

---

## 👤 Author (ผู้จัดทำ)
* **ชื่อ – นามสกุล:** สัณห์ฤทัย ยังมี
* **รหัสนักศึกษา:** 68319100053
