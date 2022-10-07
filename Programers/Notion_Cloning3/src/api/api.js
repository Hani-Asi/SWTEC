export const API_END_POINT = "https://mwu.roto-frontend.programmers.co.kr";

export const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "x-username": "asi",
      },
    });

    if (res.ok) {
      return await res.json();
    }

    throw new Error("API ERROR");
  } catch (e) {
    alert(e.message);
  }
};
