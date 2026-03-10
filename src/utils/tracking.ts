export const trackPageView = (pageLabel: string) => {
  if (pageLabel === 'Admin') return;
  
  const stats = JSON.parse(localStorage.getItem('page_stats') || '{}');
  stats[pageLabel] = (stats[pageLabel] || 0) + 1;
  localStorage.setItem('page_stats', JSON.stringify(stats));
};

export const trackScriptReveal = (lessonId: string) => {
  const stats = JSON.parse(localStorage.getItem('script_reveal_stats') || '{}');
  stats[lessonId] = (stats[lessonId] || 0) + 1;
  localStorage.setItem('script_reveal_stats', JSON.stringify(stats));
};

export const trackClick = () => {
  const stats = JSON.parse(localStorage.getItem('click_stats') || '0');
  localStorage.setItem('click_stats', JSON.stringify(stats + 1));
};

export const trackUserVisit = async () => {
  const hasVisited = localStorage.getItem('has_visited');
  const stats = JSON.parse(localStorage.getItem('user_visit_stats') || '{"unique": 0, "repeated": 0, "ips": []}');
  
  if (!stats.ips) {
    stats.ips = [];
  }
  
  if (!hasVisited) {
    stats.unique += 1;
    localStorage.setItem('has_visited', 'true');
  } else {
    stats.repeated += 1;
  }
  
  // Fetch IP
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    if (data && data.ip && !stats.ips.includes(data.ip)) {
      stats.ips.push(data.ip);
    }
  } catch (e) {
    console.error('Failed to fetch IP', e);
  }
  
  localStorage.setItem('user_visit_stats', JSON.stringify(stats));
};

export const getStats = () => {
  const userStats = JSON.parse(localStorage.getItem('user_visit_stats') || '{"unique": 0, "repeated": 0, "ips": []}');
  if (!userStats.ips) {
    userStats.ips = [];
  }
  
  return {
    pageStats: JSON.parse(localStorage.getItem('page_stats') || '{}'),
    scriptStats: JSON.parse(localStorage.getItem('script_reveal_stats') || '{}'),
    userStats,
    clickStats: JSON.parse(localStorage.getItem('click_stats') || '0')
  };
};

export const isAdminLoggedIn = () => {
  return localStorage.getItem('is_admin') === 'true';
};

export const loginAdmin = () => {
  localStorage.setItem('is_admin', 'true');
};

export const logoutAdmin = () => {
  localStorage.removeItem('is_admin');
};

export const resetStats = () => {
  localStorage.setItem('page_stats', JSON.stringify({}));
  localStorage.setItem('script_reveal_stats', JSON.stringify({}));
  localStorage.setItem('user_visit_stats', JSON.stringify({ unique: 0, repeated: 0, ips: [] }));
  localStorage.setItem('click_stats', JSON.stringify(0));
  localStorage.setItem('has_visited', 'true');
};

export const resetUserStats = () => {
  localStorage.setItem('user_visit_stats', JSON.stringify({ unique: 0, repeated: 0, ips: [] }));
  localStorage.setItem('has_visited', 'true');
};

export const resetPageStats = () => {
  localStorage.setItem('page_stats', JSON.stringify({}));
};

export const resetScriptStats = () => {
  localStorage.setItem('script_reveal_stats', JSON.stringify({}));
};