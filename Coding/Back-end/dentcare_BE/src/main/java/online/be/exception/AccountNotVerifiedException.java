package online.be.exception;

public class AccountNotVerifiedException extends RuntimeException{
    public AccountNotVerifiedException (String message) {
        super(message);
    }
}
