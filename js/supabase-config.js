/**
 * Supabase Configuration for Movie Ranker
 */

const SUPABASE_URL = 'https://lbobmvkxxxoecnnnwvxs.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_zcIFTxRKVT0VN--Lojg5dA_Fj-O7aIw';

// ใช้ชื่อ window._sb เพื่อไม่ให้ชนกับ global 'supabase' ของ SDK
window._sb = null;

function initSupabase() {
  // CDN โหลดแล้ว expose module เป็น window.supabase (ตัวใหญ่ S)
  if (typeof window.supabase !== 'undefined' && typeof window.supabase.createClient === 'function') {
    try {
      window._sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      console.log('✅ Supabase Cloud connected!');
    } catch (err) {
      console.warn('⚠️ Supabase init error:', err);
    }
  } else {
    console.warn('⚠️ Supabase SDK not loaded yet');
  }
}
