import authService from "./authService";

const getUserRoles = async () => {
  const user = authService.getCurrentUser();
  if (user) {
    try {
      return user.role ? [user.role] : [];
    } catch (error) {
      throw new Error("Failed to get roles");
    }
  } else {
    throw new Error("User not authenticated");
  }
};

const checkPermission = async (permission) => {
  const user = authService.getCurrentUser();
  if (user) {
    try {
      const roles = await getUserRoles();
      return roles.includes(permission);
    } catch (error) {
      throw new Error("Failed to check permission");
    }
  } else {
    throw new Error("User not authenticated");
  }
};

const authorService = {
  getUserRoles,
  checkPermission,
};

export default authorService;
