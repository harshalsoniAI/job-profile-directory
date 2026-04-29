# Public Job Profile Directory (SaaS)

A clean, modern public-facing web application for browsing municipal job classifications. Built with React + Node.js/Express, integrated with Supabase for multi-tenancy.

## 🚀 Deployment (Vercel)
This app is optimized for Vercel "Zero Config" deployment. The API is located in `/api` and the React frontend is in the root.

## 🛠️ Local Testing

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Setup Environment**
   Create a `.env` file in the root with:
   ```env
   SUPABASE_URL=your_url
   SUPABASE_KEY=your_key
   ```

3. **Run Locally**
   ```bash
   npm run dev
   ```

4. **Seed Data**
   ```bash
   npm run seed
   ```

## 📂 Project Structure
- `/api` - Backend Express logic (Serverless)
- `/src` - React frontend code
- `/public` - Static assets
