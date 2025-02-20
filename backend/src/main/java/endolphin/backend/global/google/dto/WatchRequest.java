package endolphin.backend.global.google.dto;

import java.util.HashMap;
import java.util.Map;

public record WatchRequest(
    String id,
    String type,
    String address,
    String token,
    Map<String, String> params
) {

    public static WatchRequest of(String id, String address, String token, String ttl) {
        Map<String, String> params = new HashMap<>();
        params.put("ttl", ttl);

        return new WatchRequest(id, "web_hook", address, token, params);
    }
}
