package endolphin.backend.domain.user;

import endolphin.backend.domain.user.dto.CurrentUserInfo;
import endolphin.backend.domain.user.dto.UsernameRequest;
import endolphin.backend.domain.user.entity.User;
import endolphin.backend.global.error.ErrorResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "User", description = "사용자 관리 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class UserController {

    private final UserService userService;

    @Operation(summary = "현재 유저 정보", description = "현재 로그인한 유저의 이름과 프로필 사진을 반환합니다.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "성공",
            content = @Content(schema = @Schema(implementation = CurrentUserInfo.class))),
        @ApiResponse(responseCode = "401", description = "인증 실패",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
        @ApiResponse(responseCode = "500", description = "서버 오류",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    @GetMapping("/user/current")
    public ResponseEntity<CurrentUserInfo> getCurrentUser() {
        User user = userService.getCurrentUser();
        CurrentUserInfo response = new CurrentUserInfo(user.getName(), user.getPicture());
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/user/name")
    public ResponseEntity<CurrentUserInfo> updateUsername(
        @Valid @RequestBody UsernameRequest request) {
        CurrentUserInfo response = userService.updateUsername(request.name());
        return ResponseEntity.ok(response);
    }
}
