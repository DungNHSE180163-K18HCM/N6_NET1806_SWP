package com.swp391.JewelryProduction.services;

import com.paypal.api.payments.*;
import com.paypal.base.rest.APIContext;
import com.paypal.base.rest.PayPalRESTException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

@Service
@RequiredArgsConstructor
public class PaypalService {

    private APIContext apiContext;

    public Payment makePayment(
            Double total,
            String currency,
            String method,
            String intent,
            String description,
            String cancelURL,
            String successURL
    ) throws PayPalRESTException {

        Amount amount = new Amount();
        amount.setCurrency(currency);
        amount.setTotal(
                String.format(
                        Locale.forLanguageTag(currency),
                        "%.2f", total
                )
        );

        Transaction transaction = new Transaction();
        transaction.setDescription(description);
        transaction.setAmount(amount);

        List<Transaction> transactions = new ArrayList<>();
        transactions.add(transaction);

        Payer payer = new Payer();
        payer.setPaymentMethod(method);

        RedirectUrls redirectUrls = new RedirectUrls();
        redirectUrls.setCancelUrl(cancelURL);
        redirectUrls.setReturnUrl(successURL);

        Payment payment = new Payment();
        payment.setIntent(intent);
        payment.setPayer(payer);
        payment.setTransactions(transactions);
        payment.setRedirectUrls(redirectUrls);

        return payment.create(apiContext);
    }

    public Payment executePayment (
            String paymentID,
            String payerID
    ) throws PayPalRESTException {
        Payment payment = new Payment();
        payment.setId(paymentID);

        PaymentExecution execution = new PaymentExecution();
        execution.setPayerId(payerID);

        return payment.execute(apiContext, execution);
    }
}
