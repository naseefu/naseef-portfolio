// ── Centralized API client ────────────────────────────────────────────────────
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function getToken() {
  return localStorage.getItem('admin_token') || '';
}

async function request(path, options = {}) {
  const url = `${BASE_URL}${path}`;
  const token = getToken();

  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || `HTTP ${res.status}`);
  }

  return res.json();
}

// ── Public API helpers ────────────────────────────────────────────────────────
export const api = {
  // Profile
  getProfile:    ()           => request('/api/profile'),
  updateProfile: (data)       => request('/api/profile', { method: 'PUT',   body: JSON.stringify(data) }),
  patchProfile:  (data)       => request('/api/profile', { method: 'PATCH', body: JSON.stringify(data) }),

  // Projects
  getProjects:   (page, limit) => request(`/api/projects${page ? `?page=${page}&limit=${limit || 10}` : ''}`),
  getProject:    (id)         => request(`/api/projects/${id}`),
  createProject: (data)       => request('/api/projects', { method: 'POST',   body: JSON.stringify(data) }),
  updateProject: (id, data)   => request(`/api/projects/${id}`, { method: 'PUT',    body: JSON.stringify(data) }),
  deleteProject: (id)         => request(`/api/projects/${id}`, { method: 'DELETE' }),

  // Articles
  getArticles:   (page, limit) => request(`/api/articles${page ? `?page=${page}&limit=${limit || 10}` : ''}`),
  getArticle:    (id)         => request(`/api/articles/${id}`),
  createArticle: (data)       => request('/api/articles', { method: 'POST',   body: JSON.stringify(data) }),
  updateArticle: (id, data)   => request(`/api/articles/${id}`, { method: 'PUT',    body: JSON.stringify(data) }),
  deleteArticle: (id)         => request(`/api/articles/${id}`, { method: 'DELETE' }),

  // Awards
  getAwards:     ()           => request('/api/awards'),
  getAward:      (id)         => request(`/api/awards/${id}`),
  createAward:   (data)       => request('/api/awards', { method: 'POST',   body: JSON.stringify(data) }),
  updateAward:   (id, data)   => request(`/api/awards/${id}`, { method: 'PUT',    body: JSON.stringify(data) }),
  deleteAward:   (id)         => request(`/api/awards/${id}`, { method: 'DELETE' }),

  // Auth
  login:         (credentials) => request('/api/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
  verify:        ()             => request('/api/auth/verify'),

  // Expertise
  getExpertise:    ()           => request('/api/expertise'),
  getExpertiseItem: (id)        => request(`/api/expertise/${id}`),
  createExpertise: (data)       => request('/api/expertise', { method: 'POST',   body: JSON.stringify(data) }),
  updateExpertise: (id, data)   => request(`/api/expertise/${id}`, { method: 'PUT',    body: JSON.stringify(data) }),
  deleteExpertise: (id)         => request(`/api/expertise/${id}`, { method: 'DELETE' }),

  // Stack
  getStack:        ()           => request('/api/stack'),
  getStackItem:    (id)         => request(`/api/stack/${id}`),
  createStack:     (data)       => request('/api/stack', { method: 'POST',   body: JSON.stringify(data) }),
  updateStack:     (id, data)   => request(`/api/stack/${id}`, { method: 'PUT',    body: JSON.stringify(data) }),
  deleteStack:     (id)         => request(`/api/stack/${id}`, { method: 'DELETE' }),

  // Experience (work companies)
  getExperience:    ()           => request('/api/experience'),
  createExperience: (data)       => request('/api/experience', { method: 'POST',   body: JSON.stringify(data) }),
  updateExperience: (id, data)   => request(`/api/experience/${id}`, { method: 'PUT',    body: JSON.stringify(data) }),
  deleteExperience: (id)         => request(`/api/experience/${id}`, { method: 'DELETE' }),

  // Education
  getEducation:    ()           => request('/api/education'),
  createEducation: (data)       => request('/api/education', { method: 'POST',   body: JSON.stringify(data) }),
  updateEducation: (id, data)   => request(`/api/education/${id}`, { method: 'PUT',    body: JSON.stringify(data) }),
  deleteEducation: (id)         => request(`/api/education/${id}`, { method: 'DELETE' }),

  // Views
  recordView:      ()           => request('/api/views', { method: 'POST' }),
};

export default api;
