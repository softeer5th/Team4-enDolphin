package endolphin.backend.global.dto;

import java.util.List;

public record ListResponse<T>(
    List<T> data
) {

}
