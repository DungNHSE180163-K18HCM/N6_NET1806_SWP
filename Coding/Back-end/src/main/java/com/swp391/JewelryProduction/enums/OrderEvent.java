package com.swp391.JewelryProduction.enums;

public enum OrderEvent {
    REQUEST_RECEIVED,       //Transition from REQUESTING to REQUEST_AWAIT_APPROVAL
    PROCESS_REQUEST,        //Transition from REQ_AWAIT_APPROVAL to REQ_APPROVAL_PROCESS
    REQUEST_APPROVE,        //Transition from REQ_AWAIT_APPROVAL to ASSIGN_STAFF
    REQUEST_DECLINE,        //Transition FROM REQ_CANCEL to CANCEL
    ASSIGN_STAFF,           //Transition FROM AWAIT_ASSIGN_STAFF TO IN_EXCHANGING
    FINALIZE_IDEA,          //Transition from IN_EXCHANGING to AWAIT_QUO

    QUOTATION_SEND,         //Transition from AWAIT_QUO TO QUO_AWAIT_APPROVAL
    QUO_MANA_APPROVE,
    QUO_MANA_DECLINE,
    QUO_CUST_APPROVE,
    QUO_CUST_DECLINE,
    TRANSACTION_APPROVED,   //Transition from AWAIT_TRANSACTION to TRANSACTION_APPROVED
    DESIGNING,              //Transition from TRANSACTION_APPROVED to DESIGN -> IN_DESIGNING
    DESIGN_SENT,            //Transition from IN_DESIGNING to DES_AWAIT_APPROVAL



    CANCEL,
    RESTORE_ORDER
}
