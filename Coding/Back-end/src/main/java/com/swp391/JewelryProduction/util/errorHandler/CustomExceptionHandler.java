package com.swp391.JewelryProduction.util.errorHandler;

import com.swp391.JewelryProduction.util.Response;
import com.swp391.JewelryProduction.util.exceptions.ObjectNotFoundException;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.servlet.View;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@ControllerAdvice
public class CustomExceptionHandler extends ResponseEntityExceptionHandler {
    private final View error;

    public CustomExceptionHandler(View error) {
        this.error = error;
    }

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(
            MethodArgumentNotValidException ex,
            HttpHeaders headers,
            HttpStatusCode status,
            WebRequest request
    ) {
        List<String> errors = new ArrayList<String>();
        for (FieldError error : ex.getBindingResult().getFieldErrors()) {
            errors.add(error.getField() + ": " + error.getDefaultMessage());
        }
        for (ObjectError error : ex.getBindingResult().getGlobalErrors()) {
            errors.add(error.getObjectName() + ": " + error.getDefaultMessage());
        }

        ApiError apiError =
                new ApiError(HttpStatus.BAD_REQUEST, ex.getLocalizedMessage(), errors);
        return handleExceptionInternal(
                ex, apiError, headers, apiError.getStatus(), request);
    }

    @Override
    protected ResponseEntity<Object> handleMissingServletRequestParameter(
            MissingServletRequestParameterException ex,
            HttpHeaders headers,
            HttpStatusCode status,
            WebRequest request
    ) {
        String error = ex.getParameterName() + " parameter is missing";

        ApiError apiError =
                new ApiError(HttpStatus.BAD_REQUEST, ex.getLocalizedMessage(), List.of(error));
        return new ResponseEntity<Object>(
                apiError, new HttpHeaders(), apiError.getStatus());
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<Response> handleConstraintViolation(
            ConstraintViolationException ex, WebRequest request) {
        Map<String, Object> errors = new HashMap<>();
        for (ConstraintViolation<?> violation : ex.getConstraintViolations()) {
            errors.put(violation.getRootBeanClass().getName() + " " +
                    violation.getPropertyPath(), violation.getMessage());
        }

        return Response.builder()
                .status(HttpStatus.BAD_REQUEST)
                .message(ex.getLocalizedMessage())
                .responseList(errors)
                .buildEntity(new HttpHeaders());
    }

    @ExceptionHandler({ MethodArgumentTypeMismatchException.class })
    public ResponseEntity<Response> handleMethodArgumentTypeMismatch(
            MethodArgumentTypeMismatchException ex, WebRequest request) {
        String error =
                ex.getName() + " should be of type " + ex.getRequiredType().getName();
        return Response.builder()
                 .status(HttpStatus.BAD_REQUEST)
                 .message(ex.getLocalizedMessage())
                 .response("Type Mismatch Exception", error)
                 .buildEntity(new HttpHeaders());
    }

    @ExceptionHandler( {ObjectNotFoundException.class} )
    public ResponseEntity<Response> handleObjectNotFoundException(
            ObjectNotFoundException ex, WebRequest request
    ) {
        String errorMsg = ex.getLocalizedMessage();
        if (errorMsg == null || errorMsg.isEmpty())
            errorMsg = "Object not found";

        return Response.builder()
                .status(HttpStatus.BAD_REQUEST)
                .message("ObjectNotFoundException is throw")
                .response("Error", errorMsg)
                .buildEntity();
    }

    @ExceptionHandler({ Exception.class })
    public ResponseEntity<Response> handleAll(Exception ex, WebRequest request) {
        return Response.builder()
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .message(ex.getLocalizedMessage())
                .response("Internal Server Error", "Error occurred")
                .buildEntity(new HttpHeaders());
    }
}
