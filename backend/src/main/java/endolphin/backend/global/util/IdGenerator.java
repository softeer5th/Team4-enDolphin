package endolphin.backend.global.util;

import java.util.UUID;
import org.apache.commons.codec.binary.Base32;

public class IdGenerator {
    private static final String PREFIX = "endolphin";
    private static final Base32 base = new Base32(true);
    public static String generateId(Long id) {
        return String.format("%s%d%s",
            PREFIX, id,
            base.encodeToString(UUID.randomUUID().toString().getBytes())
                .replace("=","").toLowerCase());
    }
}
