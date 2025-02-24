package endolphin.backend.global.security;

public class UserContext {

    private static final ThreadLocal<UserInfo> currentUser = new ThreadLocal<>();

    public static void set(UserInfo user) {
        currentUser.set(user);
    }

    public static UserInfo get() {
        return currentUser.get();
    }

    public static void clear() {
        currentUser.remove();
    }
}
