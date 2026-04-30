import React, { useState, useEffect } from 'react';
import ProductsPage from './pages/ProductsPage.jsx';
import ProductLandingPage from './pages/ProductLandingPage.jsx';
import ShippingPage from './pages/ShippingPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';
import PixelsPage from './pages/PixelsPage.jsx';
import OrdersPage from './pages/OrdersPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import { supabase } from './supabaseClient';

// ─── Icons (inline SVGs to avoid any import issues) ───
const Icon = ({ name, size = 18, color = 'currentColor' }) => {
  const icons = {
    facebook: <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>,
    instagram: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill={color}/></svg>,
    youtube: <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-1.96C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.4 19.54C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM10 15.5v-7l6 3.5-6 3.5z"/></svg>,
    globe: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
    user: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
    chevronDown: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>,
    chevronLeft: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>,
    plus: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
    info: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
    layout: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>,
    tag: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>,
    truck: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
    megaphone: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><path d="M3 11l19-9-9 19-2-8-8-2z"/></svg>,
    star: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
    percent: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><line x1="19" y1="5" x2="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>,
    barChart: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
    users: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    tiktok: <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.73a4.85 4.85 0 0 1-1-.04z"/></svg>,
    snapchat: <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 13.75c-.06.13-.2.21-.35.21-.08 0-.16-.02-.23-.06-.88-.5-1.56-.57-2.35-.29-.5.18-.93.49-1.37.8-.55.39-1.12.79-1.89.79-.77 0-1.35-.4-1.89-.79-.44-.31-.87-.62-1.37-.8-.79-.28-1.47-.21-2.35.29-.07.04-.15.06-.23.06a.39.39 0 0 1-.35-.21c-.09-.19-.04-.41.12-.54.69-.53 1.04-1.26 1.04-2.16 0-.14.11-.25.25-.25s.25.11.25.25c0 .77-.28 1.43-.83 1.97.79-.35 1.58-.35 2.35-.08.57.2 1.05.54 1.52.87.45.32.88.62 1.48.62s1.03-.3 1.48-.62c.47-.33.95-.67 1.52-.87.77-.27 1.56-.27 2.35.08-.55-.54-.83-1.2-.83-1.97 0-.14.11-.25.25-.25s.25.11.25.25c0 .9.35 1.63 1.04 2.16.16.13.21.35.12.54z"/></svg>,
    googleAnalytics: <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972a6.033 6.033 0 1 1 0-12.064 5.963 5.963 0 0 1 4.197 1.636l2.888-2.888A10 10 0 1 0 12 22a10 10 0 0 0 10-10 9.896 9.896 0 0 0-.18-1.761z" fill="#4285F4"/></svg>,
    settings: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
    home: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    box: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>,
    shoppingCart: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>,
  };
  return icons[name] || null;
};

// ─── Sidebar ───
const NAV = [
  { key: 'home',     icon: 'layout',   label: 'الرئيسية'  },
  { key: 'orders',   icon: 'truck',    label: 'الطلبات'   },
  { key: 'products', icon: 'tag',      label: 'المنتجات'  },
  { key: 'fb-pixel', icon: 'facebook', label: 'البكسل'    },
  { key: 'shipping', icon: 'truck',    label: 'التوصيل'   },
  { key: 'settings', icon: 'settings', label: 'الإعدادات' },
];

function Sidebar({ active, setActive, settings, NAV }) {
  return (
    <aside className="sidebar">
      <div className="logo-wrap" style={{ display: 'flex', alignItems: 'center', gap: 15, padding: '25px 24px', marginBottom: 20, borderBottom: '1px solid #f1f5f9' }}>
        <img 
          src="/LOGO.png" 
          alt="Logo" 
          style={{ width: 50, height: 50, borderRadius: 12, objectFit: 'contain' }} 
        />
        <div style={{ fontWeight: 800, fontSize: 19, color: '#111', letterSpacing: '-0.5px' }}>{settings.storeName || 'YACINE X'}</div>
      </div>
      <div className="sidebar-group">
        {NAV.map(item => (
          <div key={item.key} className={`sidebar-item ${active === item.key ? 'active' : ''}`} onClick={() => setActive(item.key)}>
            <span className="item-icon">
              <Icon name={item.icon} size={17} color={active === item.key ? '#fff' : '#374151'} />
            </span>
            <span className="item-label">{item.label}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}

// ─── Custom Modal ───
function CustomConfirm({ isOpen, title, message, onConfirm, onCancel }) {
  if (!isOpen) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }} onClick={onCancel} />
      <div style={{ 
        position: 'relative', width: '100%', maxWidth: 400, background: '#fff', borderRadius: 24, padding: 30, textAlign: 'center',
        boxShadow: '0 20px 40px rgba(0,0,0,0.2)', animation: 'modalSlideUp 0.3s ease-out'
      }}>
        <div style={{ width: 60, height: 60, borderRadius: '50%', background: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
        </div>
        <h3 style={{ fontSize: 20, fontWeight: 850, color: '#111', marginBottom: 10 }}>{title}</h3>
        <p style={{ color: '#6b7280', fontSize: 15, lineHeight: 1.6, marginBottom: 25 }}>{message}</p>
        <div style={{ display: 'flex', gap: 12 }}>
          <button onClick={onCancel} style={{ flex: 1, padding: '12px', borderRadius: 14, border: '1px solid #e5e7eb', background: '#fff', color: '#374151', fontWeight: 700, cursor: 'pointer' }}>إلغاء</button>
          <button onClick={onConfirm} style={{ flex: 1, padding: '12px', borderRadius: 14, border: 'none', background: '#ef4444', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>تأكيد الحذف</button>
        </div>
      </div>
    </div>
  );
}

// ─── Generic Coming Soon Page ───
function GenericPage({ label }) {
  return (
    <div className="empty-state" style={{ marginTop: 40 }}>
      <div className="empty-icon-wrap">
        <Icon name="megaphone" size={36} color="#d1d5db" />
      </div>
      <p style={{ fontWeight: 700, fontSize: 16, color: '#374151' }}>{label}</p>
      <p>هذا القسم قيد التطوير</p>
    </div>
  );
}

// ─── App ───
export default function App() {
  // ─── كل الـ hooks يجيوا أولاً (Rules of Hooks) ───
  const [active, setActive] = useState('products');
  const [viewProduct, setViewProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [storeSettings, setStoreSettings] = useState({
    storeName: 'YACINE X',
    language: 'ar',
    googleSheetUrl: ''
  });
  const [pixels, setPixels] = useState([]);
  const [tiktokPixels, setTiktokPixels] = useState([]);
  
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, title: '', message: '', onConfirm: null });

  const triggerConfirm = (title, message, onConfirm) => {
    setConfirmModal({ isOpen: true, title, message, onConfirm: () => { onConfirm(); setConfirmModal(prev => ({ ...prev, isOpen: false })); } });
  };

  const DEFAULT_WILAYAS = [
    { id: '01', name: 'أدرار',           home: 800, office: 600 },
    { id: '02', name: 'الشلف',           home: 600, office: 400 },
    { id: '03', name: 'الأغواط',         home: 700, office: 500 },
    { id: '04', name: 'أم البواقي',      home: 600, office: 400 },
    { id: '05', name: 'باتنة',           home: 600, office: 400 },
    { id: '06', name: 'بجاية',           home: 600, office: 400 },
    { id: '07', name: 'بسكرة',           home: 700, office: 500 },
    { id: '08', name: 'بشار',            home: 800, office: 600 },
    { id: '09', name: 'البليدة',         home: 600, office: 400 },
    { id: '10', name: 'البويرة',         home: 600, office: 400 },
    { id: '11', name: 'تمنراست',         home: 900, office: 700 },
    { id: '12', name: 'تبسة',            home: 700, office: 500 },
    { id: '13', name: 'تلمسان',          home: 600, office: 400 },
    { id: '14', name: 'تيارت',           home: 600, office: 400 },
    { id: '15', name: 'تيزي وزو',        home: 600, office: 400 },
    { id: '16', name: 'الجزائر',         home: 500, office: 350 },
    { id: '17', name: 'الجلفة',          home: 700, office: 500 },
    { id: '18', name: 'جيجل',            home: 600, office: 400 },
    { id: '19', name: 'سطيف',            home: 600, office: 400 },
    { id: '20', name: 'سعيدة',           home: 600, office: 400 },
    { id: '21', name: 'سكيكدة',          home: 600, office: 400 },
    { id: '22', name: 'سيدي بلعباس',     home: 600, office: 400 },
    { id: '23', name: 'عنابة',           home: 600, office: 400 },
    { id: '24', name: 'قالمة',           home: 600, office: 400 },
    { id: '25', name: 'قسنطينة',         home: 600, office: 400 },
    { id: '26', name: 'المدية',          home: 600, office: 400 },
    { id: '27', name: 'مستغانم',         home: 600, office: 400 },
    { id: '28', name: 'المسيلة',         home: 700, office: 500 },
    { id: '29', name: 'معسكر',           home: 600, office: 400 },
    { id: '30', name: 'ورقلة',           home: 800, office: 600 },
    { id: '31', name: 'وهران',           home: 600, office: 400 },
    { id: '32', name: 'البيض',           home: 700, office: 500 },
    { id: '33', name: 'إليزي',           home: 1000, office: 800 },
    { id: '34', name: 'برج بوعريريج',    home: 600, office: 400 },
    { id: '35', name: 'بومرداس',         home: 600, office: 400 },
    { id: '36', name: 'الطارف',          home: 600, office: 400 },
    { id: '37', name: 'تندوف',           home: 1000, office: 800 },
    { id: '38', name: 'تيسمسيلت',        home: 600, office: 400 },
    { id: '39', name: 'الوادي',          home: 800, office: 600 },
    { id: '40', name: 'خنشلة',           home: 700, office: 500 },
    { id: '41', name: 'سوق أهراس',       home: 700, office: 500 },
    { id: '42', name: 'تيبازة',          home: 600, office: 400 },
    { id: '43', name: 'ميلة',            home: 600, office: 400 },
    { id: '44', name: 'عين الدفلى',      home: 600, office: 400 },
    { id: '45', name: 'النعامة',         home: 800, office: 600 },
    { id: '46', name: 'عين تيموشنت',     home: 600, office: 400 },
    { id: '47', name: 'غرداية',          home: 800, office: 600 },
    { id: '48', name: 'غليزان',          home: 600, office: 400 },
    { id: '49', name: 'تيميمون',         home: 900, office: 700 },
    { id: '50', name: 'برج باجي مختار',  home: 1000, office: 800 },
    { id: '51', name: 'أولاد جلال',      home: 800, office: 600 },
    { id: '52', name: 'بني عباس',        home: 900, office: 700 },
    { id: '53', name: 'عين صالح',        home: 1000, office: 800 },
    { id: '54', name: 'عين قزام',        home: 1000, office: 800 },
    { id: '55', name: 'تقرت',            home: 800, office: 600 },
    { id: '56', name: 'جانت',            home: 1000, office: 800 },
    { id: '57', name: 'المغير',          home: 800, office: 600 },
    { id: '58', name: 'المنيعة',         home: 900, office: 700 },
  ];

  const [shippingConfig, setShippingConfig] = useState(DEFAULT_WILAYAS);
  const [formSettings, setFormSettings] = useState({
    name: true, phone: true, wilaya: true, municipality: true, address: true, email: false, notes: false
  });
  const [session, setSession] = useState(() => {
    return localStorage.getItem('flex_admin_session') === 'true';
  });

  const handleLogout = async () => {
    localStorage.removeItem('flex_admin_session');
    setSession(false);
    await supabase.auth.signOut();
  };

  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // 1. جلب البيانات من Supabase
  useEffect(() => {
    async function fetchData() {
      console.log("جارٍ الاتصال بـ Supabase...");
      try {
        const { data: config, error: configErr } = await supabase.from('store_configs').select('*').eq('id', 'main_config').single();
        if (configErr) console.error("خطأ في جلب الإعدادات:", configErr);
        
        if (config) {
          setStoreSettings({ 
            storeName: config.store_name || 'Flex Platform', 
            language: config.language || 'ar', 
            googleSheetUrl: config.google_sheet_url || '' 
          });
          if (config.form_settings) setFormSettings(config.form_settings);
          if (config.shipping_prices && config.shipping_prices.length > 0) setShippingConfig(config.shipping_prices);
           if (config.pixels) setPixels(config.pixels);
           if (config.tiktok_pixels) setTiktokPixels(config.tiktok_pixels);
        } else {
          await supabase.from('store_configs').insert([{ id: 'main_config', store_name: 'Flex Platform', language: 'ar' }]);
        }

        const { data: prods, error: prodsErr } = await supabase.from('products').select('*').order('created_at', { ascending: false });
        if (prodsErr) console.error("خطأ في جلب المنتجات:", prodsErr);
        if (prods) setProducts(prods);
      } catch (e) {
        console.error("خطأ غير متوقع:", e);
      }
    }
    fetchData();
  }, []);

  // 2. المزامنة التلقائية للإعدادات
  useEffect(() => {
    const syncConfig = async () => {
      const { error } = await supabase.from('store_configs').upsert({
        id: 'main_config',
        store_name: storeSettings.storeName,
        language: storeSettings.language,
        google_sheet_url: storeSettings.googleSheetUrl,
        form_settings: formSettings,
        shipping_prices: shippingConfig,
        pixels: pixels,
        tiktok_pixels: tiktokPixels
      });

      if (error) {
        console.error("Sync Error:", error);
        if (error.message.includes('column') || error.code === '42703') {
          showToast("⚠️ أعمدة ناقصة في قاعدة البيانات! يرجى مراجعة التعليمات لإضافتها.", "error");
        }
      }
    };
    syncConfig();
  }, [storeSettings, formSettings, shippingConfig, pixels]);

  // ─── وضع المعاينة: يفتح في تاب جديد بـ ?preview=true ───
  const isPreviewMode = new URLSearchParams(window.location.search).get('preview') === 'true';

  // ─── ميزة الروابط الذكية (Smart Links) ───
  const [publicProduct, setPublicProduct] = useState(null);
  const [loadingPublic, setLoadingPublic] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.has('id') || params.has('p');
  });
  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id') || params.get('p');
    
    if (productId) {
      const fetchPublicProduct = async () => {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', productId)
          .single();
        
        if (data && !error) {
          setPublicProduct(data);
        }
        setLoadingPublic(false);
      };
      fetchPublicProduct();
    } else {
      setLoadingPublic(false);
    }
  }, []);

  if (isPreviewMode) {
    const previewProduct  = JSON.parse(localStorage.getItem('flex_preview_product')  || 'null');
    const previewShipping = JSON.parse(localStorage.getItem('flex_preview_shipping') || '[]');
    const previewForm     = JSON.parse(localStorage.getItem('flex_preview_form')     || '{}');
    const previewSettings = JSON.parse(localStorage.getItem('flex_preview_settings') || '{}');
    const previewPixels   = JSON.parse(localStorage.getItem('flex_preview_pixels')   || '[]');
    const previewTiktokPixels = JSON.parse(localStorage.getItem('flex_preview_tiktok_pixels') || '[]');

    if (!previewProduct) {
      return (
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', minHeight:'100vh', fontFamily:'Cairo,sans-serif', flexDirection:'column', gap:16, direction:'rtl' }}>
          <div style={{ fontSize:48 }}>⚠️</div>
          <p style={{ fontWeight:700, fontSize:18 }}>لم يتم العثور على بيانات المنتج</p>
          <p style={{ color:'#6b7280' }}>اضغط على "عرض الصفحة" من لوحة التحكم أولاً</p>
        </div>
      );
    }
    return (
      <ProductLandingPage
        product={previewProduct}
        onBack={() => window.close()}
        shippingConfig={previewShipping}
        formSettings={previewForm}
        settings={previewSettings}
        pixels={previewPixels}
        tiktokPixels={previewTiktokPixels}
      />
    );
  }

  const renderPage = () => {
    const commonProps = { triggerConfirm };
    switch (active) {
      case 'dashboard': 
        return <DashboardPage />;
      case 'products':  
        return (
          <ProductsPage 
            {...commonProps} 
            products={products} 
            setProducts={setProducts} 
            shippingConfig={shippingConfig} 
            formSettings={formSettings} 
            settings={storeSettings} 
            pixels={pixels} 
            tiktokPixels={tiktokPixels} 
            onViewProduct={(p) => setViewProduct(p)} 
          />
        );
      case 'orders':    
        return <OrdersPage {...commonProps} />;
      case 'shipping':  
        return (
          <ShippingPage 
            config={shippingConfig} 
            setConfig={setShippingConfig} 
            formSettings={formSettings} 
            setFormSettings={setFormSettings} 
          />
        );
      case 'pixels':    
        return (
          <PixelsPage 
            fbPixels={pixels} 
            setFbPixels={setPixels} 
            ttPixels={tiktokPixels} 
            setTtPixels={setTiktokPixels} 
            lang={storeSettings.language}
          />
        );
      case 'settings':  
        return (
          <SettingsPage 
            settings={storeSettings} 
            setSettings={setStoreSettings} 
            showToast={showToast} 
          />
        );
      default:          
        return <DashboardPage />;
    }
  };

  if (viewProduct) {
    return (
      <ProductLandingPage 
        product={viewProduct} 
        onBack={() => setViewProduct(null)} 
        shippingConfig={shippingConfig}
        formSettings={formSettings}
        settings={storeSettings}
        pixels={pixels}
      />
    );
  }

  // إذا كان النظام بصدد جلب بيانات المنتج العام، اعرض شاشة تحميل أنيقة
  if (loadingPublic) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff', flexDirection: 'column', gap: 20 }}>
        <img src="/LOGO.png" style={{ width: 80, height: 80, animation: 'pulse 1.5s infinite' }} alt="Loading..." />
        <div style={{ fontSize: 14, color: '#666', fontWeight: 600 }}>جاري جلب بيانات المنتج...</div>
        <style>{`
          @keyframes pulse {
            0% { opacity: 0.5; transform: scale(0.95); }
            50% { opacity: 1; transform: scale(1); }
            100% { opacity: 0.5; transform: scale(0.95); }
          }
        `}</style>
      </div>
    );
  }

  // إذا كان هناك منتج عام مطلوب عبر الرابط، اعرضه فوراً للزائر
  if (publicProduct) {
    return (
      <ProductLandingPage 
        product={publicProduct} 
        onBack={null} // زائر عادي لا يمكنه العودة للوحة التحكم
        shippingConfig={shippingConfig}
        formSettings={formSettings}
        settings={storeSettings}
        pixels={pixels}
        tiktokPixels={tiktokPixels}
      />
    );
  }

  // إذا لم يكن هناك تسجيل دخول، اعرض صفحة تسجيل الدخول
  if (!session) {
    return <LoginPage onLogin={setSession} />;
  }

  // ترجمة القائمة الجانبية والواجهة
  const dashboardLang = storeSettings.language || 'ar';
  const navTranslations = {
    ar: { dashboard: 'لوحة التحكم', products: 'المنتجات', orders: 'الطلبات', shipping: 'التوصيل', settings: 'الإعدادات', logout: 'تسجيل الخروج' },
    fr: { dashboard: 'Tableau de bord', products: 'Produits', orders: 'Commandes', shipping: 'Livraison', settings: 'Paramètres', logout: 'Déconnexion' },
    en: { dashboard: 'Dashboard', products: 'Products', orders: 'Orders', shipping: 'Shipping', settings: 'Settings', logout: 'Logout' }
  };
  const d = navTranslations[dashboardLang] || navTranslations.ar;

  const NAV = [
    { key: 'dashboard', label: d.dashboard, icon: 'home' },
    { key: 'products', label: d.products, icon: 'box' },
    { key: 'orders', label: d.orders, icon: 'shoppingCart' },
    { key: 'shipping', label: d.shipping, icon: 'truck' },
    { key: 'pixels', label: 'Marketing Pixels', icon: 'facebook' },
    { key: 'settings', label: d.settings, icon: 'settings' },
  ];

  return (
    <div className="layout" style={{ direction: dashboardLang === 'ar' ? 'rtl' : 'ltr' }}>
      <Sidebar active={active} setActive={setActive} settings={storeSettings} NAV={NAV} logoutLabel={d.logout} />
      <div className="main-area">
        <header className="header" style={{ padding: '20px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontWeight: 800 }}>{NAV.find(n => n.key === active)?.label}</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
            <div style={{ fontSize: 12, color: '#64748b' }}>{session?.user?.email}</div>
            <button 
              onClick={handleLogout}
              style={{ padding: '8px 16px', borderRadius: 10, background: '#fef2f2', color: '#ef4444', border: 'none', fontWeight: 700, cursor: 'pointer' }}
            >
              {d.logout}
            </button>
          </div>
        </header>
        <main className="page-content">
          {renderPage()}
        </main>
      </div>
      
      {toast && (
        <div style={{
          position: 'fixed', bottom: 30, right: 30, background: toast.type === 'success' ? '#111' : '#ef4444',
          color: '#fff', padding: '16px 24px', borderRadius: 16, boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
          zIndex: 999999, display: 'flex', alignItems: 'center', gap: 12, fontWeight: 700,
          animation: 'toast-in 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
          direction: dashboardLang === 'ar' ? 'rtl' : 'ltr', fontFamily: "'Cairo', sans-serif"
        }}>
          <div>{toast.type === 'success' ? '✅' : '⚠️'}</div>
          <div>{toast.message}</div>
        </div>
      )}
      <CustomConfirm 
        isOpen={confirmModal.isOpen} 
        title={confirmModal.title} 
        message={confirmModal.message} 
        onConfirm={confirmModal.onConfirm} 
        onCancel={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))} 
      />
      
      <style>{`
        @keyframes toast-in { from { transform: translateX(100%) scale(0.9); opacity: 0; } to { transform: translateX(0) scale(1); opacity: 1; } }
        @keyframes modalSlideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      `}</style>
    </div>
  );
}

