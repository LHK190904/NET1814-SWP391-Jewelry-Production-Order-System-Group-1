// src/services/authorService.js
import authService from "./authService";

const getUserRoles = async () => {
  const user = authService.getCurrentUser();
  if (user) {
    try {
      // Assuming roles are already a part of the user object
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
      // Assuming permissions are based on roles
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
