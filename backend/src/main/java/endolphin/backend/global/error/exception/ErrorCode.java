package endolphin.backend.global.error.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ErrorCode {
    // Common
    INTERNAL_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "C001", "Internal Server Error"),
    INVALID_DATE_TIME_REQUEST(HttpStatus.BAD_REQUEST, "C002", "Invalid Date Time Request"),
    INVALID_INPUT(HttpStatus.BAD_REQUEST, "C003", "Invalid Input"),

    // User
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "U001", "User not found"),

    // Discussion
    DISCUSSION_NOT_FOUND(HttpStatus.NOT_FOUND, "D001", "Discussion not found"),
    DISCUSSION_NOT_ONGOING(HttpStatus.BAD_REQUEST, "D003", "Discussion not ongoing"),
    TOO_MANY_FAILED_ATTEMPTS(HttpStatus.TOO_MANY_REQUESTS, "D004", "Too many failed attempts"),
    PASSWORD_REQUIRED(HttpStatus.BAD_REQUEST, "D005", "Password required"),

    // PersonalEvent
    PERSONAL_EVENT_NOT_FOUND(HttpStatus.NOT_FOUND, "P001", "Personal Event not found"),
    INVALID_PERSONAL_EVENT_USER(HttpStatus.FORBIDDEN, "P002",
        "Not allowed to update this personal event"),

    //SharedEvent
    SHARED_EVENT_NOT_FOUND(HttpStatus.NOT_FOUND, "S001", "Shared Event not found"),

    // DiscussionParticipant
    DISCUSSION_PARTICIPANT_EXCEED_LIMIT(HttpStatus.FORBIDDEN, "DP001",
        "Discussion participant exceed limit"),
    DISCUSSION_PARTICIPANT_NOT_FOUND(HttpStatus.NOT_FOUND, "DP002",
        "Discussion participant not found"),
    INVALID_DISCUSSION_PARTICIPANT(HttpStatus.BAD_REQUEST, "DP003",
        "Invalid Discussion participant"),
    DISCUSSION_HOST_NOT_FOUND(HttpStatus.NOT_FOUND, "DP004", "Discussion host not found"),
    NOT_ALLOWED_USER(HttpStatus.FORBIDDEN, "DP005", "Not allowed user"),
    ALREADY_PARTICIPATED(HttpStatus.BAD_REQUEST, "DP006", "Already participated"),

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

    // Google Calendar
    GC_EXPIRED_SYNC_TOKEN(HttpStatus.GONE, "GC001", "Expired Sync Token"),
    GC_CONFLICT_ERROR(HttpStatus.CONFLICT, "GC002", "Conflict"),
    GC_NOT_FOUND_ERROR(HttpStatus.NOT_FOUND, "GC003", "Not Found"),
    GC_BAD_REQUEST_ERROR(HttpStatus.BAD_REQUEST, "GC004", "Bad Request"),
    GC_FORBIDDEN_ERROR(HttpStatus.FORBIDDEN, "GC005", "Forbidden"),
    GC_GONE_ERROR(HttpStatus.GONE, "GC006", "이미 삭제된 이벤트입니다."),
    GC_INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "GC007", "Internal Server Error"),
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
