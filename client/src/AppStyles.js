const adminUrls = window.location.pathname.startsWith('/admin');
const color = adminUrls ? '#EFF5F8' : '#F3F4F6';
export const AppStyles = {
  backgroundColor: color,
  width: '100%',
  height: '100%',
  minHeight: '100vh',
  overflow: 'hidden',
};
