package endolphin.backend.global.util;

import java.net.URI;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

public class URIUtil {

    public static URI buildResourceUri(Object resourceId) {
        return ServletUriComponentsBuilder
            .fromCurrentRequest()
            .path("/{id}")
            .buildAndExpand(resourceId)
            .toUri();
    }
}
