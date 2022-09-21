const API_END_POINT = "https://mwu.roto-frontend.programmers.co.kr/documents";

export const request = async (url, options) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, options);

    if (!res.ok) {
      throw new Error("API Error");
    }

    return await res.json();
  } catch (e) {
    alert(e.message);
  }
};
