const API_END_POINT = "https://mwu.roto-frontend.programmers.co.kr";

export const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        "x-username": "asi",
      },
    });

    if (!res.ok) {
      return await res.json();
    }

    throw new Error("API Error");
  } catch (e) {
    alert(e.message);
  }
};
