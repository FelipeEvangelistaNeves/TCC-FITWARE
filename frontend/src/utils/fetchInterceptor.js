export function initFetchInterceptor() {
  if (window.__FETCH_INTERCEPTOR_INSTALLED__) return;
  window.__FETCH_INTERCEPTOR_INSTALLED__ = true;

  const originalFetch = window.fetch.bind(window);

  window.fetch = async (...args) => {
    const url = typeof args[0] === "string" ? args[0] : args[0].url;

    // ⛔ IGNORA rotas que podem gerar 401 legítimo (ex.: login errado)
    const ignoredRoutes = [
      "/login",
      "/login/aluno",
      "/login/professor",
      "/auth",
      "/auth/login",
      "/api/login",
    ];

    // Se a URL contém qualquer rota ignorada → deixa passar
    if (ignoredRoutes.some((r) => url.includes(r))) {
      return originalFetch(...args);
    }

    const res = await originalFetch(...args);

    if (res.status === 401) {
      console.warn("[Interceptor] 401 detectado:", url);

      localStorage.removeItem("user-role");
      localStorage.removeItem("token");

      window.location.href = "/escolherlogin";
      throw new Error("Unauthorized");
    }

    return res;
  };
}
