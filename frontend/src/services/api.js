export async function apiGet(endpoint) {
  const res = await fetch(API_BASE + endpoint, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) throw new Error(`GET ${endpoint} falhou`);
  return res.json();
}

export async function apiPost(endpoint, body = {}) {
  const res = await fetch(API_BASE + endpoint, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) throw new Error(`POST ${endpoint} falhou`);
  return res.json();
}

export async function apiPut(endpoint, body = {}) {
  const res = await fetch(API_BASE + endpoint, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) throw new Error(`PUT ${endpoint} falhou`);
  return res.json();
}

export async function apiDelete(endpoint) {
  const res = await fetch(API_BASE + endpoint, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) throw new Error(`DELETE ${endpoint} falhou`);
  return res.json();
}