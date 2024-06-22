package online.be.model.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
//import online.be.enums.Role;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    String phone;
    String password;
    String fullName;
    String email;
}
