export const useLoggedIn = () => {
  const token = localStorage.getItem("token");
  return !!token;
};
