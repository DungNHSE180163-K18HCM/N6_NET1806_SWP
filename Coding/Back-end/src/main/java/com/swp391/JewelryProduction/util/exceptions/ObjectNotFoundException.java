package com.swp391.JewelryProduction.util.exceptions;

public class ObjectNotFoundException extends RuntimeException{
    public ObjectNotFoundException(){
        super("User not found");
    }
    public ObjectNotFoundException(String message){
        super(message);
    }
    public ObjectNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
