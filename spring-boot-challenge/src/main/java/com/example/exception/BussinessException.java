package com.example.exception;

public class BussinessException extends RuntimeException {
    public BussinessException(String mensaje) {
        super(mensaje);
    }
}
