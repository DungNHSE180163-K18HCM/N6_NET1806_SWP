package online.be.model.request;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import online.be.enums.Role;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminRegisterRequest {
    String phone;
    String password;
    String fullName;
    String email;
    @Enumerated(EnumType.STRING)
    Role role;
    long clinicId;
}
