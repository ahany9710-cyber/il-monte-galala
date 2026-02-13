/**
 * إعدادات الموقع - عدّل القيم هنا فقط لتحديثها في كل الصفحات
 * Site config - edit these values only to update across the whole site
 */

export const config = {
  // معرف فورم Formspree (الفورم يبعت على الإيميل المسجل في formspree.io)
  // Formspree form ID (form submissions go to the email registered at formspree.io)
  formspreeFormId: 'meelayjw',

  // رقم الواتساب (بدون + أو مسافات لاستخدامه في wa.me)
  // WhatsApp number (without + or spaces for wa.me links)
  whatsappNumber: '201034444282',

  // رقم الموبايل للمكالمات (مع + للمكالمات)
  // Phone number for calls (with + for tel: links)
  phoneNumber: '+201021778855',

  // تنسيق رقم الموبايل للعرض (اختياري - لو فاضي يستخدم phoneNumber)
  // Phone display format (optional - uses phoneNumber if empty)
  phoneDisplay: '+20 102 177 8855',

  // ——— Google Ads (تهيئة جوجل أدز) ———
  // معرف Google Tag العالمي (مثل AW-XXXXXXXXX) - يُحمّل في كل الصفحات
  // Global Tag ID (e.g. AW-XXXXXXXXX) - loaded on all pages
  gtag_id: '',

  // معرف التحويل (اختياري - للتوثيق، التتبع الفعلي يستخدم gtag_id + conversion_label)
  // Conversion ID from Google Ads (optional - for reference; tracking uses gtag_id + conversion_label)
  conversion_id: '',

  // رمز التحويل من إعدادات التحويل في Google Ads - يُستخدم في صفحة الشكر فقط
  // Conversion label from Google Ads - used on thank-you page only
  conversion_label: '',
};
