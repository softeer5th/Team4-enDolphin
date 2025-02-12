package endolphin.backend.global.error.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ErrorCode {
    // Common
    INTERNAL_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "C001", "Internal Server Error"),
    INVALID_DATE_TIME_RANGE(HttpStatus.BAD_REQUEST, "C002", "End Time must be after Start Time"),

    // User
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "U001", "User not found"),

    // Discussion
    DISCUSSION_NOT_FOUND(HttpStatus.NOT_FOUND, "D001", "Discussion not found"),
    DISCUSSION_NOT_ONGOING(HttpStatus.BAD_REQUEST, "D002", "Discussion not ongoing"),

    //SharedEvent
    SHARED_EVENT_NOT_FOUND(HttpStatus.NOT_FOUND, "S001", "Shared Event not found"),

    // DiscussionParticipant
    DISCUSSION_PARTICIPANT_NOT_FOUND(HttpStatus.NOT_FOUND, "DP001", "Discussion participant not found"),

    //Calendar
    CALENDAR_UNAUTHORIZED_ERROR(HttpStatus.UNAUTHORIZED, "CA001", "Unauthorized"),
    CALENDAR_FORBIDDEN_ERROR(HttpStatus.FORBIDDEN, "CA002", "Forbidden"),
    CALENDAR_BAD_REQUEST_ERROR(HttpStatus.BAD_REQUEST, "CA003", "Bad Request"),
    CALENDAR_NOT_FOUND_ERROR(HttpStatus.NOT_FOUND, "CA004", "Not Found"),

    // OAuth
    OAUTH_UNAUTHORIZED_ERROR(HttpStatus.UNAUTHORIZED, "O001", "OAuth Unauthorized Error"),
    OAUTH_BAD_REQUEST_ERROR(HttpStatus.BAD_REQUEST, "O002", "OAuth Bad Request Error"),
    OAUTH_FORBIDDEN_ERROR(HttpStatus.FORBIDDEN, "O003", "OAuth Forbidden Error"),
    INVALID_OAUTH_CODE(HttpStatus.UNAUTHORIZED, "O004", "Invalid OAuth Code"),
    INVALID_OAUTH_USER_INFO(HttpStatus.UNAUTHORIZED, "O005", "Invalid OAuth User Info"),
    ;
    private final HttpStatus httpStatus;
    private final String code;
    private final String message;
    ErrorCode(final HttpStatus httpStatus, final String code, final String message) {
        this.httpStatus = httpStatus;
        this.message = message;
        this.code = code;
    }
}
